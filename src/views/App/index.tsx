import React, {useState} from "react";
import styles from './index.module.scss'

import {InputPlus} from "./components/InputPlus";
import {InputTask} from "./components/InputTask";
import {toDoStore} from "../../data/stores/useToDoStore.ts";

export const App: React.FC = () => {

    const [tasks] = useState(toDoStore.tasks);

    const createNewTask = (title: string) => {
        toDoStore.createTask(title);
    };

    const updateExistingTask = (id: string, title: string) => {
        toDoStore.updateTask(id, title);
    };

    const removeExistingTask = (id: string) => {
        toDoStore.removeTask(id);
    };


    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do List</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                        if(title) {
                            createNewTask(title)
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>There is no one task</p>
                )}
                {tasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onDone={removeExistingTask}
                        onEdited={updateExistingTask}
                        onRemoved={removeExistingTask}
                    />
                ))}
            </section>
        </article>
    )
}