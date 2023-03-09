import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class accountActivationAuthGuard extends AuthGuard('activation-code'){}