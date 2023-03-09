import { SetMetadata } from "@nestjs/common";

export const AllowUnauthorizedCasl = () => SetMetadata('allowUnauthorizedRequest', true);