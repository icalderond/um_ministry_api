import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface MeetingDayAttributes {
    id: number;
    day: Date;
    description: string;
    isActive: boolean;
}

interface MeetingDayCreationAttributes extends Optional<MeetingDayAttributes, 'id'> { }

class MeetingDay extends Model<MeetingDayAttributes, MeetingDayCreationAttributes> implements MeetingDayAttributes {
    public id!: number;
    public day!: Date;
    public description!: string;
    public isActive!: boolean;
}

MeetingDay.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        day: {
            type: DataTypes.DATE,
            allowNull: false,
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
        tableName: 'meetingDays',
    }
);

export default MeetingDay;