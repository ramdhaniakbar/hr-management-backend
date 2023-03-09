import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessSchema } from 'src/access/access.model';
import { AccessModule } from 'src/access/access.module';
import { UserSchema } from 'src/users/user.model';
import { UserModule } from 'src/users/users.module';
import { AbilityFactory } from './ability.factory';


@Module({
    imports: [forwardRef(()=> UserModule), MongooseModule.forFeature([{ name: 'User', schema: UserSchema}, { name: 'Access', schema: AccessSchema}]),AccessModule],
    providers: [AbilityFactory],
    exports: [AbilityFactory],
})
export class AbilityModule {}
