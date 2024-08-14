import {
	AutoIncrement,
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export default class UserModel extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column({ field: 'user_id', type: DataType.INTEGER })
	userId: number;

	@Column({ field: 'first_name', allowNull: true, type: DataType.STRING })
	firstName: string;

	@Column({ field: 'second_name', allowNull: true, type: DataType.STRING })
	secondName: string;

	@Column({ field: 'email', allowNull: false, type: DataType.STRING })
	email: string;

	@Column({ field: 'password_hash', allowNull: false, type: DataType.STRING })
	passwordHash: string;
}
