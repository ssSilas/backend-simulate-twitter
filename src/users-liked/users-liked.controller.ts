import { Body, Controller, Delete, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsersLikedService } from './users-liked.service';
import { Request as ReqEx } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { InteractionsTweetDto } from 'helpers/dto/tweet.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('interactions')
@Controller('interactions')
@UseGuards(AuthGuard('jwt'))
export class UsersLikedController {
  constructor(
    private readonly usersLikedService: UsersLikedService,
  ) { }

  @Post()
  async likeOrDislike(@Body() data: InteractionsTweetDto, @Request() req: ReqEx) {
    try {
      const user = req.user
      return this.usersLikedService.createOrUpdate(data, user["id"])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Delete("delete")
  @ApiQuery({ description: "Esta ação remove a interação presente, caso exista." })
  async removeInteraction(@Query('id') id: number) {
    try {
      return this.usersLikedService.removeInteraction(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
