"use client";

import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { Task } from "@/types/Task";
import { db } from "@/services/firebaseConnection";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task: { id, isPublic, text } }: TaskItemProps) {

    const [hoveringTrash, setHoveringTrash] = useState(false);

    return (
        <div className={`w-full max-w-5xl border-2 rounded-lg flex items-center justify-between gap-10 p-5 ${hoveringTrash ? "border-red-300 transition duration-150" : "border-neutral-300"}`}>
            <div className="w-full flex flex-col gap-2.5">

                {
                    isPublic && (
                        <Link
                            href={`/task/${id}`}
                            className="self-start px-2.5 py-1.5 bg-blue-500 text-on-dark text-xs font-semibold uppercase rounded-sm text-justify"
                        >
                            Pública
                        </Link>
                    )
                }

                <p className="max-h-16 overflow-y-auto break-words text-justify pr-3">
                    {text}
                </p>

            </div>
            <button
                onMouseEnter={() => setHoveringTrash(true)}
                onMouseLeave={() => setHoveringTrash(false)}
                onClick={() => handleDeleteTask(id)}
                aria-label="Deletar tarefa"
            >
                <FaTrashAlt
                    size={25}
                    className="cursor-pointer text-red-500 hover:text-red-400 active:text-red-400 transition duration-150"
                />
            </button>
        </div>
    )

    async function handleDeleteTask(id: string) {
        try {

            const taskRef = doc(db, "tasks", id);
            await deleteDoc(taskRef);

            const commentsRef = collection(db, "comments");
            const qComments = query(commentsRef, where("task.id", "==", id));
            const commentsSnapshot = await getDocs(qComments);

            const deletePromises = commentsSnapshot.docs.map((document) => {
                const commentDocRef = doc(db, "comments", document.id);
                return deleteDoc(commentDocRef);
            });

            await Promise.all(deletePromises);

        } catch (err) {
            console.log(`Erro ao deletar tarefa: ${err}`);
        }
    }
}