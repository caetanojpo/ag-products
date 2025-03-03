import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { CreateUserDTO } from '../../application/dtos/user/createUser.dto';
import { CreateUserUsecase } from '../../application/usecases/users/create-user.usecase';
import { UserMapper } from '../../infrastructure/mapper/user.mapper';
import { UserResponseDTO } from '../../application/dtos/user/userResponse.dto';
import { HttpException } from '../../domain/exceptions/http.exception';

@Controller('/api/v1/users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly create: CreateUserUsecase) {}

  @Post()
  public async createUser(
    @Body() userData: CreateUserDTO,
  ): Promise<UserResponseDTO> {
    try {
      const userEntity = UserMapper.fromCreateUserDTOToUser(userData);
      const createdUser = await this.create.execute(userEntity);
      const userResponse = UserMapper.fromUserToUserResponse(createdUser);
      this.logger.log(
        `User with email ${createdUser.email} created successfully.`,
      );

      return userResponse;
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw new HttpException(
        'User creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
