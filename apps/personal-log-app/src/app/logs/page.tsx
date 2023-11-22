import React, { cache } from 'react';
// import { addLog } from './actions';
import mongoClient from '@/lib/mongodb/client';
import Log from '@/lib/models/log';

const getData = cache(async () => {
    await mongoClient.connect();
    return await Log.find().exec();
});

export default async function Page() {
    const data = await getData();

    return (
        <div className="flex flex-col items-center gap-4">
            {data.map((entry) => (
                <div key={entry._id}>Entry: {entry.data}</div>
            ))}
        </div>
    );
}
