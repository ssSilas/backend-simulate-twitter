import { Module } from '@nestjs/common';
import { UsersLikedService } from './users-liked.service';
import { UsersLikedController } from './users-liked.controller';
import { UserLikedEntity } from './user-liked.entity';
import { TweetModule } from 'src/tweet/tweet.module';
import { Utils } from 'helpers/utils/utils';

@Module({
  imports:[TweetModule],
  controllers: [UsersLikedController],
  providers: [
    UsersLikedService,
    {
      provide: 'USERLIKED_REPOSITORY',
      useValue: UserLikedEntity
    },
    Utils
  ],
  exports: ['USERLIKED_REPOSITORY']
})
export class UsersLikedModule { }
