import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@education-app.o4fgg9j.mongodb.net/?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
