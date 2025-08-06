"use client"

import Textarea from "@/components/textarea/Textarea"
import { db } from "@/services/firebaseConnection";
import { Task } from "@/types/Task";
import { User } from "@/types/User";
import clsx from "clsx";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { ChangeEvent, FormEvent, useState } from "react";

interface CommentFormProps {
    task: Task;
    user: User;
}

export default function CommentForm({ task, user }: CommentFormProps) {

    const { data: session } = useSession();
    const isDisabled = !session?.user;
    const [input, setInput] = useState("");

    return (
        <form
            onSubmit={handleRegisterComment}
        >
            <Textarea
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                placeholder="Digite seu comentário"
                className="w-full max-w-5xl max-h-48 p-6 border-2 border-[#909090] rounded-lg"
            />
            <button
                disabled={isDisabled}
                className={
                    clsx("w-full transition duration-150 bg-blue-500 py-3.5 rounded-lg text-on-dark font-bold",
                        isDisabled ?
                            "cursor-not-allowed opacity-80"
                            :
                            "cursor-pointer opacity-100 hover:opacity-90 active:opacity-85"
                    )}
            >
                Enviar comentário
            </button>
        </form>
    )

    async function handleRegisterComment(event: FormEvent) {
        event.preventDefault();

        if (input === "") return;
        if (!session?.user.email || !session.user.name) return;

        try {
            await addDoc(collection(db, "comments"), {
                text: input,
                created: new Date(),
                user: user,
                task: task
            })

            setInput("");

        } catch (err) {
            console.log(err);
        }
    }
}