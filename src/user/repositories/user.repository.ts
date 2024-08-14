import { InjectModel } from '@nestjs/sequelize';
import UserModel from '../../db-models/user.model';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

Injectable();
export class UserRepository {
	constructor(
		@InjectModel(UserModel) private readonly userModel: typeof UserModel,
	) {}

	async createUser(data: UserEntity) {
		await this.userModel.create({ ...data });
	}

	async getUserById(id: number) {
		return await this.userModel.findByPk(id);
	}
}
