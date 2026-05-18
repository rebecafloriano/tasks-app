export interface Task {
    id: string | number,
    title: string,
    category: 'Frontend Task' | 'Backend Task' | 'UI/UX Task' | 'FullStack Task',
    priority: 'HIGH' | 'MEDIUM' | 'LOW' ,
    progress: number
    date: string

}

export interface CardProps {
    task: Task

}