"use client";

import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

interface TaskItemProps {
    task: {
        id: string;
        text: string;
        public: boolean;
        created: Date;
        user: string;
    };
    onDelete: (id: string) => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {

    const [hoveringTrash, setHoveringTrash] = useState(false);

    return (
        <div className={`w-full max-w-5xl border-2 rounded-lg flex items-center justify-between gap-10 p-5 ${hoveringTrash ? "border-red-300 transition duration-150" : "border-neutral-300"}`}>
            <div className="w-full flex flex-col gap-2.5">

                {
                    task.public && (
                        <Link
                            href={`/task/${task.id}`}
                            className="self-start px-2.5 py-1.5 bg-blue-500 text-on-dark text-xs font-semibold uppercase rounded-sm text-justify"
                        >
                            Pública
                        </Link>
                    )
                }

                <p className="max-h-16 overflow-y-auto break-words text-justify pr-3">
                    {task.text}
                </p>

            </div>
            <button
                onMouseEnter={() => setHoveringTrash(true)}
                onMouseLeave={() => setHoveringTrash(false)}
                onClick={() => handleDeleteTask(task.id)}
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
            await onDelete(id);
        } catch (err) {
            console.log(`Erro ao deletar tarefa: ${err}`);
        }
    }
}