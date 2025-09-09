import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "dbname",
    process.env.DB_USER || "sa",
    process.env.DB_PASSWORD || "password",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        // logging: false
        logging: console.log
    })

// sequelize.authenticate()
//   .then(() => console.log('Connection has been established successfully.'))
//   .catch((error) => console.error('Unable to connect to the database:', error));
async function syncDatabase() {
    try {
        await sequelize.sync({ force: false }); // Or { alter: true } for altering existing tables
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}
syncDatabase();

export default sequelize;