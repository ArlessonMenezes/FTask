import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entity/UserEntity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.usersService.registerUser(createUserDto);
    }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.usersService.getUsers()
    }
}
