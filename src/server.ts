
import dotenv from 'dotenv';
import App from './app'

dotenv.config();

const app = new App(
    [
        // Add your route handlers here (controllers, routers, etc.)
    ],
    process.env.PORT
);

app.listen();