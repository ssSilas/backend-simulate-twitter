import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"
export class SignInDto {
  @ApiProperty()
  @IsNotEmpty({ message: "O campo login não pode estar vazio" })
  login: string

  @ApiProperty()
  @IsNotEmpty({ message: "O campo password não pode estar vazio" })
  password: string
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Favor informar um nome" })
  name: string

  @ApiProperty()
  @IsNotEmpty({ message: "Favor informar um nome" })
  @IsEmail({}, { message: 'Favor informar um email válido' })
  email: string

  @ApiProperty()
  @IsNotEmpty({ message: "Favor informar um login" })
  login: string

  @ApiProperty()
  @IsNotEmpty({ message: "Favor informar uma senha" })
  password: string
}

export class UserDataForTokenDto {
  id: number
  email: string
}