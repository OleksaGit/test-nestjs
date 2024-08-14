import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUserDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	secondName: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
