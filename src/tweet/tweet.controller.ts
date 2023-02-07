import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateRetweetDto, CreateTweetDto } from 'helpers/dto/tweet.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ReqEx } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('tweet')
@Controller('tweet')
@UseGuards(AuthGuard('jwt'))
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }
  @Get('all')
  async getTweets() {
    try {
      return this.tweetService.getAllTweets()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Post('create')
  @ApiBody({
    type: CreateTweetDto,
    description: "Texto que o usuário irá Twittar"
  })
  async createTweet(@Body() data: CreateTweetDto, @Request() req: ReqEx) {
    try {
      const user = req.user
      return this.tweetService.createTweet(data.text, user["id"])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Delete('delete')
  async deleteTweet(@Query('id') id: number, @Request() req: ReqEx) {
    try {
      const user = req.user
      return await this.tweetService.deleteTweet(id, user["id"])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Post('retweet')
  async retweet(@Body() data: CreateRetweetDto, @Request() req: ReqEx) {
    try {
      const user = req.user
      return this.tweetService.retweet(data, user["id"])
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
