import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cashAdvancePolicyDto } from './dto';
import { CashAdvancePolicy } from './cash-advance-policy.model';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CashAdvancePolicyService {
  constructor(
    @InjectModel('CashAdvancePolicy')
    private readonly cashAdvancePolicyModel: Model<CashAdvancePolicy>,
  ) {}

  async createcashAdvancePolicy(
    user: any,
    cashAdvancePolicy: cashAdvancePolicyDto,
  ) {
    const i = cashAdvancePolicy;

    // include all categories

    if (i.includeAllCategory == true) {
      if (i.categories != null) {
        throw new ForbiddenException(
          'category should be null when include all category is true'
        );
      }
    } else if (i.includeAllCategory == false) {
      if (i.categories == null) {
        throw new ForbiddenException(
          "category shouldn't be null when include all category false",
        );
      }
    }

    let createcashAdvancePolicy = instanceToPlain(i)
    createcashAdvancePolicy.company = user.company;
    createcashAdvancePolicy.createdBy = user.sub;

    const result = await this.cashAdvancePolicyModel.create(
      createcashAdvancePolicy
    );

    return result;
  }

  async findOnecashAdvancePolicy(user: any, id: any) {
    const cashAdvancePolicy = await this.cashAdvancePolicyModel.findById(id);
    if (!cashAdvancePolicy) {
      throw new ForbiddenException(
        'no cash advance policy found with the id: ' + id,
      );
    }
    let result = cashAdvancePolicy.toObject();
    result.effectiveDate = result.effectiveDate.toLocaleString();
    result.settlementDueDate = result.settlementDueDate.toLocaleString();
    result.createdAt = result.createdAt.toLocaleString();

    return result;
  }

  async findAllcashAdvancePolicy(user: any) {
    const cashAdvancePolicy = await this.cashAdvancePolicyModel.find({
      company: user.company,
    });

    if (cashAdvancePolicy.length == 0) {
      throw new ForbiddenException(
        'no cash advance policy found with the your company id ',
      );
    }
    let result = cashAdvancePolicy.map((i) => {
      return i.toObject();
    });
    result.map((i) => {
      i.effectiveDate = i.effectiveDate.toLocaleString();
      i.settlementDueDate = i.settlementDueDate.toLocaleString();
      i.createdAt = i.createdAt.toLocaleString();
    });
    return result;
  }

  async deleteOnecashAdvancePolicy(user: any, id: any) {
    await this.findOnecashAdvancePolicy(user, id);
    const deletedcashAdvancePolicy =
      await this.cashAdvancePolicyModel.deleteOne({ _id: id });
    return deletedcashAdvancePolicy;
  }

  async updateCashAdvancePolicy(user: any, cashAdvancePolicy: cashAdvancePolicyDto, id: any) {

    await this.findOnecashAdvancePolicy(user, id)
    const i = instanceToPlain(cashAdvancePolicy)

    // include all categories
    if (i.includeAllCategory == true) {
      if (i.categories != null) {
        throw new ForbiddenException(
          'category should be null when include all category is true'
        );
      }
    } else if (i.includeAllCategory == false) {
      if (i.categories == null) {
        throw new ForbiddenException(
          "category shouldn't be null when include all category false",
        );
      }
    }

    const result = await this.cashAdvancePolicyModel.updateOne({_id:id},{$set: i})
    return result
  }
}
