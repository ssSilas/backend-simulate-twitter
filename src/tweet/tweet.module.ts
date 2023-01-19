import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { TweetEntity } from './entities/tweet.entity';
import { Utils } from 'helpers/utils/utils';
import { RetweetEntity } from './entities/retweet.entity';

@Module({
  controllers: [TweetController],
  providers: [
    TweetService,
    {
      provide: 'TWEET_REPOSITORY',
      useValue: TweetEntity
    },
    {
      provide: 'RETWEET_REPOSITORY',
      useValue: RetweetEntity
    },
    Utils
  ],
  exports: ['TWEET_REPOSITORY', 'RETWEET_REPOSITORY', TweetService]
})
export class TweetModule { }

