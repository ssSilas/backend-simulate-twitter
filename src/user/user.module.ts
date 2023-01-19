import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Module({
  controllers: [],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useValue: UserEntity
    },
  ],
  exports: ['USER_REPOSITORY', UserService]
})
export class UserModule { }
