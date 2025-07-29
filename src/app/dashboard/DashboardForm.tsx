'use client'

import Button from "@/components/button/Button";
import Textarea from "@/components/textarea/Textarea";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection} from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";

interface DashboardFormProps {
    userId?: string | null;
}

export default function DashboardForm({ userId }: DashboardFormProps) {

    const [input, setInput] = useState("");
    const [publicTask, setPublicTask] = useState(false);

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked);
    }

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();

        if (input === "") return;

        try {
            await addDoc(collection(db, "tasks"), {
                task: input,
                created: new Date(),
                user: userId,
                public: publicTask
            });

            setInput("");
            setPublicTask(false);
        } catch (err) {
            console.log(err)
        }
    }

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
                    checked={publicTask}
                    onChange={handleChangePublic}
                />
                <div className="w-8 h-8 border-2 border-secondary-background flex flex-row items-center justify-center rounded-lg peer-checked:after:content-['✔'] peer-checked:after:text-on-dark peer-checked:after:text-xl transition" />
                <span className="text-on-dark font-normal">Deixar tarefa pública</span>
            </label>

            <Button className="bg-blue-500 text-on-dark border-blue-500">
                Registrar
            </Button>

        </form>
    )
}