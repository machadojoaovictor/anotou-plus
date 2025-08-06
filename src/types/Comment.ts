import { Task } from "@/types/Task";

export type Comment = {
  id: string;
  text: string;
  created: Date;
  user: string;
  userName: string;
  task: Task;
};
