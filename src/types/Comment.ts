import { Task } from "@/types/Task";
import { User } from "@/types/User";

export type Comment = {
  id: string;
  text: string;
  created: Date;
  user: User;
  task: Task;
};
