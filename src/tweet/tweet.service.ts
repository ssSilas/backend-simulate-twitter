import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TweetEntity } from './tweet.entity';
import { Utils } from 'helpers/utils/utils';

@Injectable()
export class TweetService {
  constructor(
    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepo: typeof TweetEntity,

    private utils: Utils
  ) { }

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
}
