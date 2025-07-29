"use client";

import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { useEffect, useState } from "react";
import TaskItem from "../task-item/TaskItem";

interface Task {
    id: string;
    text: string;
    public: boolean;
    created: Date;
    user: string
}

interface TaskListProps {
    userEmail?: string;
}

export default function TaskList({ userEmail }: TaskListProps) {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function loadTasks() {
            const tasksRef = collection(db, "tasks");
            const q = query(tasksRef, where("user", "==", userEmail));
            const snapshot = await getDocs(q);

            const taskList = snapshot.docs.map(doc => {
                const data = doc.data();

                return {
                    id: doc.id,
                    text: data.task,
                    public: data.public,
                    created: data.created.toDate(),
                    user: data.user,
                };
            });

            setTasks(taskList);
        }

        loadTasks();
    }, [userEmail]);

    return (
        <div className="flex flex-col gap-4 items-center">
            {
                (tasks.length < 1) ?

                    <p>Não há tarefas cadastradas</p>
                    :
                    tasks.map(task => (
                        <TaskItem key={task.id} task={task} onDelete={handleDelete} />
                    ))
            }
        </div>
    )

    async function handleDelete(id: string) {
        await deleteDoc(doc(db, "tasks", id));
        setTasks(prev => prev.filter(task => task.id !== id));
    }
}