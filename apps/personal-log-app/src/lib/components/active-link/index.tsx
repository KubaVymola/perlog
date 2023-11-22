import Link from 'next/link';
import React from 'react';

type ActiveLinkProps = {
    href: string;
    children: React.ReactNode;
    active?: boolean;
};

export default function ActiveLink({
    href,
    children,
    active,
}: ActiveLinkProps) {
    return (
        <Link href={href}>
            <button
                className={`rounded px-4 py-2 transition-colors duration-300 ${
                    active && 'bg-blue-500 text-white'
                }`}
            >
                {children}
            </button>
        </Link>
    );
}
