import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TweetEntity } from './entities/tweet.entity';
import { Utils } from 'helpers/utils/utils';
import { RetweetEntity } from './entities/retweet.entity';
import { CreateRetweetDto } from 'helpers/dto/tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepo: typeof TweetEntity,

    @Inject('RETWEET_REPOSITORY')
    private readonly retweetRepo: typeof RetweetEntity,

    private utils: Utils
  ) { }

  async getAllTweets() {
    return await this.tweetRepo.findAll({})
  }

  async createTweet(text: string, userId: number) {
    const create = await this.tweetRepo.create({
      text,
      status: this.utils.statusTweets().ativado,
      userfk: userId
    })
    return create
  }

  async deleteTweet(id: number, userId: number) {
    await this.validateBelongsToUser(id, userId)
    const destroy = await this.tweetRepo.destroy({
      where: { id }
    })
    return destroy
  }

  async retweet(data: CreateRetweetDto, userId: number) {
    const get = await this.getOneTweet(data.tweetBaseId)
    const create = await this.retweetRepo.create({
      userfk: userId,
      tweetfk: get.id,
      text: data.text
    })
    return create
  }

  async validateBelongsToUser(move: number, idUser: number) {
    const tweet = await this.tweetRepo.findOne({
      raw: true,
      attributes: ['userfk'],
      where: { id: move }
    })

    if (tweet.userfk != idUser) {
      throw new UnauthorizedException(
        { error: "Você não possui acesso para excluir dados de outro funcionario" },
      )
    }
    return true
  }

  async getOneTweet(id: number) {
    try {
      const tweet = await this.tweetRepo.findOne({
        raw: true,
        where: { id }
      })

      if (!tweet) {
        throw new BadRequestException({
          error: "O tweet não existe"
        });
      }
      return tweet
    } catch (error) {
      throw error
    }
  }
}
