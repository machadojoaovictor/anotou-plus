import DashboardForm from "./DashboardForm";
import { auth } from "@/auth";
import TaskList from "@/components/task-list/TaskList";

export default async function DashboardPage() {

    const session = await auth();
    const user = session?.user;

    return (
        <main className="w-full flex flex-col">
            <section className="bg-primary-background text-on-dark flex items-center justify-center">
                <div className="max-w-5xl w-full px-5 pb-7 mt-14">
                    <h1 className="mb-4 font-bold text-4xl">Qual é a sua tarefa?</h1>
                    <DashboardForm userId={user?.email} />
                </div>
            </section>
            <section className="">
                <div className="mt-16 flex flex-col gap-8 ">
                    <h1 className="font-bold text-4xl text-center">Minhas tarefas</h1>
                    <TaskList userEmail={user?.email as string} />
                </div>
            </section>
        </main>
    );
}

