import React, { cache } from 'react';
import { Card, Divider } from '@nextui-org/react';
import DiaryForm from '@/lib/components/DiaryForm';
import mongoClient from '@/lib/mongodb/client';
// import Diary, { DiaryType } from '@/lib/models/diary';

// const getData = cache(async () => {
//     await mongoClient.connect();
//     return (await Diary.find().exec()) as DiaryType[];
// });

export default async function Page() {
    // const data = await getData();

    return (
        <>
            {/* {data.map((diary) => (
                <Card className="flex w-full flex-col items-center gap-4 p-4">
                    <div>Edit {diary.name}</div>

                    <Divider orientation="horizontal" />

                    <DiaryForm key={diary.id} initialFormData={diary} />
                </Card>
            ))} */}

            <Card className="flex w-full flex-col items-center gap-4 p-4">
                <div>New diary</div>

                <Divider orientation="horizontal" />

                <DiaryForm />
            </Card>
        </>
    );
}
