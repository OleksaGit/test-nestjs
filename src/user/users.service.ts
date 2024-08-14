import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AddUserDto } from './dto/add-user.dto';
import { UserEntity } from './entities/user.entity';
import {IUser} from "./interfaces/user.interface";

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	async addUser(data: AddUserDto): Promise<Omit<IUser, 'password' | 'passwordHash'>> {
		const userEntity = new UserEntity(data);
		const isUserExist = await this.userRepository.getUserByEmail(userEntity.getUserEmail())
		if (isUserExist) {
			throw new ConflictException('User with this email already exists');
		}

		await userEntity.setPassword(data.password);
		const createdUser = await this.userRepository.createUser(userEntity);
		return new UserEntity(createdUser).getPublicUserData();
	}

	async getUser(id: number): Promise<Omit<IUser, 'password' | 'passwordHash'>> {
		const user = await this.userRepository.getUserById(id);
		if (!user) {
			throw new NotFoundException('User for this id not found')
		}
		const userEntity = new UserEntity(user)
		return userEntity.getPublicUserData()
	}
}
