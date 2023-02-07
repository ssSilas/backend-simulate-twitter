import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
export class CreateTweetDto {
  @IsNotEmpty({ message: "Informe o texto que deseja postar" })
  text: string
}
export class DeleteTweetDto {
  @ApiProperty({ description: "Tweet que será deletado" })
  id: string
}
export class InteractionsTweetDto {
  @ApiProperty({ description: "Id que receberá o *like* ou o *dislike*." })
  @IsNotEmpty({ message: "Informe o id do tweet" })
  @IsNumber()
  tweetId: number

  @ApiProperty({ description: "O parâmetro type informa se a interação é *like* ou *dislike*, sendo assim, basta informar um dos dois." })
  @IsNotEmpty({ message: "Informe o tipo da interação" })
  type: string
}
export class CreateRetweetDto {
  @ApiProperty({ description: "Id base para o retweet. Para isso, o id precisa existir." })
  @IsNotEmpty({ message: "Informe o id do tweet" })
  @IsNumber()
  tweetBaseId: number

  @ApiPropertyOptional({ description: "Texto do retweet." })
  @IsString()
  text: string
}
