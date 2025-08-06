import { Metadata } from "next";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import { Task } from "@/types/Task";
import { User } from "@/types/User";
import { getTaskById } from "@/services/taskService";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: "Detalhes da Tarefa"
}

interface TaskPageProps {
    params: {
        id: string;
    };
}

export default async function TaskPage({ params }: TaskPageProps) {

    const { id } = params;
    const task = await getTaskById(id);

    const session = await auth();
    const user = session?.user;

    return (
        <main className="w-full flex flex-col justify-center items-center">
            <h1 className="mt-8 text-center font-bold text-4xl">
                Detalhes da tarefa
            </h1>
            <section className="w-full px-5 py-8 max-w-5xl flex flex-col gap-3.5 justify-center">
                <h2 className="font-bold text-2xl text-on-light">
                    Tarefa
                </h2>
                <div className="w-full max-w-5xl max-h-48 p-6 border-2 border-[#909090] rounded-lg">
                    <p>
                        {task?.text}
                    </p>
                </div>
            </section>
            <section className="w-full px-5 py-8 max-w-5xl flex flex-col gap-3.5 justify-center">
                <h2 className="font-bold text-2xl text-on-light">
                    Deixar comentário
                </h2>
                <CommentForm task={task as Task} user={user as User} />
            </section>
            <section className="w-full px-5 py-8 max-w-5xl flex flex-col gap-3.5 justify-center">
                <h2 className="font-bold text-2xl text-on-light">
                    Comentários
                </h2>
                <CommentList task={task as Task} />
            </section>
        </main>
    )
}

