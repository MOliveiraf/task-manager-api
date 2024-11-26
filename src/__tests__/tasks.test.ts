import { addTask, getAllTasks, findTaskById, deleteTaskById, tasks } from '../tasks';

describe('Task Management', () => {
  beforeEach(() => {
    tasks.length = 0; // Limpa o array de tarefas antes de cada teste
  });

  test('should add a task', async () => {
    const newTask = { id: 1, title: 'Test Task', description: 'Description', completed: false };
    const addedTask = await addTask(newTask);

    expect(addedTask).toEqual(newTask);
    expect(tasks).toHaveLength(1);
  });

  test('should get all tasks', async () => {
    const task1 = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };
    const task2 = { id: 2, title: 'Task 2', description: 'Description 2', completed: true };
    await addTask(task1);
    await addTask(task2);

    const allTasks = await getAllTasks();
    expect(allTasks).toHaveLength(2);
    expect(allTasks).toEqual([task1, task2]);
  });

  test('should find a task by id', async () => {
    const task = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };
    await addTask(task);

    const foundTask = await findTaskById(1);
    expect(foundTask).toEqual(task);
  });

  test('should delete a task by id', async () => {
    const task = { id: 1, title: 'Task 1', description: 'Description 1', completed: false };
    await addTask(task);

    const success = await deleteTaskById(1);
    expect(success).toBe(true);
    expect(tasks).toHaveLength(0);
  });
});
