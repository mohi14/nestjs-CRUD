import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import {StudentSchema} from './schema/student.schema'
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://doctorPortal:NcThnuo7SEHC4En2@cluster0.3dkasq3.mongodb.net/',{dbName:'nestdb'}),
    MongooseModule.forFeature([{name:'Student', schema:StudentSchema}])
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
