import { IsEmail, IsNotEmpty } from "class-validator"
export class CreateTweet {
  @IsNotEmpty({ message: "Informe o texto que deseja postar" })
  text: string
}
