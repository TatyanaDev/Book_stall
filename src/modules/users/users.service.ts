import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async registerUser(dto: RegisterUserDto): Promise<number> {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = new User();
    user.age = dto.age;
    user.email = dto.email;
    user.name = dto.name;
    user.passwordHash = passwordHash;

    const createdUser = await this.usersRepository.save(user);

    return createdUser.id;
  }

  getAllUsers() {
    return this.usersRepository.findAll();
  }
}
