import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface AttendanceAttributes {
    studentId: number;
    meetingDayId: number;
    note: string;
    isActive: boolean;
}

interface AttendanceCreationAttributes extends Optional<AttendanceAttributes, never> { }

class Attendance extends Model<AttendanceAttributes, AttendanceCreationAttributes> implements AttendanceAttributes {
    public studentId!: number;
    public meetingDayId!: number;
    public note!: string;
    public isActive!: boolean;
}

Attendance.init(
    {
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'students',
                key: 'id',
            },
        },
        meetingDayId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'meetingDays',
                key: 'id',
            },
        },
        note: {
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
        tableName: 'attendances',
    }
);

export default Attendance;