import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cashAdvanceCategoryDto } from './dto';
import { CashAdvanceCategory } from './cash-advance-category.model';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class CashAdvanceCategoryService {
  constructor(
    @InjectModel('CashAdvanceCategory')
    private readonly cashAdvanceCategoryModel: Model<CashAdvanceCategory>,
  ) {}

  async createcashAdvanceCategory(
    user: any,
    cashAdvanceCategory: cashAdvanceCategoryDto,
  ) {
    const i = cashAdvanceCategory;

    // defaultForlimitAmountPerRequest
    if (i.SetLimitAmountPerRequest == false) {
      if (i.limitAmountPerRequest != null) {
        throw new ForbiddenException(
          'limitAmountPerRequest should be null when SetLimitAmountPerRequest is false',
        );
      }
    } else if (i.SetLimitAmountPerRequest == true) {
      if (i.limitAmountPerRequest == null) {
        throw new ForbiddenException(
          "limitAmountPerRequest shouldn't be null when SetLimitAmountPerRequest is true",
        );
      }
    }
    let createcashAdvanceCategory = instanceToPlain(i);
    createcashAdvanceCategory.company = user.company;
    createcashAdvanceCategory.createdBy = user.sub;

    const result = await this.cashAdvanceCategoryModel.create(
      createcashAdvanceCategory,
    );

    return result;
  }

  async findOnecashAdvanceCategory(user: any, id: any) {
    const CashAdvanceCategory = await this.cashAdvanceCategoryModel.findById(
      id,
    );
    if (!CashAdvanceCategory) {
      throw new ForbiddenException(
        'no cash advance category found with the id: ' + id,
      );
    }
    let result = CashAdvanceCategory.toObject();
    result.createdAt = result.createdAt.toLocaleString();

    return result;
  }

  async findAllcashAdvanceCategory(user: any) {
    const CashAdvanceCategory = await this.cashAdvanceCategoryModel.find({
      company: user.company,
    });

    if (CashAdvanceCategory.length == 0) {
      throw new ForbiddenException(
        'no cash advance category found with the your company id ',
      );
    }
    let result = CashAdvanceCategory.map((i) => {
      return i.toObject();
    });
    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
    });
    return result;
  }

  async deleteOnecashAdvanceCategory(user: any, id: any) {
    await this.findOnecashAdvanceCategory(user, id);
    const deletedcashAdvanceCategory =
      await this.cashAdvanceCategoryModel.deleteOne({ _id: id });
    return deletedcashAdvanceCategory;
  }

  async updateCashAdvanceCategory(user: any, cashAdvanceCategory: cashAdvanceCategoryDto, id: any) {

    await this.findOnecashAdvanceCategory(user, id)
    const i = instanceToPlain(cashAdvanceCategory)

    // defaultForlimitAmountPerRequest

    if (i.SetLimitAmountPerRequest == false) {
      if (i.limitAmountPerRequest != null) {
        throw new ForbiddenException(
          'limitAmountPerRequest should be null when SetLimitAmountPerRequest is false',
        );
      }
    } else if (i.SetLimitAmountPerRequest == true) {
      if (i.limitAmountPerRequest == null) {
        throw new ForbiddenException(
          "limitAmountPerRequest shouldn't be null when SetLimitAmountPerRequest is true",
        );
      }
    }
    const result = await this.cashAdvanceCategoryModel.updateOne({_id:id},{$set: i})
    return result
  }
}
