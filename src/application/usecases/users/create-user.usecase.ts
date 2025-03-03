import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { PersistenceUserRepository } from '../../../infrastructure/database/repository/persistence-user.repository';
import { AuthUsecase } from '../auth/auth-usecase';

@Injectable()
export class CreateUserUsecase {
  constructor(
    private readonly repository: PersistenceUserRepository,
    private readonly auth: AuthUsecase,
  ) {}

  public async execute(user: User): Promise<User> {
    const hashedPassword = await this.auth.hashPassword(user.password);
    user.password = hashedPassword;
    return await this.repository.save(user);
  }
}
