import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { UserService } from '../users.service';
import { PersonalDataDto } from './dto';
import { FamilyDto } from './dto/family.dto';
import { IdFamilyDto } from './dto/id-family.dto';
import { IdentityAddressDto } from './dto/identity-address.dto';
import { EmployeePersonalData } from './employee-personal-data.model';

@Injectable()
export class EmployeePersonalDataService {
  constructor(
    @InjectModel('EmployeePersonalData')
    private readonly employeePersonalDataModel: Model<EmployeePersonalData>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async createEmployeePersonalData(personalData: any) {
    const employeePersonalData = await this.employeePersonalDataModel.create(
      personalData,
    );

    console.log(personalData, 'pd');

    return employeePersonalData;
  }

  async findPersonalInfo(user: any) {
    const personalInfo = await this.employeePersonalDataModel
      .findOne({ user: user.sub })
      .populate('user company')
      .select('-createdBy -updatedBy -updatedAt');
    if (!personalInfo) {
      throw new NotFoundException('no personal info found');
    }
    const result = personalInfo.toObject();
    delete result.user.password;

    return result;
  }

  async findBasicInfoById(user: any, id: any) {
    const basicInfo = await this.employeePersonalDataModel
      .findOne({ user: id })
      .populate('user');
    if (!basicInfo) {
      throw new NotFoundException(
        'no personal info found with the user id of ' + id,
      );
    }

    // const result = basicInfo.toObject();
    // if (result.user.password) {
    //   delete result.user.password;
    // }
    // result.birthDate = basicInfo.birthDate.toLocaleString();
    // if (basicInfo.identityAddress.idExpirationDate) {
    //   result.identityAddress.idExpirationDate =
    //     basicInfo.identityAddress.idExpirationDate.toLocaleString();
    // }
    // return result;
  }

  async editPersonalData(user: any, id: any, personalData: PersonalDataDto) {
    await this.findBasicInfoById(user, id);
    await this.userService.checkEmail(personalData.email, id);
    let i = instanceToPlain(personalData);
    await this.userService.editPersonalData(id, i);
    delete i.name;
    delete i.email;
    i.updatedAt = Date.now();
    i.updatedBy = user.sub;
    const result = await this.employeePersonalDataModel.updateOne(
      { user: id },
      { $set: i },
    );

    return result;
  }

  async editIdentityAddress(
    user: any,
    id: any,
    identityAddress: IdentityAddressDto,
  ) {
    const personalData = await this.employeePersonalDataModel.findOne({
      _id: id,
    });

    if (!personalData) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeePersonalDataModel.updateOne(
      {
        _id: id,
      },
      { $set: { identityAddress: identityAddress } },
    );

    return result;
  }

  async addFamily(user: any, id: any, familyDto: FamilyDto) {
    const personalData = await this.employeePersonalDataModel.findOne({
      _id: id,
    });

    if (!personalData) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeePersonalDataModel.updateOne(
      { _id: id },
      { $addToSet: { family: familyDto } },
    );

    return result;
  }

  async editFamily(user: any, id: any, familyDto: IdFamilyDto) {
    const personalData = await this.employeePersonalDataModel.findOne({
      _id: id,
    });

    if (!personalData) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeePersonalDataModel.updateOne(
      { _id: id, 'family._id': familyDto._id },
      {
        $set: { 'family.$': familyDto },
      },
    );

    return result;
  }

  async deleteFamily(user: any, id: any, familyDto: IdFamilyDto) {
    const personalData = await this.employeePersonalDataModel.findOne({
      _id: id,
    });

    if (!personalData) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeePersonalDataModel.updateOne(
      { _id: id },
      {
        $pull: { family: { _id: Object(familyDto._id) } },
      },
    );

    return result;
  }
}
