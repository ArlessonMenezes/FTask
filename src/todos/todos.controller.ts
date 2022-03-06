import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TodoEntity } from './entity/Todos-Entity';
import { TodosService } from './todos.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskStatus } from './enum/task-status.enum';

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

    @Put('/:id')
    async updateTaskStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body() status: TaskStatus): Promise<TodoEntity> {
            return await this.todosService.updateTaskStatus(id, status);            
    }

    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        await this.todosService.deleteTask(id);
    }
}
