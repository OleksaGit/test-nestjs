import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AddUserDto } from './dto/add-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	async addUser(data: AddUserDto) {
		const userEntity = new UserEntity(data);
		await userEntity.setPassword(data.password);
		return await this.userRepository.createUser(userEntity);
	}

	async getUser(id: number) {
		return await this.userRepository.getUserById(id);
	}
}
