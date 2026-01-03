import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';

export class User extends Model {
    declare id_user: number;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'user',
        timestamps: false,
    }
);
