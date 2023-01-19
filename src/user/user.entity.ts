import { Column, HasMany, Model, Table } from "sequelize-typescript"
import { RetweetEntity } from "src/tweet/entities/retweet.entity"
import { TweetEntity } from "src/tweet/entities/tweet.entity"
import { UserLikedEntity } from "src/users-liked/user-liked.entity"
@Table({ tableName: 'user', modelName: 'user', freezeTableName: true })
export class UserEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  email: string

  @Column({ allowNull: false })
  login: string

  @Column({ allowNull: false })
  password: string

  @Column({ allowNull: false })
  status: number

  @HasMany(() => TweetEntity)
  tweet: TweetEntity

  @HasMany(() => UserLikedEntity)
  userliked: UserLikedEntity

  @HasMany(() => RetweetEntity)
  retweet: RetweetEntity
}