import { NotFoundException,ForbiddenException, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import {
  ClassDto,
  companyDto,
  CustomFieldDto,
  EventDto,
  GradeDto,
  NppBpjsKetenagakerjaanDto,
  OrgDto,
  passwordDto,
  UpdateEmployeeStatusDto,
} from './dto';
import {
  Class,
  Company,
  CustomField,
  EmploymentStatus,
  Grade,
  Event,
  JobLevel,
  NppBpjsKetenagakerjaan,
  OrganizationChart,
} from './model';
import { SuperadminDto } from './dto';
import * as argon from 'argon2';
import { UserService } from 'src/users/users.service';
import { EmployeeStatusDto } from './dto/employee-status.dto';
import { AccessService } from 'src/access/access.service';
import { roleTypes } from 'src/access/enum';
import { MasterMenu } from 'src/master-table/model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    @InjectModel('JobLevel') private readonly jobLevelModel: Model<JobLevel>,
    @InjectModel('OrganizationChart')
    private readonly organizationChartModel: Model<OrganizationChart>,
    @InjectModel('CustomField')
    private readonly customFieldModel: Model<CustomField>,
    @InjectModel('Class') private readonly classModel: Model<Class>,
    @InjectModel('EmploymentStatus')
    private readonly employmentStatusModel: Model<EmploymentStatus>,
    @InjectModel('Grade') private readonly gradeModel: Model<Grade>,
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    @InjectModel('MasterMenu')
    private readonly masterMenuModel: Model<MasterMenu>,
    @InjectModel('NppBpjsKetengakerjaan')
    private readonly nppBpjsKetenagakerjaanModel: Model<NppBpjsKetenagakerjaan>,
    private authService: AuthService,
    @Inject(forwardRef(() =>AccessService))
    private accessService: AccessService,
  ) {}

  async findCompanyById(companyDoc: any) {
    const company = await this.companyModel.findById(companyDoc.sub);
    return company;
  }

  async addSuper(superadminDto: SuperadminDto, companyDoc: any) {
    const validateSuper = await this.accessService.findSuperCompany(companyDoc);
    if (validateSuper.length == 0) {
      const newUser = await this.authService.signupSuper(
        superadminDto,
        companyDoc,
      );
      const menus = await this.masterMenuModel.find().exec();
      let superAd = {
        roleName: 'superAdmin',
        roleType: roleTypes.superAdmin,
        company: companyDoc.sub,
        'filterEmployee.superAdmin': newUser,
        menuAccess: [{}],
      };
      menus.map((menu, index) => {
        superAd.menuAccess[index] = {
          menu,
          view: true,
          add: true,
          edit: true,
          delete: true,
          request: false,
          wholeCompany: true,
        };
      });

      const newSuper = await this.accessService.createSuperAdmin(superAd)
      return newSuper;
    }
    throw new NotFoundException('your company already have a super admin');
  }

  async updateCompanyProfilePict(user:any, profilePictPath:any){
    var newFilePath = profilePictPath.replace("upload-file", "")
    const editProfilePicture = await this.companyModel.updateOne({_id:user.sub}, {$set:{companyLogo: newFilePath}})
    return editProfilePicture
  }

  // async companyProfile(companyDoc: any){
  //     const companyProfile = await this.companyModel.findById(companyDoc._id)
  //     const validatePassword = await argon.argon2d.valueOf(companyProfile.password)
  //     let result = companyProfile.password
  //     return companyProfile;
  // }

  async verifyPassword(pass: passwordDto, companyDoc: any) {
    const companyPassword = await this.companyModel
      .findById(companyDoc.sub)
      .select('password');
    const validate = await argon.verify(
      companyPassword.password,
      pass.password,
    );
    if (!validate) {
      return false;
    }
    return true;
  }

  async updateCompany(compDto: companyDto, companyDoc: any) {
    const updateCompany = await this.companyModel.updateOne(
      { _id: companyDoc.sub },
      compDto,
    );
    return updateCompany;
  }

  async changePassword(pass: passwordDto, companyDoc: any) {
    const verify = await this.verifyPassword(pass, companyDoc);
    if (verify) {
      throw new NotFoundException(
        'the password cannot be the same as the current password',
      );
    }
    const hash = await argon.hash(pass.password);
    const changePassword = await this.companyModel.updateOne(
      { _id: companyDoc.sub },
      { $set: { password: hash } },
    );
    return changePassword.acknowledged;
    // const changePassword = await this.companyModel.findOneAndUpdate({_id: companyDoc.sub}, {$set:{ password: pass.password}}, {new: true})
    // changePassword.save()
    // return true
  }

  async addOrganization(orgDto: OrgDto, userDoc: any) {
    const newOrganization = new this.organizationChartModel({
      orgName: orgDto.orgName,
      parent: orgDto.parent || null,
      company: userDoc.company,
      createdBy: userDoc.sub,
    });
    await newOrganization.save();
    return newOrganization;
  }

  async findOneOrg(id: any) {
    const organization = await this.organizationChartModel.findById(id);
    if (!organization) {
      throw new NotFoundException('no organization found with the id: ' + id);
    }
    return organization;
  }

  async findOrg(userDoc: any) {
    const companyOrg = await this.organizationChartModel.find({
      company: userDoc.company,
    });

    if (!companyOrg) {
      throw new NotFoundException('no organization found with your company id');
    }

    let result = companyOrg.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async deleteOrg(deleteOrg: any) {
    // // check user if have organization
    await this.findOneOrg(deleteOrg._id);
    const deletedOrganization = await this.organizationChartModel.deleteOne({
      _id: deleteOrg._id,
    });
    return deletedOrganization;
  }

  async updateOrg(updateOrg: any) {
    await this.findOneOrg(updateOrg._id);
    const updatedOrganization = await this.organizationChartModel.updateOne(
      { _id: updateOrg._id },
      { $set: { orgName: updateOrg.orgName } },
    );
    return updatedOrganization;
  }

  async findArrOrg(array: any){

    for (let index = 0; index < array.length; index++) {
      await this.findOneOrg(array[index].organization)

      let duplicate = array.filter(t => t.organization === array[index].organization)
      if(duplicate.length > 1){
          throw new ForbiddenException("found duplicate organization id of " + array[index].organization)
      }
    }
    return array
  }
 

  async addJobLevel(userDoc: any, jobLevel: any) {
    const addJobLevel = new this.jobLevelModel({
      company: userDoc.company,
      jobLevelName: jobLevel.jobLevelName,
      createdBy: userDoc.sub,
    });
    await addJobLevel.save();
    return addJobLevel;
  }

  async findOneJobLevel(id: any) {
    const jobLevel = await this.jobLevelModel.findById(id);
    if (!jobLevel) {
      throw new NotFoundException('no job level found with the id: ' + id);
    }
    return jobLevel;
  }

  async findJobLevel(userDoc: any) {
    const jobLevel = await this.jobLevelModel.find({
      company: userDoc.company,
    });

    if (!jobLevel) {
      throw new NotFoundException('no job level found with your company id');
    }

    let result = jobLevel.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async deleteJobLevel(userDoc: any, jobLevel: any) {
    // validate kalau job level ada dipakai oleh employee atau kagak
    await this.findOneJobLevel(jobLevel._id);
    const deleteJobLevel = await this.jobLevelModel.deleteOne({
      _id: jobLevel._id,
    });
    return deleteJobLevel;
  }

  async updateJobLevel(jobLevel: any) {
    await this.findOneJobLevel(jobLevel._id);
    const updatedJobLevel = await this.jobLevelModel.updateOne(
      { _id: jobLevel._id },
      { $set: { jobLevelName: jobLevel.jobLevelName } },
    );
    return updatedJobLevel;
  }

  async findArrJobLevel(array: any){

    for (let index = 0; index < array.length; index++) {

        await this.findOneJobLevel(array[index].jobLevel)

      let duplicate = array.filter(t => t.jobLevel === array[index].jobLevel)
      if(duplicate.length > 1){
          throw new ForbiddenException("found duplicate jobLevel id of " + array[index].jobLevel)
      }
    }
    return array
  }

  async checkFilterOrgJobLv(filter: any){
    const arrOrganization = filter.organization
    await this.findArrOrg(arrOrganization)

    const arrJobLevel = filter.jobLevel
    await this.findArrJobLevel(arrJobLevel)

    return filter
  }

  async addEmploymentStatus(empStatus: EmployeeStatusDto, userDoc: any) {
    const addEmploymentStatus = new this.employmentStatusModel({
      statusName: empStatus.statusName,
      endDate: empStatus.endDate,
      createdBy: userDoc.sub,
      company: userDoc.company,
    });
    await addEmploymentStatus.save();
    return addEmploymentStatus;
  }

  async findOneEmpStatus(id: any) {
    const employmentStatus = await this.employmentStatusModel.findById(id);
    if (!employmentStatus) {
      throw new NotFoundException('no employment status found with id: ' + id);
    }
    return employmentStatus;
  }

  async findEmploymentStatus(userDoc: any) {
    const employmentStatus = await this.employmentStatusModel.find({
      company: userDoc.company,
    });

    if (!employmentStatus) {
      throw new NotFoundException(
        'no employment status found with your company id',
      );
    }

    let result = employmentStatus.map((i) => {
      return i.toObject();
    });
    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async findDefaultEmploymentStatus(empStatusName:any){
    const result = await this.employmentStatusModel.findOne({$and:[ {company:{$exists:false}}, {statusName: empStatusName}]}).lean()
    return result
  }

  async updateEmploymentStatus(empStatus: UpdateEmployeeStatusDto) {
    await this.findOneEmpStatus(empStatus._id);
    const updatedEmployementStatus = await this.employmentStatusModel.updateOne(
      { _id: empStatus._id },
      { $set: { statusName: empStatus.statusName } },
    );
    return updatedEmployementStatus;
  }

  async deleteEmploymentStatus(empStatus: any) {
    // validate kalau job level ada dipakai oleh employee atau kagak
    await this.findOneEmpStatus(empStatus._id);
    const deleteEmpStatus = await this.employmentStatusModel.deleteOne({
      _id: empStatus._id,
    });
    return deleteEmpStatus;
  }

  async findArrEmploymentStatus(array: any){

    for (let index = 0; index < array.length; index++) {

        await this.findOneEmpStatus(array[index].employmentStatus)

      let duplicate = array.filter(t => t.employmentStatus === array[index].employmentStatus)
      if(duplicate.length > 1){
          throw new ForbiddenException("found duplicate employment status of the id: " + array[index].employmentStatus)
      }
    }
    return array
  }

  async addClass(userDoc: any, classDto: ClassDto) {
    const addClass = new this.classModel({
      company: userDoc.company,
      className: classDto.className,
      from: classDto.from,
      to: classDto.to,
      createdBy: userDoc.sub,
    });
    await addClass.save();
    return addClass;
  }

  async findClass(id: any) {
    const findClass = await this.classModel.findById(id);
    if (!findClass) {
      throw new NotFoundException('no class found with id: ' + id);
    }
    let result = findClass.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    result.updatedAt = result.updatedAt.toLocaleString();
    return result;
  }

  async findAllClass(userDoc: any) {
    const findAllClass = await this.classModel
      .find({
        company: userDoc.company,
      })
      .exec();

    if (!findAllClass) {
      throw new NotFoundException(
        'no employment status found with your company id',
      );
    }

    let result = findAllClass.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async updateClass(update: any) {
    await this.findClass(update._id);
    const updatedClass = await this.classModel.updateOne(
      { _id: update._id },
      {
        $set: {
          className: update.className,
          from: update.from,
          to: update.to,
          updatedAt: Date.now(),
        },
      },
    );
    return updatedClass;
  }

  async deletedClass(id: any) {
    await this.findClass(id._id);
    const deletedClass = await this.classModel.deleteOne({
      _id: id._id,
    });
    return deletedClass;
  }

  async addCustomField(userDoc: any, customField: CustomFieldDto) {
    const addCustomField = new this.customFieldModel({
      company: userDoc.company,
      fieldName: customField.fieldName,
      fieldType: customField.fieldType,
      ees: customField.ees,
      cv: customField.cv,
      fieldOption: customField.fieldOption,
      createdBy: userDoc.sub,
    });
    await addCustomField.save();
    return addCustomField;
  }

  async findCustomField(id: any) {
    const findCustomField = await this.customFieldModel.findById(id);
    if (!findCustomField) {
      throw new NotFoundException('no custom field found with id: ' + id);
    }
    let result = findCustomField.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    result.updatedAt = result.updatedAt.toLocaleString();
    return result;
  }

  async findAllCustomField(userDoc: any) {
    const findAllCustomField = await this.customFieldModel
      .find({ company: userDoc.company })
      .exec();

    if (!findAllCustomField) {
      throw new NotFoundException('no custom field found with your company id');
    }

    let result = findAllCustomField.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async updateCustomField(update: any) {
    await this.findCustomField(update._id);
    const updatedCustomField = await this.customFieldModel.updateOne(
      { _id: update._id },
      {
        $set: {
          fieldName: update.fieldName,
          fieldType: update.fieldType,
          ees: update.ees,
          cv: update.cv,
          fieldOption: update.fieldOption,
          updatedAt: Date.now(),
        },
      },
    );
    return updatedCustomField;
  }

  async deleteCustomField(id: any) {
    await this.findCustomField(id._id);
    const deletedCustomField = await this.customFieldModel.deleteOne({
      _id: id._id,
    });
    return deletedCustomField;
  }

  async addGrade(userDoc: any, gradeDto: GradeDto) {
    const addGrade = new this.gradeModel({
      company: userDoc.company,
      gradeName: gradeDto.gradeName,
      createdBy: userDoc.sub,
    });
    await addGrade.save();
    return addGrade;
  }

  async findGrade(id: any) {
    const findGrade = await this.gradeModel.findById(id);
    if (!findGrade) {
      throw new NotFoundException('no grade found with id: ' + id);
    }
    let result = findGrade.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    result.updatedAt = result.updatedAt.toLocaleString();
    return result;
  }

  async findAllGrade(userDoc: any) {
    const findAllGrade = await this.gradeModel
      .find({ company: userDoc.company })
      .exec();

    if (!findAllGrade) {
      throw new NotFoundException('no grade found with your company id');
    }

    let result = findAllGrade.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async updateGrade(update: any) {
    await this.findGrade(update._id);
    const updatedGrade = await this.gradeModel.updateOne(
      { _id: update._id },
      {
        $set: {
          gradeName: update.gradeName,
          updatedAt: Date.now(),
        },
      },
    );
    return updatedGrade;
  }

  async deleteGrade(id: any) {
    await this.findGrade(id._id);
    const deletedGrade = await this.gradeModel.deleteOne({
      _id: id._id,
    });
    return deletedGrade;
  }

  async addEvent(userDoc: any, event: EventDto) {
    const addEvent = new this.eventModel({
      company: userDoc.company,
      eventName: event.eventName,
      eventDate: event.eventDate,
      eventDuration: event.eventDuration,
      companyHoliday: event.companyHoliday,
      startTime: event.startTime,
      endTime: event.endTime,
      note: event.note,
      createdBy: userDoc.sub,
    });
    await addEvent.save();
    return addEvent;
  }

  async findEvent(id: any) {
    const findEvent = await this.eventModel.findById(id);
    if (!findEvent) {
      throw new NotFoundException('no found event with id: ' + id);
    }
    let result = findEvent.toObject();
    result.eventDate = result.eventDate.toLocaleString();
    result.startTime = result.startTime.toLocaleString();
    result.endTime = result.endTime.toLocaleString();
    result.createdAt = result.createdAt.toLocaleString();
    result.updatedAt = result.updatedAt.toLocaleString();
    return result;
  }

  async findAllEvent(userDoc: any) {
    const findAllEvent = await this.eventModel
      .find({ company: userDoc.company })
      .exec();

    if (!findAllEvent) {
      throw new NotFoundException('no event found with your company id');
    }

    let result = findAllEvent.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.eventDate = i.eventDate.toLocaleString();
      i.startTime = i.startTime.toLocaleString();
      i.endTime = i.endTime.toLocaleString();
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async updateEvent(update: any) {
    await this.findEvent(update._id);
    const updatedEvent = await this.eventModel.updateOne(
      { _id: update._id },
      {
        $set: {
          eventName: update.eventName,
          eventDate: update.eventDate,
          eventDuration: update.eventDuration,
          companyHoliday: update.companyHoliday,
          startTime: update.startTime,
          endTime: update.endTime,
          note: update.note,
          updatedAt: Date.now(),
        },
      },
    );
    return updatedEvent;
  }

  async deleteEvent(id: any) {
    await this.findEvent(id._id);
    const deletedEvent = await this.eventModel.deleteOne({
      _id: id._id,
    });
    return deletedEvent;
  }

  async addNpp(userDoc: any, npp: NppBpjsKetenagakerjaanDto) {
    const addNpp = new this.nppBpjsKetenagakerjaanModel({
      company: userDoc.company,
      nppName: npp.nppName,
      nppNumber: npp.nppNumber,
      jkk: npp.jkk,
      createdBy: userDoc.sub,
    });
    await addNpp.save();
    return addNpp;
  }

  async findNpp(id: any) {
    const findNpp = await this.nppBpjsKetenagakerjaanModel.findById(id);
    if (!findNpp) {
      throw new NotFoundException(
        'no npp-bpjs-ketenagakerjaan found with id: ' + id,
      );
    }
    let result = findNpp.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    result.updatedAt = result.updatedAt.toLocaleString();
    return result;
  }

  async findAllNpp(userDoc: any) {
    const findAllNpp = await this.nppBpjsKetenagakerjaanModel
      .find({ company: userDoc.company })
      .exec();

    if (!findAllNpp) {
      throw new NotFoundException(
        'no npp-bpjs-ketenagakerjaan found with your company id',
      );
    }

    let result = findAllNpp.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async updateNpp(update: any) {
    await this.findNpp(update._id);
    const updtedNpp = await this.nppBpjsKetenagakerjaanModel.updateOne(
      { _id: update._id },
      {
        $set: {
          nppName: update.nppName,
          nppNumber: update.nppNumber,
          jkk: update.jkk,
          updatedAt: Date.now(),
        },
      },
    );
    return updtedNpp;
  }

  async deleteNpp(id: any) {
    await this.findNpp(id._id);
    const deletedNpp = await this.nppBpjsKetenagakerjaanModel.deleteOne({
      _id: id._id,
    });
    return deletedNpp;
  }


}
