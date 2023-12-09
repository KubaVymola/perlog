import React from 'react';
import { Button } from '@nextui-org/react';
import mongoClient from '@/lib/mongodb/client';
import Diary, { IDiarySchema } from '@/lib/mongodb/models/diary';
import Link from 'next/link';
import DiaryListEntry from '@/lib/components/DiaryListEntry';
import 'server-only';

const getData = async (): Promise<IDiarySchema[]> => {
    await mongoClient.connect();

    const data = await Diary.find();

    return data;
};

export default async function Page() {
    const data = await getData();

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
                    className="h-auto w-full py-4"
                >
                    New diary
                </Button>
            </Link>
        </div>
    );
}
