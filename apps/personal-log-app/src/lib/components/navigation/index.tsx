'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import ActiveLink from '@/lib/components/active-link';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <div className="my-2 flex items-center gap-2 rounded-lg bg-white p-2">
            <ActiveLink href="/logs" active={pathname === '/logs'}>
                Logs
            </ActiveLink>
            <ActiveLink href="/diaries" active={pathname === '/diaries'}>
                Diaries
            </ActiveLink>
            <ActiveLink href="/analysis" active={pathname === '/analysis'}>
                Analysis
            </ActiveLink>
        </div>
    );
}
