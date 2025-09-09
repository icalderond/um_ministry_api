import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface UserAttributes {
    id: number;
    userRollId: number;
    name: string;
    userName:string;
    password:string;
    isActive: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public userRollId!: number;
    public name!: string;
    public userName!: string;
    public password!: string;
    public isActive!: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userRollId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'userRolls',
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

export default User;