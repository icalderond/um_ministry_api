import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface StudentAttributes {
    id: number;
    name: string;
    isActive: boolean;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id'> { }

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
    public id!: number;
    public name!: string;
    public isActive!: boolean;
}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
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
        tableName: 'students',
    }
);

export default Student;