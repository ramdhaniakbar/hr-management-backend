import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('request-delegation')
export class RequestDelegationController {
    
}
