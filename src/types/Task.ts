import { User } from "@/types/User";

export type Task = {
  id: string;
  text: string;
  isPublic: boolean;
  created: Date;
  user: User;
};
