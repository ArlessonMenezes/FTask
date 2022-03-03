import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/Todos-Entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todosRepository: Repository<TodoEntity>
    ){}

    async getAllTodosByUserId(userId: number): Promise<TodoEntity[]> {
        return await this.todosRepository.find({where: { userId }})
    }

    async addNewTodo(createTaskDto: CreateTaskDto): Promise<TodoEntity> {
        const { description, userId } = createTaskDto;

        const todo = this.todosRepository.create({
            description,
            userId,
        });

        return await this.todosRepository.save(todo);
    }
}
