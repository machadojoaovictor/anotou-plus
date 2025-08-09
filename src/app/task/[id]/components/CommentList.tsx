"use client"

import { db } from "@/services/firebaseConnection";
import { Task } from "@/types/Task";
import { Comment } from "@/types/Comment";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

interface CommentListProps {
    task: Task;
}

export default function CommentList({ task }: CommentListProps) {

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("task", "==", task))
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
                    <p className="opacity-70">Não há comentários cadastrados</p>
                    :
                    comments.map(comment => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
            }
        </div>
    )
}