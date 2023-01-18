import { Controller } from '@nestjs/common';
import { UsersLikedService } from './users-liked.service';

@Controller('users-liked')
export class UsersLikedController {
  constructor(private readonly usersLikedService: UsersLikedService) {}
}
