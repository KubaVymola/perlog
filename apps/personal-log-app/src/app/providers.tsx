'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Providers({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <SessionProvider session={session}>{children}</SessionProvider>
        </NextUIProvider>
    );
}
