'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { Link, Tab, Tabs } from '@nextui-org/react';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <Tabs
            size="lg"
            color="primary"
            radius="full"
            aria-label="Main navigation"
            selectedKey={pathname}
            classNames={{
                tabList: 'shadow-lg grid grid-cols-3',
                cursor: 'drop-shadow-lg',
            }}
        >
            <Tab as={Link} title="Logs" key="/logs" href="/logs" />
            <Tab as={Link} title="Diaries" key="/diaries" href="/diaries" />
            <Tab as={Link} title="Analysis" key="/analysis" href="/analysis" />
        </Tabs>
    );
}
