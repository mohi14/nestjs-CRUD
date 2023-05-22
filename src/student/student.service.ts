import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStuendtDto } from 'src/dto/update-student.dto';
import { IStudent } from 'src/interface/student.interface';

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel:Model<IStudent>){
        
    }

    // creating a new student inside mongodb

    async createStudent(createStudentDto:CreateStudentDto):Promise<IStudent>{

        const newStudent = await new this.studentModel(createStudentDto)

        return newStudent.save()  // save a new student
    }

    // reading all the students from the database

    async getAllStudents():Promise<IStudent[]>{
        const studentData = await this.studentModel.find({})

        if(!studentData || studentData.length ==0){
            throw new NotFoundException("Student data not found")
        }
        return studentData
    }

    // get a specific student by using Id

    async getStudent(studentId:string):Promise<IStudent>{
        const existingStudent = await this.studentModel.findById(studentId)

        if(!existingStudent){
            throw new NotFoundException(`Student ${studentId} not found`)
        }

        return existingStudent
    }

    async deleteStudent(studentId:string):Promise<IStudent>{
        const deleteStudent = await this.studentModel.findByIdAndDelete(studentId)
        if(!deleteStudent){
            throw new NotFoundException(`Student ${studentId} not found`)
        }

        return deleteStudent
    }

    async updateStudent(studentId:string, updateStuendtDto:UpdateStuendtDto):Promise<IStudent>{
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId,updateStuendtDto,{new:true})

        if(!existingStudent){
            throw new NotFoundException(`Student ${studentId} not found`)
        }
        return existingStudent
    }
}
