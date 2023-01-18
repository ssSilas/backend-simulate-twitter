import { Body, Controller, Delete, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweet } from 'helpers/dto/tweet.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ReqEx } from 'express';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createTweet(@Body() data: CreateTweet, @Request() req: ReqEx) {
    try {
      const user = req.user
      return this.tweetService.createTweet(data.text, user["id"])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteTweet(@Query('id') id: number, @Request() req: ReqEx) {
    try {
      const user = req.user
      return this.tweetService.deleteTweet(id, user["id"])
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
