import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/");
    }

    return (
        <main className="w-full">
            <section className="bg-primary-background text-on-dark flex items-center justify-center">
                <div className="max-w-5xl w-full px-5 pb-7 mt-14">
                    <h1 className="mb-4 font-bold text-4xl">Qual é a sua tarefa?</h1>
                    <form action="" className="text-on-light flex flex-col gap-4">

                        <Textarea
                            placeholder="Digite a sua tarefa"
                            className="bg-secondary-background"
                        />

                        <label htmlFor="customCheckbox" className="flex gap-3 items-center">
                            <input
                                type="checkbox"
                                className="peer hidden"
                                name=""
                                id="customCheckbox"
                            />
                            <div className="w-8 h-8 border-2 border-secondary-background flex flex-row items-center justify-center rounded-lg peer-checked:after:content-['✔'] peer-checked:after:text-on-dark peer-checked:after:text-xl transition" />
                            <span className="text-on-dark font-normal">Deixar tarefa pública</span>
                        </label>

                        <Button className="bg-blue-500 text-on-dark border-blue-500">
                            Registrar
                        </Button>

                    </form>
                </div>
            </section>
        </main>
    );
}