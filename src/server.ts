
import dotenv from 'dotenv';
import App from './app'
import MeetingDayController from './controllers/meetingDay.controller';
import StudentController from './controllers/student.controller';
import UserRollController from './controllers/userRoll.controller';

dotenv.config();

const app = new App(
    [
        new StudentController(),
        new MeetingDayController(),
        new UserRollController()
    ],
    process.env.PORT
);

app.listen();