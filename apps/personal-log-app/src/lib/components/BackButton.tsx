'use client';

import { Button, ButtonProps } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BackButton({ children, ...props }: ButtonProps) {
    const router = useRouter();

    return (
        <Button
            {...props}
            onClick={(e) => {
                e.preventDefault();
                router.back();
            }}
        >
            {children}
        </Button>
    );
}
