'use client'

import Button from "@/components/button/Button";
import Textarea from "@/components/textarea/Textarea";
import { db } from "@/services/firebaseConnection";
import { User } from "@/types/User";
import { addDoc, collection } from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";

interface TaskFormProps {
    user: User;
}

export default function TaskForm({ user }: TaskFormProps) {

    const [input, setInput] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    return (
        <form onSubmit={handleRegisterTask} className="text-on-light flex flex-col gap-4">

            <Textarea
                placeholder="Digite a sua tarefa"
                className="bg-secondary-background"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setInput(event.target.value)
                }
            />

            <label htmlFor="customCheckbox" className="flex gap-3 items-center">
                <input
                    type="checkbox"
                    className="peer hidden"
                    name=""
                    id="customCheckbox"
                    checked={isPublic}
                    onChange={handleChangePublic}
                />
                <div className="w-8 h-8 border-2 border-secondary-background flex flex-row items-center justify-center rounded-lg peer-checked:after:content-['✔'] peer-checked:after:text-on-dark peer-checked:after:text-xl transition" />
                <span className="text-on-dark font-normal">Deixar tarefa pública</span>
            </label>

            <Button
                variant="default"
            >
                Registrar
            </Button>
        </form>
    )

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setIsPublic(event.target.checked);
    }

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();

        if (input === "") return;

        try {
            await addDoc(collection(db, "tasks"), {
                text: input,
                isPublic: isPublic,
                createdAt: new Date(),
                user: user
            });

            setInput("");
            setIsPublic(false);

        } catch (err) {
            console.log(err)
        }
    }
}