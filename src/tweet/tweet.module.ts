import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { TweetEntity } from './tweet.entity';
import { Utils } from 'helpers/utils/utils';

@Module({
  controllers: [TweetController],
  providers: [
    TweetService,
    {
      provide: 'TWEET_REPOSITORY',
      useValue: TweetEntity
    },
    Utils
  ],
  exports:['TWEET_REPOSITORY']
})
export class TweetModule {}

