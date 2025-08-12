import { Metadata } from "next";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import { User } from "@/types/User";
import { getTaskById } from "@/services/taskService";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Detalhes da Tarefa"
}

interface TaskPageProps {
    params: {
        id: string;
    };
}

export default async function TaskPage({ params }: TaskPageProps) {

    const { id } = await params;
    const task = await getTaskById(id);

    if (!task) {
        return notFound();
    }

    const session = await auth();
    const user = session?.user;

    return (
        <main className="flex flex-col items-center">
            <div className="w-full max-w-5xl py-11">
                <h1 className="text-center font-bold text-4xl">
                    Detalhes da tarefa
                </h1>
                <div className="flex flex-col gap-14">
                    <section className="flex flex-col gap-3.5">
                        <h2 className="font-bold text-2xl text-on-light">
                            Tarefa
                        </h2>
                        <div className="flex items-center gap-1.5">
                            <p className="text-lg text-neutral-600 font-bold">
                                {task?.text}
                            </p>
                        </div>
                    </section>
                    <section className="flex flex-col gap-3.5">
                        <h2 className="font-bold text-2xl text-on-light">
                            Deixar comentário
                        </h2>
                        <CommentForm task={task} user={user as User} />
                    </section>
                    <section className="flex flex-col gap-3.5">
                        <h2 className="font-bold text-2xl text-on-light">
                            Todos comentários
                        </h2>
                        <CommentList task={task} />
                    </section>
                </div>
            </div>
        </main>
    )
}

