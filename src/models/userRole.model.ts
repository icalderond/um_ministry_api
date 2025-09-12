import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface UserRoleAttributes {
    id: number;
    name: string;
    isActive: boolean;
}

interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id'> { }

class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
    public id!: number;
    public name!: string;
    public isActive!: boolean;
}

UserRole.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'userRoles',
    }
);

export default UserRole;