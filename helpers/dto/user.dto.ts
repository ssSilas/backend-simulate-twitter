import { IsEmail, IsNotEmpty } from "class-validator"
export class SignInDto {
  @IsNotEmpty({message:"O campo login não pode estar vazio"})
  login: string

  @IsNotEmpty({message:"O campo password não pode estar vazio"})
  password: string
}
export class CreateUserDto {
  @IsNotEmpty({ message: "Favor informar um nome" })
  name: string

  @IsNotEmpty({ message: "Favor informar um nome" })
  @IsEmail({}, { message: 'Favor informar um email válido' })
  email: string

  @IsNotEmpty({ message: "Favor informar um login" })
  login: string

  @IsNotEmpty({ message: "Favor informar uma senha" })
  password: string
}

export class UserDataForTokenDto {
  id: number
  email: string
}