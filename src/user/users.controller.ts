import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UsePipes(new ValidationPipe())
	@Post('create-user')
	async createUser(@Body() dto: AddUserDto) {
		return await this.usersService.addUser(dto);
	}

	@Get('get-user/:id')
	async getUser(@Param('id', ParseIntPipe) userId: number) {
		return await this.usersService.getUser(userId);
	}
}
