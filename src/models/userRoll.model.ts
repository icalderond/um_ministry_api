import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface UserRollAttributes {
    id: number;
    description: string;
    isActive: boolean;
}

interface UserRollCreationAttributes extends Optional<UserRollAttributes, 'id'> { }

class UserRoll extends Model<UserRollAttributes, UserRollCreationAttributes> implements UserRollAttributes {
    public id!: number;
    public description!: string;
    public isActive!: boolean;
}

UserRoll.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'userRolls',
    }
);

export default UserRoll;