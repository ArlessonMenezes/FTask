import { Body, Controller, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entity/User-Entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Post('/create-user')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.usersService.registerUser(createUserDto);
    }

    // @Get()
    // async getAllUsers(): Promise<UserEntity[]> {
    //     return await this.usersService.getUsers()
    // }

    @Get('/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return await this.usersService.getUserById(id);
    }

    @Put('/update-user/:id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
            return await this.usersService.updateUser(id, updateUserDto)
    }
}
