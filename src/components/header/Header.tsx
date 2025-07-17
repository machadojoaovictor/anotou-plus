import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-24 bg-primary-background flex justify-center items-center">
            <section className="w-full px-5 py-8 max-w-5xl flex items-center justify-between">
                <nav className="flex gap-6 justify-center items-center">
                    <Link href={"/"}>
                        <h1 className="text-on-dark font-bold text-4xl">
                            Anotou<span className="text-red-600 pl-0.5">!</span>
                        </h1>
                    </Link>
                    <Link href={"/dashboard"}>
                        <button className="text-lg text-on-light px-3.5 py-1.5 bg-secondary-background rounded-sm cursor-pointer hover:scale-105 transition duration-150">
                            Meu painel
                        </button>
                    </Link>
                </nav>

                <button className="text-on-dark bg-transparent px-8 py-2 rounded-full border-2 border-on-dark cursor-pointer hover:bg-secondary-background hover:text-on-light hover:scale-105 transition duration-150">Acessar</button>
            </section>
        </header>
    )
}