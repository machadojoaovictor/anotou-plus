"use client"

import { db } from "@/services/firebaseConnection";
import { Task } from "@/types/Task";
import { TaskComment } from "@/types/TaskComment";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface CommentListProps {
    task: Task;
}

export default function CommentList({ task }: CommentListProps) {

    const [comments, setComments] = useState<TaskComment[]>([]);

    useEffect(() => {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("task", "==", task.id))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentList = snapshot.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text,
                created: doc.data().created.toDate(),
                user: doc.data().user,
                userName: doc.data().name,
                task: doc.data().task,
            }));

            setComments(commentList);
        });

        return () => unsubscribe();
    }, [task.id])

    return (
        <div className="flex flex-col gap-4 items-center">
            {
                (comments.length < 1) ?
                    <p>Não há comentários cadastrados</p>
                    :
                    comments.map(comment => (
                        <p key={comment.id}>
                            {comment.text}
                            </p>
                    ))
            }
        </div>
    )
}