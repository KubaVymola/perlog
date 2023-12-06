import './globals.css';
import Navigation from '@/lib/components/Navigation';
import { Providers } from './providers';

export const metadata = {
    title: 'Personal Log App',
    description: 'Created by Jakub Vymola',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="light">
            <body>
                <Providers>
                    <div className="min-h-screen w-full bg-slate-200 p-4">
                        <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
                            <Navigation />
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
