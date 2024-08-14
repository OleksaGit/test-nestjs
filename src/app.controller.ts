import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './user/users.service';
import { AddUserDto } from './user/dto/add-user.dto';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller({ version: '1' })
export class AppController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('add-user')
	async addUser(@Body() dto: AddUserDto) {
		return await this.usersService.addUser(dto);
	}

	@UseGuards(JwtGuard)
	@Get('get-user/:id')
	async getUser(@Param('id', ParseIntPipe) userId: number) {
		return await this.usersService.getUser(userId);
	}

	@UsePipes(new ValidationPipe())
	@Post('auth')
	async authUser(@Body() dto: AuthDto) {
		return await this.authService.getToken(dto);
	}
}
