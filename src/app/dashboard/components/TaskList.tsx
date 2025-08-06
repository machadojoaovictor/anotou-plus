"use client";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/types/Task";
import { User } from "@/types/User";

interface TaskListProps {
    user: User;
}

export default function TaskList({ user }: TaskListProps) {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {

        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where("user.id", "==", user.id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const taskList = snapshot.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text,
                isPublic: doc.data().isPublic,
                created: doc.data().created.toDate(),
                user: doc.data().user,
            }));

            setTasks(taskList);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <div className="flex flex-col gap-4 items-center">
            {
                (tasks.length < 1) ?
                    <p>Não há tarefas cadastradas</p>
                    :
                    tasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))
            }
        </div>
    )
}