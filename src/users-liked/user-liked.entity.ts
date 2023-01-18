import { Column, ForeignKey, Model, Table } from "sequelize-typescript"
import { TweetEntity } from "src/tweet/tweet.entity"
import { UserEntity } from "src/user/user.entity"

@Table({ tableName: 'userliked', modelName: 'userliked', freezeTableName: true })
export class UserLikedEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @ForeignKey(() => TweetEntity)
  @Column({ allowNull: false })
  tweet: number

  @ForeignKey(() => UserEntity)
  @Column({ allowNull: false })
  userposted: number

  @ForeignKey(() => UserEntity)
  @Column({ allowNull: false })
  userliked: number
}