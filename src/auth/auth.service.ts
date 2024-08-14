import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	async getToken(dto: AuthDto) {
		const userEntity = await this.validateUser(dto);

		return {
			access_token: await this.jwtService.signAsync({
				id: userEntity.getUserId(),
			}),
		};
	}

	async validateUser(dto: AuthDto): Promise<UserEntity> {
		const user = await this.userRepository.getUserByEmail(dto.email);

		if (!user) {
			throw new UnauthorizedException('Wrong password or email');
		}
		const userEntity = new UserEntity(user);
		const isUserValid = await userEntity.validatePassword(dto.password);
		if (!isUserValid) {
			throw new UnauthorizedException('Wrong password or email');
		}
		return userEntity;
	}
}
