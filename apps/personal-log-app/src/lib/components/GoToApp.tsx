'use client';

import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function GoToApp() {
    const { data: session } = useSession();

    if (!session?.user) return null;

    return (
        <Link href="/logs">
            <Button variant="solid" color="primary">
                Go to app
            </Button>
        </Link>
    );
}
