'use client';

import { Avatar, Button } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function SessionHeader(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    const { data: session } = useSession();

    return (
        <div {...props}>
            <div className="bg-default-100 flex h-full flex-row items-center gap-2 rounded-full p-1 shadow-lg">
                {session?.user ? (
                    <>
                        <Avatar
                            size="sm"
                            src={session.user.image ?? ''}
                            showFallback
                        />
                        <Button
                            radius="full"
                            variant="solid"
                            color="primary"
                            size="sm"
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            Sign out
                        </Button>
                    </>
                ) : (
                    <Button
                        radius="full"
                        variant="solid"
                        color="primary"
                        size="md"
                        onClick={() =>
                            signIn('google', { callbackUrl: '/logs' })
                        }
                    >
                        Sign in
                    </Button>
                )}
            </div>
        </div>
    );
}
