// Define a interface para uma tarefa
export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

// Lista inicial de tarefas (em memória)
export const tasks: Task[] = [];

// Função para simular um atraso (como se fosse uma consulta ao banco de dados)
const simulateDatabaseDelay = async (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Função para buscar todas as tarefas
export const getAllTasks = async (filters?: { completed?: boolean; search?: string }): Promise<Task[]> => {
    await simulateDatabaseDelay(500); // Simula um atraso de 500ms

    let filteredTasks = tasks;

    // Filtro por status (completed)
    if (filters?.completed !== undefined) {
        filteredTasks = filteredTasks.filter(task => task.completed === filters.completed);
    }

    // Filtro por palavra-chave (search)
    if (filters?.search) {
        const keyword = filters.search.toLowerCase();
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(keyword) || task.description.toLowerCase().includes(keyword)
        );
    }

    return filteredTasks;
};



// Função para adicionar uma nova tarefa
export const addTask = async (task: Task): Promise<Task> => {
    await simulateDatabaseDelay(500); // Simula um atraso de 500ms
    tasks.push(task);
    return task;
};

// Função para buscar uma tarefa pelo ID
export const findTaskById = async (id: number): Promise<Task | undefined> => {
    await simulateDatabaseDelay(500); // Simula um atraso de 500ms
    return tasks.find(task => task.id === id);
};

// Função para remover uma tarefa pelo ID
export const deleteTaskById = async (id: number): Promise<boolean> => {
    await simulateDatabaseDelay(500); // Simula um atraso de 500ms
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        return false;
    }
    tasks.splice(index, 1);
    return true;
};
