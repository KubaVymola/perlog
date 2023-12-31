import React from 'react';
import { Button } from '@nextui-org/react';
import mongoClient from '@/lib/mongodb/client';
import Diary, { IDiarySchema } from '@/lib/mongodb/models/diary';
import Link from 'next/link';
import DiaryListEntry from '@/lib/components/DiaryListEntry';
import 'server-only';
import cleanObject from '@/lib/utils/clean-object';
import { getServerSession } from 'next-auth';

const getData = async (
    email: string | null | undefined,
): Promise<IDiarySchema[]> => {
    if (!email) return [];

    await mongoClient.connect();

    const data = await Diary.find({ email });

    return cleanObject(data);
};

export default async function Page() {
    const session = await getServerSession();

    console.log('get data', session?.user?.email);

    const data = await getData(session?.user?.email);

    return (
        <div className="flex w-full flex-col items-stretch gap-2">
            {data &&
                data.map((diary) => (
                    <DiaryListEntry key={diary._id} diary={diary} />
                ))}

            <Link href="diaries/new" passHref legacyBehavior>
                <Button
                    type="button"
                    variant="solid"
                    color="primary"
                    radius="full"
                    className="self-center"
                >
                    New diary
                </Button>
            </Link>
        </div>
    );
}
