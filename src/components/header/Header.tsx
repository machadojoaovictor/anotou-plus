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
                            Anotou<span className="text-red-600 pl-0.5">+</span>
                        </h1>
                    </Link>

                    {
                        session?.user && (
                            <Button
                                href={"/dashboard"}
                                variant="primary"
                            >
                                Meu painel
                            </Button>
                        )
                    }

                </nav>

                {
                    status === "loading" ? (
                        <></>
                    ) : session ? (
                        <Button
                            onClick={() => signOut()}
                            variant="outlineDark"
                        >
                            {`Olá, ${firstName}`}
                        </Button>
                    ) : (
                        <Button
                            onClick={() => signIn("google")}
                            variant="outlineDark"
                        >
                            Minha conta
                        </Button>
                    )
                }
            </section>
        </header>
    );
}