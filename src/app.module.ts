import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import config from 'helpers/db/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/user.entity';
import { TweetModule } from './tweet/tweet.module';
import { TweetEntity } from './tweet/entities/tweet.entity';
import { UsersLikedModule } from './users-liked/users-liked.module';
import { UserLikedEntity } from './users-liked/user-liked.entity';
import { RetweetEntity } from './tweet/entities/retweet.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config().database.host,
      port: config().database.port,
      username: config().database.user,
      password: config().database.pass,
      database: config().database.dbName,
      models: [UserEntity, TweetEntity, UserLikedEntity, RetweetEntity],
      define: { updatedAt: false },
      autoLoadModels: true,
      synchronize: true
    }),
    AuthModule,
    UserModule,
    TweetModule,
    UsersLikedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }