import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeePayroll } from './employee-payroll.model';

@Injectable()
export class EmployeePayrollService {
    constructor(@InjectModel('EmployeePayroll') private readonly employeePayrollModel: Model<EmployeePayroll>){}
    
    async createEmployeePayroll(payroll:any){
        const employeePayroll = await this.employeePayrollModel.create(payroll)

        console.log(employeePayroll, "p")

        return employeePayroll
    }


}
