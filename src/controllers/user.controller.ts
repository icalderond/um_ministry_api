import * as express from 'express';
import User from '../models/user.model';
import UserRoll from '../models/userRole.model';

class UserController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/users', this.getAllUsers);
        this.router.get('/api/users/:id', this.getUserById);
        this.router.post('/api/users', this.createUser);
        this.router.put('/api/users/:id', this.updateUser);
        this.router.delete('/api/users/:id', this.deleteUser);
    }

    private getAllUsers = async (req: express.Request, res: express.Response) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private getUserById = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private createUser = async (req: express.Request, res: express.Response) => {
        const { body: model } = req;
        try {
            if (model.userRollId === undefined) {
                model.userRollId = 2; // Default to 'User' role if not provided
            }

            const userRoll = await UserRoll.findOne({ where: { id: model.userRollId } });
            if (!userRoll) {
                res.status(400).json({ error: 'Invalid userRollId' });
                return;
            }

            model.isActive = true;
            model.createdAt = new Date();
            model.updatedAt = new Date();
            model.password = 'ChangeMe123!'; // Default password, should be changed on first login

            const newUser = await User.create(model);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private updateUser = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const { body: model } = req;
        try {
            if (id != model.id) {
                res.status(400).json({ error: 'ID in params does not match ID in body' });
                return;
            }

            if (model.userRollId !== undefined) {
                const userRoll = await User.findOne({ where: { id: model.userRollId } });
                if (!userRoll) {
                    res.status(400).json({ error: 'Invalid userRollId' });
                    return;
                }
            } else {
                model.userRollId = 2; // Default to 'User' role if not provided
            }

            const [updated] = await User.update(model, {
                where: { id: id }
            });
            if (updated) {
                const updatedUser = await User.findByPk(id);
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private deleteUser = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
            const deleted = await User.destroy({
                where: { id: id }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default UserController;