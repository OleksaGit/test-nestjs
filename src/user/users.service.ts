import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	async createUser(data: CreateUserDto) {
		const userEntity = new UserEntity(data);
		return await this.userRepository.createUser(userEntity);
	}

	async getUser(id: number) {
		return await this.userRepository.getUserById(id);
	}
}
