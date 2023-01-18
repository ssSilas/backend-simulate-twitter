import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: typeof UserEntity
  ) { }

  async findAll() {
    return await this.userRepo.findOne({
      attributes: ['name', 'email', 'status']
    });
  }

  async findByLogin(login: string) {
    try {
      const user = await this.userRepo.findOne({
        raw: true,
        attributes: ['id', 'email', 'password'],
        where: { login }
      });
      if (!user) {
        throw new UnauthorizedException(
          "O usuario não existe, favor informar um login válido"
        );
      }
      return user
    } catch (error) {
      throw error
    }
  }

  async emailExist(email: string) {
    try {
      const validation = await this.userRepo.findOne({
        attributes: ['id', 'email', 'password'],
        where: { email }
      });

      if (validation) {
        throw new BadRequestException(
          "O email já é utilizado, favor informar um email válido"
        );
      }
    } catch (error) {
      throw error
    }
  }

  async loginExist(login: string) {
    try {
      const validation = await this.userRepo.findOne({
        attributes: ['id', 'email', 'password'],
        where: { login }
      });

      if (validation) {
        throw new BadRequestException(
          "O login já é utilizado, favor informar um login válido"
        );
      }
    } catch (error) {
      throw error
    }
  }

  async login(email: string, senha: string) {
    return {
      email,
      senha
    }
  }
}
