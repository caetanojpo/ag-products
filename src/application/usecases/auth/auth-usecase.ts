import * as bcrypt from 'bcrypt';
import { PersistenceUserRepository } from '../../../infrastructure/database/repository/persistence-user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUsecase {
  private readonly saltRounds = 10;

  constructor(private readonly: PersistenceUserRepository) {}

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  public async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
