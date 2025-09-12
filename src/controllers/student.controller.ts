import * as express from 'express';
import Student from '../models/student.model';

class StudentController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/students', this.getAllStudents);
        this.router.get('/api/students/:id', this.getStudentById);
        this.router.post('/api/students', this.createStudent);
        this.router.put('/api/students/:id', this.updateStudent);
        this.router.delete('/api/students/:id', this.deleteStudent);
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
        const { body: model } = req;
        try {
            const newStudent = await Student.create(model);
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    private updateStudent = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const { body: model } = req;
        try {
            const student = await Student.findByPk(id);
            if (student) {
                student.name = model.name ?? student.name;
                student.isActive = model.isActive ?? student.isActive;
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