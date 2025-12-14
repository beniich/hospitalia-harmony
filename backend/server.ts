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

// Beds
app.get('/api/beds', (req: Request, res: Response) => {
    const rows = db.prepare('SELECT * FROM beds').all();
    res.json(rows);
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
