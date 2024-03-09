import { makeObservable, observable, action } from 'mobx';
import {generateId} from "../helpers.ts";

interface Task {
    id: string;
    title: string;
    createAt: number;
}

export class ToDoStore {
    tasks: Task[] = [];

    constructor() {
        makeObservable(this, {
            tasks: observable,
            createTask: action,
            updateTask: action,
            removeTask: action
        });
    }


    createTask(title: string) {
        const newTask = {
            id: generateId(),
            title,
            createAt: Date.now()
        };
        this.tasks =  [newTask].concat(this.tasks)
    }


    updateTask(id: string, title: string) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, title: title } : task
        );
    }


    removeTask = (id: string) => {
        this.tasks = this.tasks.filter(task => task.id !== id);
    };
}

export const toDoStore = new ToDoStore();

