import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from '../auth.service';
import { UserEntity } from '../../users/entity/User-Entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(username: string, password: string): Promise<Partial<UserEntity>> {
        const user = await this.authService.validateUser(username, password)

        if (user) return user

        throw new UnprocessableEntityException();
    }
}