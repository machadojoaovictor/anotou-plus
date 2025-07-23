import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/");
    }

    return (
        <main>
            <h1>Dashboard Page</h1>
        </main>
    );
}