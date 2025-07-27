'use client'

import { SessionProvider } from "next-auth/react";
import React from "react";

interface NextAuthProvidersProps {
    children: React.ReactNode;
}

export function NextAuthProvider({ children }: NextAuthProvidersProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}