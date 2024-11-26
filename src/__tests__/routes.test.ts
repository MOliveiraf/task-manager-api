import request from 'supertest';
import app from '../index';
import { tasks } from '../tasks'; // Importa o array de tarefas para resetá-lo

let server: any; // Variável para armazenar o servidor

beforeAll(() => {
  server = app.listen(3001); // Inicia o servidor em uma porta alternativa
});

afterAll((done) => {
  server.close(() => {
    done(); // Fecha o servidor após os testes
  });
});

describe('Task Routes', () => {
  beforeEach(() => {
    tasks.length = 0; // Limpa o array de tarefas antes de cada teste
  });

  test('should create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Task 1', description: 'Description 1' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Task 1');
  });

  test('should get all tasks', async () => {
    await request(app).post('/tasks').send({ title: 'Task 1', description: 'Description 1' });
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Agora este teste deve passar
  });

  test('should update a task', async () => {
    const task = await request(app).post('/tasks').send({ title: 'Task 1', description: 'Description 1' });

    const response = await request(app)
      .put(`/tasks/${task.body.id}`)
      .send({ title: 'Updated Task 1', completed: true });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Task 1');
    expect(response.body.completed).toBe(true);
  });

  test('should delete a task', async () => {
    const task = await request(app).post('/tasks').send({ title: 'Task 1', description: 'Description 1' });

    const response = await request(app).delete(`/tasks/${task.body.id}`);
    expect(response.status).toBe(204);
  });
});
