import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableVersioning({
		type: VersioningType.URI,
	});
	const corsOptions: CorsOptions = {
		origin: 'http://localhost:1212',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	};

	app.enableCors(corsOptions);

	app.setGlobalPrefix('api');
	await app.listen(3000);
}
bootstrap();
