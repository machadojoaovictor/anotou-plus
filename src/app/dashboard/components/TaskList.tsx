"use client";

import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";


interface TaskProps {
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

    const [tasks, setTasks] = useState<TaskProps[]>([]);

    useEffect(() => {
        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where("user", "==", userEmail));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const taskList = snapshot.docs.map(doc => ({
                id: doc.id,
                text: doc.data().task,
                public: doc.data().public,
                created: doc.data().created.toDate(),
                user: doc.data().user,
            }));

            setTasks(taskList);
        });

        return () => unsubscribe();
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