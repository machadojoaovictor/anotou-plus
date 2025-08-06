import { Task } from "@/types/Task";

export type TaskComment = {
  id: string;
  text: string;
  created: Date;
  user: string;
  userName: string;
  task: Task;
};
