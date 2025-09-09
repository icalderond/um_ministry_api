import * as express from 'express';
import UserRoll from '../models/userRoll.model';
import Users from '../models/user.model';

class UserRollController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/user-rolls', this.getAllUserRolls);
        this.router.get('/user-rolls/:id', this.getUserRollById);
        this.router.post('/user-rolls', this.createUserRoll);
        this.router.put('/user-rolls/:id', this.updateUserRoll);
        this.router.delete('/user-rolls/:id', this.deleteUserRoll);
    }

    private getAllUserRolls = async (req: express.Request, res: express.Response) => {
        try {
            const userRolls = await UserRoll.findAll();
            res.status(200).json(userRolls);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private getUserRollById = async (req: express.Request, res: express.Response) => {
        try {
            const userRoll = await UserRoll.findByPk(req.params.id);
            if (userRoll) {
                res.status(200).json(userRoll);
            } else {
                res.status(404).json({ message: 'UserRoll not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private createUserRoll = async (req: express.Request, res: express.Response) => {
        const { body: model } = req;
        try {
            const newUserRoll = await UserRoll.create(model);
            res.status(201).json(newUserRoll);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private updateUserRoll = async (req: express.Request, res: express.Response) => {
        try {
            const { body: model } = req;
            const [updated] = await UserRoll.update(model, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedUserRoll = await UserRoll.findByPk(req.params.id);
                res.status(200).json(updatedUserRoll);
            } else {
                res.status(404).json({ message: 'UserRoll not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private deleteUserRoll = async (req: express.Request, res: express.Response) => {
        try {
            Users.findOne({ where: { userRollId: req.params.id } })
                .then(user => {
                    if (user) {
                        res.status(400).json({ message: 'Cannot delete UserRoll with associated Users' });
                        return;
                    }
                });

            const deleted = await UserRoll.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'UserRoll not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };
}

export default UserRollController;