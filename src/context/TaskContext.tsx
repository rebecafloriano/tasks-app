import React, { createContext, useContext, useState, type ReactNode } from 'react'

interface Task {
    id: string | number
    title: string
    category: 'Frontend Task' | 'Backend Task' | 'UI/UX Task' | 'FullStack Task'
    progress: number
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
    date: string
}

interface TaskContextType {
    tasks: Task[]
    addTask: (newTaskData: Omit<Task, "id" | "progress">) => void
    plusProgress: (id: string | number) => void
    minusProgress: (id: string | number) => void
    deleteTask: (id: string | number) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const dummyTasks: Task[] = [
    {
        id: 'mock-1',
        title: 'Estudar Context API com Git Branches 🚀',
        category: 'Frontend Task',
        priority: 'HIGH',
        progress: 50,
        date: '2026-06-15'
    },
    {
        id: 'mock-2',
        title: 'Enviar candidatura para a Leadzai 💼',
        category: 'FullStack Task',
        priority: 'HIGH',
        progress: 0,
        date: '2026-06-20'
    },
    {
        id: 'mock-3',
        title: 'Desenhar novos componentes no Figma 🎨',
        category: 'UI/UX Task',
        priority: 'MEDIUM',
        progress: 100,
        date: '2026-05-25'
    }
];

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('@TaskFlow:tasks')

        if (saved) {
            const parsed = JSON.parse(saved)
            if (parsed.length > 0) return parsed
        }
        return dummyTasks
    })

    const addTask = (newTaskData: Omit<Task, "id" | "progress">) => {
        const finalTask: Task = {
            ...newTaskData,
            id: crypto.randomUUID(),
            progress: 0
        }
        setTasks((prevTasks) => [finalTask, ...prevTasks])
    }

    const plusProgress = (id: string | number) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                const nextProgress = task.progress >= 100 ? 100 : task.progress + 25
                return { ...task, progress: nextProgress }
            }
            return task
        }))
    }

    const minusProgress = (id: string | number) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                const nextProgress = task.progress === 0 ? 0 : task.progress - 25
                return {...task, progress: nextProgress}
            }
            return task
        }))
    }

    const deleteTask = (id: string | number) => {
        const hasConfirmed = window.confirm("Tens a certeza que queres eliminar esta tarefa?");

        if (hasConfirmed) {
            setTasks(tasks.filter(task => task.id !== id))
        }
        
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, plusProgress, minusProgress, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks deve ser usado dentro de um TaskProvider');
    }
    return context;
};