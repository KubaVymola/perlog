import Navigation from '@/lib/components/Navigation';
import SessionHeader from '@/lib/components/SessionHeader';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
            <div className="flex flex-row items-stretch gap-2">
                <Navigation />
                <SessionHeader />
            </div>
            {children}
        </div>
    );
}
