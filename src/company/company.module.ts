import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilityModule } from 'src/ability/ability.module';
import { AccessSchema } from 'src/access/access.model';
import { AccessModule } from 'src/access/access.module';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyController } from './company.controller';
import { ClassSchema, CompanySchema, CustomFieldSchema, EmploymentStatusSchema, EventSchema, GradeSchema, JobLevelSchema, NppBpjsKetenagakerjaanSchema, OrganizationChartSchema } from './model';
import { CompanyService } from './company.service';
import { MasterMenuSchema } from 'src/master-table/model';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports:[forwardRef(()=> AuthModule),AbilityModule, AccessModule,
        MulterModule.register({dest: '../../upload-file/profile-picture' }),
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema},  { name: 'Access', schema: AccessSchema}, {name: 'MasterMenu', schema: MasterMenuSchema}, {name: 'Class', schema: ClassSchema}, {name: 'CustomField', schema: CustomFieldSchema}, {name: 'EmploymentStatus', schema: EmploymentStatusSchema}, {name: 'Event', schema: EventSchema}, {name: 'Grade', schema: GradeSchema}, {name: 'JobLevel', schema: JobLevelSchema}, {name: 'OrganizationChart', schema: OrganizationChartSchema}, {name: 'NppBpjsKetengakerjaan', schema: NppBpjsKetenagakerjaanSchema}]
    )],
    providers:[CompanyService],
    controllers: [CompanyController],
    exports:[CompanyService]
})
export class CompanyModule {}
