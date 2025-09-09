
import dotenv from 'dotenv';
import App from './app'
import MeetingDayController from './controllers/meetingDay.controller';
import StudentController from './controllers/student.controller';
import UserController from './controllers/user.controller';
import UserRollController from './controllers/userRoll.controller';

dotenv.config();

const app = new App(
    [
        new MeetingDayController(),
        new StudentController(),
        new UserController(),
        new UserRollController()
    ],
    process.env.PORT
);

app.listen();