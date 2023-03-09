import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RequestCashAdvance } from "./request-cash-advance.model";


@Injectable()
export class RequestCashAdvanceService {
    constructor(@InjectModel('RequestCashAdvance') private readonly rquestCashAdvance: Model<RequestCashAdvance>){}
}
