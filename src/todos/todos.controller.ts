import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { TodoEntity } from './entity/TodoEntity';
import { TodosService } from './todos.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
    constructor(
        private readonly todosService: TodosService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllTodosByUserId(@Request() req: any): Promise<TodoEntity[]> {
        return await this.todosService.getAllTodosByUserId(req.user.id)
    }

    @Post()
    async createNewTodo(@Body() createTaskDto: CreateTaskDto): Promise<TodoEntity> {
        return await this.todosService.addNewTodo(createTaskDto);
    }
}
