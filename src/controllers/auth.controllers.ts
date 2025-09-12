import * as express from 'express';
import User from '../models/user.model';
import UserRole from '../models/userRole.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/api/auth/register', this.register);
        this.router.post('/api/auth/login', this.login);
    }

    private register = async (req: express.Request, res: express.Response) => {
        const { name, userName, password, roleName } = req.body;

        try {
            if (!userName || !password || !roleName) {
                return res.status(400).json({ error: 'username, password, and roleName are required' });
            }

            const existingUser = await User.findOne({ where: { userName } });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const role = await UserRole.findOne({ where: { name: roleName } });
            if (!role) {
                return res.status(400).json({ error: 'Invalid roleName' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name: name,
                userName,
                password: hashedPassword,
                userRoleId: role.id,
                isActive: true
            });

            res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private login = async (req: express.Request, res: express.Response) => {
        const { userName, password } = req.body;

        try {
            if (!userName || !password) {
                return res.status(400).json({ error: 'username and password are required' });
            }
            const user = await User.findOne({
                where: { userName },
                include: [{ model: UserRole, as: 'userRole' }]
            });
            
            if (!user) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }

            if (!user.isActive) {
                return res.status(403).json({ error: 'User account is inactive' });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return res.status(500).json({ error: 'JWT secret is not configured' });
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    username: user.userName,
                    role: user.userRole?.name
                },
                secret,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };
}

export default AuthController;