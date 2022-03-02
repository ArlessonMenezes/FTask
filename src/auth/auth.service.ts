import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/UserEntity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ){}

    async validateUser(email: string, password: string): Promise<Partial<UserEntity>> {
        const userExist = await this.usersService.findUserByEmail(email)

        if (userExist) {
            const validPassword = await compareSync(password, userExist.password)

            if (validPassword) return userExist
            
            throw new NotFoundException('Password incorrect!')

        } else {
            throw new NotFoundException('E-mail not found!')
        }
    }

    async login(userData: Partial<UserEntity>): Promise<any> {
        const payload = {
            email: userData.email,
            name: userData.name,
            sub: userData.id,
        }
        const token = this.jwtService.sign(payload);

        return {
            name: userData.name,
            access_token: token 
        }
    }
}
