import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/UserEntity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
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

    async getUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find()
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.usersRepository.findOne({
             where: {
                 email, 
                },
            });
    }
}
