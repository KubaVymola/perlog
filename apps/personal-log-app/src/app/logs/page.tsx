import React from 'react';
import mongoClient from '@/lib/mongodb/client';
import Log from '@/lib/mongodb/models/log';
import LogSelect from '@/lib/components/LogSelect';
import { IDiaryWithId, ILogWithId } from '@/lib/common/types';
import Diary from '@/lib/mongodb/models/diary';

type GetDataReturn = {
    diaries: IDiaryWithId[];
    logs: ILogWithId[];
};

const getData = async (): Promise<GetDataReturn> => {
    await mongoClient.connect();

    const [diaries, logs] = await Promise.all([Diary.find(), Log.find()]);

    return {
        diaries: JSON.parse(JSON.stringify(diaries)),
        logs: JSON.parse(JSON.stringify(logs)),
    };
};

export default async function Page() {
    const { diaries, logs } = await getData();

    console.log(diaries);

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <LogSelect diaries={diaries} />

            {logs.map((log) => (
                <div key={log._id}>Entry: {log.date.toString()}</div>
            ))}
        </div>
    );
}
