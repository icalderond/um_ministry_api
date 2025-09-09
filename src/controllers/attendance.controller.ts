import * as express from 'express';
import Attendance from '../models/attendance.model';
import Student from '../models/student.model';
import MeetingDay from '../models/meetingDay.model';

class AttendanceController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/attendances', this.getAllAttendances);
        this.router.get('/attendances/:studentId/:meetingDayId', this.getAttendanceById);
        this.router.post('/attendances', this.createAttendance);
        this.router.put('/attendances/:studentId/:meetingDayId', this.updateAttendance);
        this.router.delete('/attendances/:studentId/:meetingDayId', this.deleteAttendance);
    }

    private getAllAttendances = async (req: express.Request, res: express.Response) => {
        try {
            const attendances = await Attendance.findAll();
            res.status(200).json(attendances);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    private getAttendanceById = async (req: express.Request, res: express.Response) => {
        const { studentId, meetingDayId } = req.params;
        try {
            const attendance = await Attendance.findOne({ where: { studentId, meetingDayId } });
            if (attendance) {
                res.status(200).json(attendance);
            } else {
                res.status(404).json({ error: 'Attendance not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    private createAttendance = async (req: express.Request, res: express.Response) => {
       var {body:model} = req;
       
        try {
            if(model.studentId == null || model.meetingDayId == null){
                return res.status(400).json({ error: 'studentId and meetingDayId are required' });
            }

            // validate foreign keys
            const student = await Student.findByPk(model.studentId);
            if (!student) {
                return res.status(400).json({ error: 'Invalid studentId' });
            }

            const meetingDay = await MeetingDay.findByPk(model.meetingDayId);
            if (!meetingDay) {
                return res.status(400).json({ error: 'Invalid meetingDayId' });
            }
            
            const newAttendance = await Attendance.create(model);
            res.status(201).json(newAttendance);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    private updateAttendance = async (req: express.Request, res: express.Response) => {
        const { studentId, meetingDayId } = req.params;
        var {body:model} = req;
        
        try {
            const attendance = await Attendance.findOne({ where: { studentId, meetingDayId } });
            if (attendance) {
                await attendance.update(model);
                res.status(200).json(attendance);
            } else {
                res.status(404).json({ error: 'Attendance not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    private deleteAttendance = async (req: express.Request, res: express.Response) => {
        const { studentId, meetingDayId } = req.params;
        try {
            const attendance = await Attendance.findOne({ where: { studentId, meetingDayId } });
            if (attendance) {
                await attendance.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Attendance not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default AttendanceController;