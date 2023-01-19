import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
      passwordField: 'password',
    })
  }

  @ApiProperty()
  async validate(login: string, password: string) {
    try {
      const user = await this.authService.validateUser(login, password)
      if (!user) throw new UnauthorizedException({ message: "Login e/ou senha inválidos" })

      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}