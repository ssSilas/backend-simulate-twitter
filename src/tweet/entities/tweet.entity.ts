import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { UserEntity } from "src/user/user.entity"
import { UserLikedEntity } from "src/users-liked/user-liked.entity"
import { RetweetEntity } from "./retweet.entity"

@Table({ tableName: 'tweet', modelName: 'tweet', freezeTableName: true })
export class TweetEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @Column({ allowNull: false })
  text: string

  @ForeignKey(() => UserEntity)
  @Column({ allowNull: false })
  userfk: number

  @Column({ allowNull: false })
  status: number

  @HasMany(() => UserLikedEntity)
  userLiked: UserLikedEntity

  @HasMany(() => RetweetEntity)
  retweet: RetweetEntity
}