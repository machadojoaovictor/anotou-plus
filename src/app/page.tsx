import Image from "next/image";

import heroImg from '../../public/images/hero.png';

export default function HomePage() {
  return (
    <main className="bg-primary-background w-full h-[calc(100vh-6rem)] flex flex-col gap-7 justify-center items-center">
      <div>
        <Image
          className="max-w-md"
          alt="Logo Tarefas"
          src={heroImg}
          priority
        />
      </div>

      <div className="flex flex-col gap-14">
        <h1 className="text-on-dark font-bold text-4xl text-center leading-normal">
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>
        <div className="flex items-center justify-center gap-4">
          <span className="bg-secondary-background text-on-light px-16 py-3.5 font-bold rounded-2xl">+ 7 mil posts</span>
          <span className="bg-secondary-background text-on-light px-16 py-3.5 font-bold rounded-2xl">+ 1 mil comentários</span>
        </div>
      </div>
    </main>
  );
}
