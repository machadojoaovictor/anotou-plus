import Image from "next/image";

import heroImg from '../../public/images/hero.png';

export default function Home() {
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

      <h1 className="text-on-dark font-bold text-4xl text-center leading-normal">
        Sistema feito para você organizar <br />
        seus estudos e tarefas
      </h1>
    </main>
  );
}
