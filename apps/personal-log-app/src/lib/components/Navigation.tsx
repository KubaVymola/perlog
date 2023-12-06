'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Link, Tab, Tabs } from '@nextui-org/react';

enum SelectedKeyType {
    logs = '/logs',
    diaries = '/diaries',
    analysis = '/analysis',
}

export default function Navigation() {
    const pathname = usePathname();

    const [selectedKey, setSelectedKey] = useState<string>(
        SelectedKeyType.logs,
    );

    useEffect(() => {
        setSelectedKey(
            Object.values(SelectedKeyType).find((value) => {
                if (pathname.startsWith(value)) return true;
                return false;
            }) ?? SelectedKeyType.logs,
        );
    }, [pathname]);

    return (
        <Tabs
            size="lg"
            color="primary"
            radius="full"
            aria-label="Main navigation"
            selectedKey={selectedKey}
            classNames={{
                tabList: 'shadow-lg grid grid-cols-3',
                cursor: 'drop-shadow-lg',
            }}
        >
            <Tab
                as={Link}
                title="Logs"
                key={SelectedKeyType.logs}
                href={SelectedKeyType.logs}
            />
            <Tab
                as={Link}
                title="Diaries"
                key={SelectedKeyType.diaries}
                href={SelectedKeyType.diaries}
            />
            <Tab
                as={Link}
                title="Analysis"
                key={SelectedKeyType.analysis}
                href={SelectedKeyType.analysis}
            />
        </Tabs>
    );
}
