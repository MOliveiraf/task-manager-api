import express, { Request, Response } from 'express';
import { addTask, deleteTaskById, findTaskById, tasks, Task, getAllTasks } from './tasks';

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota para listar todas as tarefas
app.get('/tasks', async (req: Request, res: Response) => {
    try {
        const { completed, search } = req.query;

        const filters: { completed?: boolean; search?: string } = {};
        if (completed !== undefined) {
            filters.completed = completed === 'true'; // Converte "true"/"false" para boolean
        }
        if (search) {
            filters.search = search.toString();
        }

        const filteredTasks = await getAllTasks(filters);
        res.json(filteredTasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});

// Rota para criar uma nova tarefa
app.post('/tasks', async (req: Request, res: Response) => {
    try {
        const body = req.body as { title: string; description: string };
        if (!body.title || !body.description) {
            return res.status(400).json({ error: 'Title and description are required.' });
        }

        const newTask: Task = {
            id: tasks.length + 1,
            title: body.title,
            description: body.description,
            completed: false,
        };

        const addedTask = await addTask(newTask);
        res.status(201).json(addedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add task.' });
    }
});

// Rota para atualizar uma tarefa existente
app.put('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body as { title?: string; description?: string; completed?: boolean };

        const task = await findTaskById(parseInt(id));
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        if (body.title) task.title = body.title;
        if (body.description) task.description = body.description;
        if (body.completed !== undefined) task.completed = body.completed;

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task.' });
    }
});

// Rota para deletar uma tarefa
app.delete('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await deleteTaskById(parseInt(id));

        if (!success) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task.' });
    }
});

// Exporta o app
export default app;

// Inicia o servidor apenas quando o arquivo é executado diretamente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
