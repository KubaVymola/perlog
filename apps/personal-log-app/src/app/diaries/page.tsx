import React, { cache, useEffect } from 'react';
import { Button, Card } from '@nextui-org/react';
import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/mongodb/models/diary';
import { DiaryFormType } from '@/lib/types/diary-form';
import Link from 'next/link';

const getData = async (): Promise<DiaryFormType[]> => {
    await mongoClient.connect();
    return await Diary.find().exec();
};

export default async function Page() {
    const data = await getData();

    return (
        <div>
            {data.map((diary, index) => (
                <Card
                    key={index}
                    className="flex w-full flex-col items-center gap-4 p-4"
                >
                    <div>Edit {diary.diaryName}</div>
                </Card>
            ))}

            <Link href="diaries/new">
                <Button variant="solid" color="primary">
                    New diary
                </Button>
            </Link>
        </div>
    );
}
