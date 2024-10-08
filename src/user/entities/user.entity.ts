import { IUser } from '../interfaces/user.interface';
import { compare, genSalt, hash } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export class UserEntity implements IUser {
	userId?: number;
	firstName: string;
	secondName: string;
	email: string;
	password: string;
	passwordHash?: string;

	constructor(user: Partial<UserEntity>) {
		this.userId = user.userId;
		this.firstName = user.firstName;
		this.secondName = user.secondName;
		this.email = user.email;
		this.password = user.password;
		this.passwordHash = user.passwordHash;
	}

	getPublicUserData(): Omit<IUser, 'password' | 'passwordHash'> {
		return {
			userId: this.userId,
			firstName: this.firstName,
			secondName: this.secondName,
			email: this.email,
		}
	}

	getUserId(): number {
		if (!this.userId) {
			throw new InternalServerErrorException('Not found user id');
		}
		return this.userId;
	}

	getUserEmail(): string {
		if (!this.email) {
			throw new InternalServerErrorException('Not found email');
		}
		return this.email;
	}

	async setPassword(password: string): Promise<this> {
		const salt = await genSalt(10);
		this.passwordHash = await hash(password, salt);
		return this;
	}

	async validatePassword(password: string): Promise<boolean> {
		return await compare(password, this.passwordHash);
	}
}
