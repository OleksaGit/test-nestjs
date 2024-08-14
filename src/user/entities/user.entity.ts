import { IUser } from '../interfaces/user.interface';

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
}
