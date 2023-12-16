import mongoClient from '@/lib/mongodb/client';
import React from 'react';
import Log from '@/lib/mongodb/models/log';

async function createLog() {
    await mongoClient.connect();

    // await Log.create({
    //     diaryId: '65789fedf4c5dfbe1aa8264b',
    //     date: new Date(),
    // });
}

export default async function Page() {
    await createLog();
    return <div></div>;
}
