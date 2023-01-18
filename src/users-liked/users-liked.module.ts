import { Module } from '@nestjs/common';
import { UsersLikedService } from './users-liked.service';
import { UsersLikedController } from './users-liked.controller';

@Module({
  controllers: [UsersLikedController],
  providers: [UsersLikedService]
})
export class UsersLikedModule {}
