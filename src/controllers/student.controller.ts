import * as express from 'express';
import Student from '../models/student.model';

class StudentController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/students', this.getAllStudents);
        this.router.get('/students/:id', this.getStudentById);
        this.router.post('/students', this.createStudent);
        this.router.put('/students/:id', this.updateStudent);
        this.router.delete('/students/:id', this.deleteStudent);
    }

    private getAllStudents = async (req: express.Request, res: express.Response) => {
        try {
            const students = await Student.findAll();
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private getStudentById = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
            const student = await Student.findByPk(id);
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private createStudent = async (req: express.Request, res: express.Response) => {
        const { name } = req.body;
        try {
            const newStudent = await Student.create({ name, isActive: true });
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private updateStudent = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const { name, isActive } = req.body;
        try {
            const student = await Student.findByPk(id);
            if (student) {
                student.name = name ?? student.name;
                student.isActive = isActive ?? student.isActive;
                await student.save();
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private deleteStudent = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
            const student = await Student.findByPk(id);
            if (student) {
                await student.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default StudentController;