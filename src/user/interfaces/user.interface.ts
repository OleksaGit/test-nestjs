export interface IUser {
	userId?: number;
	firstName: string;
	secondName: string;
	email: string;
	password?: string;
	passwordHash?: string;
}
