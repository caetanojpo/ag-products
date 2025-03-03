import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../persistence/schemas/user.schema';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../mapper/user.mapper';
import { EntityNotFoundException } from '../../../domain/exceptions/entity-not-found.exception';

@Injectable()
export class PersistenceUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  public async save(user: User): Promise<User> {
    const userSchema: UserSchema = UserMapper.fromUserToUserSchema(user);
    const entity = this.repository.create(userSchema);
    const savedEntity = await this.repository.save(entity);
    return UserMapper.fromUserSchemaToUser(savedEntity);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users.map((user) => UserMapper.fromUserSchemaToUser(user));
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? UserMapper.fromUserSchemaToUser(user) : null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? UserMapper.fromUserSchemaToUser(user) : null;
  }

  public async update(user: User): Promise<User> {
    const userSchema = UserMapper.fromUserToUserSchema(user);
    const existingUser = await this.repository.preload(userSchema);

    if (!existingUser) {
      throw new EntityNotFoundException(`User with ID ${user.id} not found`);
    }
    const updatedEntity = await this.repository.save(existingUser);
    return UserMapper.fromUserSchemaToUser(updatedEntity);
  }

  public async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new EntityNotFoundException(`User with ID ${id} not found`);
    }
  }
}
