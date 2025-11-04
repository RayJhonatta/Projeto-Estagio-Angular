export interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface NewTask {
    title: string;
    description?: string | null;
    completed?: boolean;
}