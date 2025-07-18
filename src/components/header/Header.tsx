"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@/components/button/Button";

export default function Header() {

    const { data: session, status } = useSession();

    let firstName = session?.user?.name?.split(' ')[0];

    return (
        <header className="w-full h-24 bg-primary-background flex justify-center items-center">
            <section className="w-full px-5 py-8 max-w-5xl flex items-center justify-between">
                <nav className="flex gap-6 justify-center items-center">
                    <Link href={"/"}>
                        <h1 className="text-on-dark font-bold text-4xl">
                            Anotou<span className="text-red-600 pl-0.5">!</span>
                        </h1>
                    </Link>

                    {
                        session?.user && (
                            <Link href={"/dashboard"}>
                                <button className="text-lg text-on-light px-3.5 py-1.5 bg-secondary-background rounded-sm cursor-pointer hover:scale-105 transition duration-150">
                                    Meu painel
                                </button>
                            </Link>
                        )
                    }

                </nav>

                {
                    status === "loading" ? (
                        <></>
                    ) : session ? (
                        <Button
                            onClick={() => signOut()}
                            variant="primary"
                            size="md"
                            rounded="full"
                        >
                            Olá, {firstName}
                        </Button>
                    ) : (
                        <Button
                            onClick={() => signIn("google")}
                            variant="primary"
                            size="md"
                            rounded="full"
                        >
                            Minha conta
                        </Button>
                    )
                }
            </section>
        </header>
    );
}