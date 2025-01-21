import express, { Request, response, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());


// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Task Management API!');
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log incoming request
    const { title, Description } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        Description, 
        status: 'PENDING',
      },
    });
    res.json(task);
  } catch (error) {
    console.error('Error creating task:', error); // Log full error for debugging
    res.status(500).json({ error: 'Failed to create task', details: error });
  }
});

// Update task title
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

