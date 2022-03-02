import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'ftask',
      entities: [__dirname + "dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true,
      cli: {
          entitiesDir: join('src', 'db', 'entities')
      }
  }),
    UsersModule,
    TodosModule,
    AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
