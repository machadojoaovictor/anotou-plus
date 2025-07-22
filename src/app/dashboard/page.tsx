import type { GetServerSideProps, Metadata } from "next"
import { getSession } from "next-auth/react";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function DashboardPage() {
    return (
        <main>
            <h1>Página painel</h1>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req });

    if (!session?.user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}