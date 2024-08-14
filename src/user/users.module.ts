import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from '../db-models/user.model';

@Module({
	imports: [SequelizeModule.forFeature([UserModel])],
	providers: [UsersService, UserRepository],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
