import * as express from 'express';
import UserRole from '../models/userRole.model';
import Users from '../models/user.model';

class UserRoleController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/userrole', this.getAllUserRoles);
        this.router.get('/api/userrole/:id', this.getUserRoleById);
        this.router.post('/api/userrole', this.createUserRole);
        this.router.put('/api/userrole/:id', this.updateUserRole);
        this.router.delete('/api/userrole/:id', this.deleteUserRole);
    }

    private getAllUserRoles = async (req: express.Request, res: express.Response) => {
        try {
            const UserRoles = await UserRole.findAll();
            res.status(200).json(UserRoles);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private getUserRoleById = async (req: express.Request, res: express.Response) => {
        try {
            const userRole = await UserRole.findByPk(req.params.id);
            if (userRole) {
                res.status(200).json(userRole);
            } else {
                res.status(404).json({ message: 'UserRole not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private createUserRole = async (req: express.Request, res: express.Response) => {
        const { body: model } = req;
        try {
            const newUserRole = await UserRole.create(model);
            res.status(201).json(newUserRole);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private updateUserRole = async (req: express.Request, res: express.Response) => {
        try {
            const { body: model } = req;
            const [updated] = await UserRole.update(model, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedUserRole = await UserRole.findByPk(req.params.id);
                res.status(200).json(updatedUserRole);
            } else {
                res.status(404).json({ message: 'UserRole not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    private deleteUserRole = async (req: express.Request, res: express.Response) => {
        try {
            Users.findOne({ where: { userRoleId: req.params.id } })
                .then(user => {
                    if (user) {
                        res.status(400).json({ message: 'Cannot delete UserRole with associated Users' });
                        return;
                    }
                });

            const deleted = await UserRole.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'UserRole not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };
}

export default UserRoleController;