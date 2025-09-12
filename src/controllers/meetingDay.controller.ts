import * as express from 'express';
import MeetingDay from '../models/meetingDay.model';

class MeetingDayController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/meetingDays', this.getAllMeetingDays);
        this.router.get('/api/meetingDays/:id', this.getMeetingDayById);
        this.router.post('/api/meetingDays', this.createMeetingDay);
        this.router.put('/api/meetingDays/:id', this.updateMeetingDay);
        this.router.delete('/api/meetingDays/:id', this.deleteMeetingDay);
    }

    private getAllMeetingDays = async (req: express.Request, res: express.Response) => {
        try {
            const meetingDays = await MeetingDay.findAll();
            res.status(200).json(meetingDays);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private getMeetingDayById = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
            const meetingDay = await MeetingDay.findByPk(id);
            if (meetingDay) {
                res.status(200).json(meetingDay);
            } else {
                res.status(404).json({ error: 'Meeting Day not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private createMeetingDay = async (req: express.Request, res: express.Response) => {
        const { body: model } = req;
        try {
            model.isActive = true;
            model.createdAt = new Date();
            model.updatedAt = new Date();
            const newMeetingDay = await MeetingDay.create(model);
            res.status(201).json(newMeetingDay);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private updateMeetingDay = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const { body: model } = req;
        try {
            if (id != model.id) {
                res.status(400).json({ error: 'ID in params does not match ID in body' });
                return;
            }

            const meetingDay = await MeetingDay.findByPk(model.id);
            if (meetingDay) {
                meetingDay.day = model.day ?? meetingDay.day;
                meetingDay.description = model.description ?? meetingDay.description;
                meetingDay.isActive = model.isActive ?? meetingDay.isActive;
                await meetingDay.save();
                res.status(200).json(meetingDay);
            } else {
                res.status(404).json({ error: 'Meeting Day not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private deleteMeetingDay = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
            const meetingDay = await MeetingDay.findByPk(id);
            if (meetingDay) {
                await meetingDay.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Meeting Day not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default MeetingDayController;