import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { TodoEntity } from './entity/Todos-Entity';
import { TodosService } from './todos.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todos')
export class TodosController {
    constructor(
        private readonly todosService: TodosService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTodosByUserId(@Request() req: any): Promise<TodoEntity[]> {
        return await this.todosService.getAllTodosByUserId(req.user.id)
    }

    @Post()
    async createNewTodo(@Body() createTaskDto: CreateTaskDto): Promise<TodoEntity> {
        return await this.todosService.addNewTodo(createTaskDto);
    }
}
