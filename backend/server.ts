import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './db'; // import TypeScript file directly

const app = express();
app.use(cors());
app.use(express.json());

// Departments
app.get('/api/departments', (req: Request, res: Response) => {
    const rows = db.prepare('SELECT * FROM departments').all();
    res.json(rows);
});

app.post('/api/departments', (req: Request, res: Response) => {
    const newDept = req.body;
    db.addDepartment(newDept);
    res.json(newDept);
});

app.delete('/api/departments/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db.deleteDepartment(id);
    res.json({ success: true });
});

// Beds
app.get('/api/beds', (req: Request, res: Response) => {
    const rows = db.prepare('SELECT * FROM beds').all();
    res.json(rows);
});

app.post('/api/beds', (req: Request, res: Response) => {
    const newBed = req.body;
    db.addBed(newBed);
    res.json(newBed);
});

app.delete('/api/beds/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db.deleteBed(id);
    res.json({ success: true });
});

// Equipments
app.get('/api/equipments', (req: Request, res: Response) => {
    const rows = db.prepare('SELECT * FROM equipments').all();
    res.json(rows);
});

const PORT = process.env.PORT || 3001; // Backend on 3001 to avoid Vite conflict
app.listen(PORT, () => {
    console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
