import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/User-Entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ){}

    async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const { name, email, password } = createUserDto;

        const userExist = await this.usersRepository.findOne({ email });

        if (!userExist) {
            const user = this.usersRepository.create({
                name,
                email,
                password,
            });
            
            return await this.usersRepository.save(user);
        }

        throw new BadRequestException(`user ${name} already exists in the database`);
    }

    // async getUsers(): Promise<UserEntity[]> {
    //     return await this.usersRepository.find()
    // }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.usersRepository.findOne({
             where: {
                 email, 
                },
            });
    }

    async getUserById(id: number): Promise<UserEntity> {
        const userExist = await this.usersRepository.findOne(id);

        if (userExist) 
            return userExist;

        throw new NotFoundException(`User with Id ${id} not found`);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
       const userExist = await this.usersRepository.findOne(id) 

       if (userExist) {
           const updateUser = await this.usersRepository.preload({
               id,
               ...updateUserDto
           })
           delete updateUser.password
           return await this.usersRepository.save(updateUser)
       }

       throw new NotFoundException(`User with Id ${id} not found`)
    }
}
