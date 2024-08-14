import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './user/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import UserModel from './db-models/user.model';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		PassportModule,
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: '.development.env',
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: 'mysql',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),
				autoLoadModels: true,
				synchronize: true,
				models: [UserModel],
			}),
		}),
	],
	controllers: [AppController],
	providers: [UsersModule, AuthModule],
})
export class AppModule {}
