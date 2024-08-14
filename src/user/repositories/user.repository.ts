import { InjectModel } from '@nestjs/sequelize';
import UserModel from '../../db-models/user.model';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

Injectable();
export class UserRepository {
	constructor(
		@InjectModel(UserModel) private readonly userModel: typeof UserModel,
	) {}

	async createUser(data: UserEntity): Promise<UserModel> {
		return await this.userModel.create({ ...data });
	}

	async getUserById(id: number): Promise<UserModel | null> {
		return await this.userModel.findByPk(id);
	}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		return await this.userModel.findOne({
			rejectOnEmpty: undefined,
			where: { email: email },
		});
	}
}
