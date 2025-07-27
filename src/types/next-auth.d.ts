import { DefaultSession, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
    };
  }
  interface JWT {
    id?: string;
  }
}

declare module "next/server" {
  interface NextRequest {
    auth?: DefaultSession | null;
  }
}
