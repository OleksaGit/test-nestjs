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
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UsePipes(new ValidationPipe())
	@Post('create-user')
	async createUser(@Body() dto: CreateUserDto) {
		return await this.usersService.createUser(dto);
	}

	@Get('user/:id')
	async getUser(@Param('id', ParseIntPipe) userId: number) {
		return await this.usersService.getUser(userId);
	}
}
