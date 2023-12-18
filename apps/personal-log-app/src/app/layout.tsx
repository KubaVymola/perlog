import React from 'react';

import './globals.css';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/common/auth';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: 'Personal Log App',
    description: 'Created by Jakub Vymola',
};

export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en" className="light">
            <body>
                <Providers session={session}>
                    <Toaster
                        position="top-center"
                        containerClassName="text-base p-5"
                        toastOptions={{
                            duration: 4000,
                            icon: null,
                            success: {
                                className: '!bg-success !text-white',
                            },
                            error: {
                                className: '!bg-error !text-white',
                            },
                        }}
                    />
                    <div className="min-h-screen w-full bg-slate-200 p-4">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
