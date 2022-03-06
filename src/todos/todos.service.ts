import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/Todos-Entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enum/task-status.enum';

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

    async getTaskById(id: number): Promise<TodoEntity> {
        const task = await this.todosRepository.findOne(id)

        if (!task) {
            throw new NotFoundException(`Task with Id: ${id} not found`)
        }

        return task;
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<TodoEntity> {
        const task = await this.getTaskById(id);

        if (!task) 
            throw new NotFoundException('Task not found')
        
        task.status = status;

        return await this.todosRepository.save(task);
    }

    async deleteTask(id: number) {
        const task = await this.getTaskById(id);

        if (!task) 
            throw new NotFoundException('Task not found')

        await this.todosRepository.remove(task)
    }
}
