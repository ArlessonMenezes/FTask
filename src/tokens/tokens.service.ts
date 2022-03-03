import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { TokenEntity } from './entity/Token-Entity';

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>,
        private readonly usersServie: UsersService,
        private readonly authService: AuthService,
    ) {}

    async saveToken(token: string, email: string): Promise<void> {
        const tokenExist = await this.tokenRepository.findOne({ where: { email }} );

        if (tokenExist) {
            await this.tokenRepository.update(tokenExist.id, { token })
        } else {
            await this.tokenRepository.insert({
                token, 
                email,
            })
        }

    }

    async refreshToken(oldToken: string): Promise<any> {
        const tokenExist = await this.tokenRepository.findOne({ where: { token: oldToken } });

        if (tokenExist) {
            const user = await this.usersServie.findUserByEmail(tokenExist.email)
            return this.authService.login(user)
        } 
        
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
}
