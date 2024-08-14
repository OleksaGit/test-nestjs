import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from '../db-models/user.model';

@Module({
	imports: [SequelizeModule.forFeature([UserModel])],
	providers: [UsersService, UserRepository],
	controllers: [UsersController],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
