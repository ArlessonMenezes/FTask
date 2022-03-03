import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/Todos-Entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
  
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
