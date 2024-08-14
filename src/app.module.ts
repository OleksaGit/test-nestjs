import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserModel from './db-models/user.model';

@Module({
	imports: [
		UsersModule,
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
	providers: [AppService],
})
export class AppModule {}
