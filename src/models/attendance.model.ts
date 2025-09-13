import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import Student from './student.model';
import MeetingDay from './meetingDay.model';

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

    //associations
    public student?: Student; // for eager loading
    public meetingDay?: MeetingDay; // for eager loading

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

Attendance.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Attendance.belongsTo(MeetingDay, { foreignKey: 'meetingDayId', as: 'meetingDay' });

export default Attendance;