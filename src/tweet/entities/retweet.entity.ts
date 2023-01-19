import { Column, ForeignKey, Model, Table } from "sequelize-typescript"
import { UserEntity } from "src/user/user.entity"
import { TweetEntity } from "./tweet.entity"

@Table({ tableName: 'retweet', modelName: 'retweet', freezeTableName: true })
export class RetweetEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @ForeignKey(() => UserEntity)
  @Column({ allowNull: false })
  userfk: number

  @ForeignKey(() => TweetEntity)
  @Column({ allowNull: false })
  tweetfk: number

  @Column({ allowNull: true })
  text: string
}