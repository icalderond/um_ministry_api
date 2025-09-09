
import dotenv from 'dotenv';
import App from './app'
import StudentController from './controllers/student.controller';

dotenv.config();

const app = new App(
    [
        new StudentController()
    ],
    process.env.PORT
);

app.listen();