import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entity/Token-Entity';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    TypeOrmModule.forFeature([TokenEntity])
  ],
  providers: [TokensService],
  controllers: [TokensController],
  exports: [TokensService]
})
export class TokensModule {}
