import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

export const metadata: Metadata = {
    title: "Detalhes da Tarefa"
}

interface TaskPageProps {
    params: {
        id: string;
    }
}

interface TaskProps {
    id: string;
    text: string;
    public: boolean;
    created: Date;
    user: string
}

export default async function TaskPage({ params: { id } }: TaskPageProps) {

    const task = await getTaskById(id);

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
                        {
                            task?.text
                        }
                    </p>
                </div>
            </section>
            <section className="w-full px-5 py-8 max-w-5xl flex flex-col gap-3.5 justify-center">
                <h2 className="font-bold text-2xl text-on-light">
                    Deixar comentário
                </h2>
                <CommentForm taskId={task?.id as string} />
            </section>
            <section className="w-full px-5 py-8 max-w-5xl flex flex-col gap-3.5 justify-center">
                <h2 className="font-bold text-2xl text-on-light">
                    Comentários
                </h2>
                <CommentList taskId={task?.id as string} />
            </section>
        </main>
    )

    async function getTaskById(id: string): Promise<TaskProps | null> {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        const data = docSnap.data();

        return {
            id: docSnap.id,
            text: data.task,
            public: data.public,
            created: data.created.toDate(),
            user: data.user,
        };
    }
}

