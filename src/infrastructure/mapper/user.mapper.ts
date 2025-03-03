import { User } from '../../domain/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserSchema } from '../database/persistence/schemas/user.schema';
import { UserResponseDTO } from '../../application/dtos/user/userResponse.dto';
import { CreateUserDTO } from '../../application/dtos/user/createUser.dto';
import { UpdateUserDTO } from '../../application/dtos/user/updateUser.dto';

export class UserMapper {
  public static fromUserSchemaToUser(userSchema: UserSchema): User {
    return plainToClass(User, userSchema, { excludeExtraneousValues: true });
  }

  public static fromUserToUserSchema(user: User): UserSchema {
    return plainToClass(UserSchema, user);
  }

  public static fromUserToUserResponse(user: User): UserResponseDTO {
    return plainToClass(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  public static fromCreateUserDTOToUser(createUserDto: CreateUserDTO): User {
    return plainToClass(User, createUserDto);
  }

  public static fromUpdateUserDTOToUser(updateUserDto: UpdateUserDTO): User {
    return plainToClass(User, updateUserDto);
  }
}
