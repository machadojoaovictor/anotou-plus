import { db } from "@/services/firebaseConnection";
import { Comment } from "@/types/Comment"
import { Task } from "@/types/Task";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface CommentItemProps {
    comment: Comment;
    task: Task;
}

export default function CommentItem({ comment, task }: CommentItemProps) {

    const [hoveringTrash, setHoveringTrash] = useState(false);

    return (
        <div className="w-full">
            <div className={`flex justify-between gap-1.5 p-4 rounded-lg border-1 ${hoveringTrash ? "border-red-300 transition duration-150" : "border-neutral-300"}`}>
                <div className="flex flex-col gap-1.5">
                    <span className=" bg-[#CCCCCC] rounded-sm p-1.5 text-sm self-start">
                        {comment.user.name}
                    </span>
                    <p>
                        {comment.text}
                    </p>
                </div>
                <button
                    onMouseEnter={() => setHoveringTrash(true)}
                    onMouseLeave={() => setHoveringTrash(false)}
                    onClick={() => handleDeleteComment(comment, task)}
                    aria-label="Deletar comentário"
                >
                    <FaTrashAlt
                        size={25}
                        className="cursor-pointer text-red-500 hover:text-red-400 active:text-red-400 transition duration-150"
                    />
                </button>
            </div>
        </div>
    )

    async function handleDeleteComment(comment: Comment, task: Task,) {
        try {
            const commentRef = doc(db, "tasks", task.id, "comments", comment.id)
            deleteDoc(commentRef);
        } catch (err) {
            console.log(`Erro ao deletar tarefa: ${err}`);
        }
    }
}