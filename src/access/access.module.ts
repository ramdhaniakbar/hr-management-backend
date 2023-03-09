import { forwardRef, Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessSchema } from './access.model';
import { UserService } from 'src/users/users.service';
import { UserModule } from 'src/users/users.module';



@Module({
  imports: [ MongooseModule.forFeature([{name: 'Access', schema: AccessSchema}]), forwardRef(()=> UserModule) ],
  providers: [AccessService],
  controllers: [AccessController],
  exports: [AccessService]
})
export class AccessModule {}
