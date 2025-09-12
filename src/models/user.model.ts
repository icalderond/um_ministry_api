import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import UserRole from './userRole.model';

interface UserAttributes {
    id: number;
    userRoleId: number;
    name: string;
    userName: string;
    password: string;
    isActive: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public userRoleId!: number;
    public name!: string;
    public userName!: string;
    public password!: string;
    public isActive!: boolean;

    // Association
    public userRole?: UserRole; // for eager loading
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userRoleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'userRoles',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
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
        tableName: 'users',
    }
);

// Association
User.belongsTo(UserRole, { foreignKey: 'userRoleId', as: 'userRole' });

export default User;