
import dotenv from 'dotenv';
import App from './app'
import AttendanceController from './controllers/attendance.controller';
import MeetingDayController from './controllers/meetingDay.controller';
import StudentController from './controllers/student.controller';
import UserController from './controllers/user.controller';
import UserRollController from './controllers/userRole.controller';
import AuthController from './controllers/auth.controllers';

dotenv.config();

const app = new App(
    [
        new AttendanceController(),
        new AuthController(),
        new MeetingDayController(),
        new StudentController(),
        new UserController(),
        new UserRollController()
    ],
    process.env.PORT
);
app.listen();