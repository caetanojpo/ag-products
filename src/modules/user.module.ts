import { Module } from '@nestjs/common';
import { UserController } from '../presentation/controllers/user.controller';
import { CreateUserUsecase } from '../application/usecases/users/create-user.usecase';
import { AuthUsecase } from '../application/usecases/auth/auth-usecase';
import { PersistenceUserRepository } from '../infrastructure/database/repository/persistence-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../infrastructure/database/persistence/schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [CreateUserUsecase, AuthUsecase, PersistenceUserRepository],
})
export class UserModule {}
