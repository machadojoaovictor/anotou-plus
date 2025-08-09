import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";
import { Task } from "@/types/Task";

export async function getTaskById(id: string): Promise<Task | null> {
  const docRef = doc(db, "tasks", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();

  return {
    id: docSnap.id,
    text: data.text,
    isPublic: data.isPublic,
    created: data.created.toDate(),
    user: data.user,
  };
}
