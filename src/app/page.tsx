import Image from "next/image";

import heroImg from '../../public/images/hero.png';
import { db } from "@/services/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";

export default async function HomePage() {

  const taskRef = collection(db, "tasks");
  const taskSnapshot = await getDocs(taskRef);
  const posts = taskSnapshot.size;

  let comments = 0;

  for (const taskDoc of taskSnapshot.docs) {
    const commentRef = collection(db, "tasks", taskDoc.id, "comments");
    const commentSnapshot = await getDocs(commentRef);
    comments += commentSnapshot.size;
  }

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
          <span className="bg-secondary-background text-on-light px-16 py-3.5 font-bold rounded-2xl">{posts} posts</span>
          <span className="bg-secondary-background text-on-light px-16 py-3.5 font-bold rounded-2xl">{comments} comentários</span>
        </div>
      </div>
    </main>
  );
}