"use client"

import { db } from "@/services/firebaseConnection";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface CommentProps {
    id: string;
    text: string;
    created: Date;
    user: string;
    userName: string;
    taskId: string;
}

interface CommentListProps {
    taskId: string;
}

export default function CommentList({ taskId }: CommentListProps) {

    const [comments, setComments] = useState<CommentProps[]>([]);

    useEffect(() => {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("taskId", "==", taskId))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentList = snapshot.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text,
                created: doc.data().created.toDate(),
                user: doc.data().user,
                userName: doc.data().name,
                taskId: doc.data().taskId
            }));

            setComments(commentList);
        });

        return () => unsubscribe();
    })

    return (
        <div className="flex flex-col gap-4 items-center">
            {
                (comments.length < 1) ?
                    <p>Não há comentários cadastrados</p>
                    :
                    comments.map(comment => (
                        <p>{comment.text}</p>
                    ))
            }
        </div>
    )
}