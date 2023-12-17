import GoToApp from '@/lib/components/GoToApp';
import SessionHeader from '@/lib/components/SessionHeader';

export default async function Index() {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex flex-row items-center gap-2">
                <GoToApp />
                <SessionHeader />
            </div>
            <div className="text-2xl">Hi there</div>
        </div>
    );
}
