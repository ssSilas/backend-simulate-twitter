import { Inject, Injectable } from '@nestjs/common';
import { UserLikedEntity } from './user-liked.entity';
import { TweetService } from 'src/tweet/tweet.service';
import { InteractionsTweetDto } from 'helpers/dto/tweet.dto';
import { Utils } from 'helpers/utils/utils';

@Injectable()
export class UsersLikedService {
  constructor(
    @Inject('USERLIKED_REPOSITORY')
    private readonly userLikedRepo: typeof UserLikedEntity,
    private tweetService: TweetService,
    private readonly utils: Utils
  ) { }

  async create(data: InteractionsTweetDto, userId: number) {
    const getPost = await this.tweetService.getOneTweet(data.tweetId)
    const create = await this.userLikedRepo.create({
      tweetfk: getPost.id,
      userposted: getPost.userfk,
      userliked: userId,
      type: this.utils.statusInteractions()[data.type]
    })
    return create
  }

  async update(data: InteractionsTweetDto, userId: number) {
    return await this.userLikedRepo.update(
      { type: this.utils.statusInteractions()[data.type] },
      { where: { tweetfk: data.tweetId } }
    )
  }

  async createOrUpdate(data: InteractionsTweetDto, userId: number) {
    const validate = await this.interactionExist(data.tweetId, userId)
    const compareTypes = validate && this.utils.statusInteractions()[data.type] == validate.type

    if (validate && !compareTypes) {
      return this.update(data, userId)
    }
    if (!validate) {
      return await this.create(data, userId)
    }
    return false
  }

  async interactionExist(tweetId: number, userId: number) {
    return await this.userLikedRepo.findOne({
      raw: true,
      where: {
        tweetfk: tweetId,
        userliked: userId,
      }
    })
  }

  async removeInteraction(interactionId: number) {
    const destroy = await this.userLikedRepo.destroy(
      { where: { id: interactionId } }
    )
    return destroy
  }
}
