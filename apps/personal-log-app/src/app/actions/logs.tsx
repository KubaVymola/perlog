'use server';

import { ILog, ILogWithId } from '@/lib/common/types';
import mongoClient from '@/lib/mongodb/client';
import Log from '@/lib/mongodb/models/log';
import { revalidatePath } from 'next/cache';

async function createLog(logData: ILog, selectedDate: string, diaryId: string) {
    await mongoClient.connect();

    await Log.create({
        ...logData,
        date: new Date(new Date(selectedDate).setUTCHours(12, 0, 0)),
        diaryId,
    });
}

async function updateLog(
    logId: string,
    logData: ILog,
    selectedDate: string,
    diaryId: string,
) {
    await mongoClient.connect();

    await Log.updateOne(
        { _id: logId },
        {
            ...logData,
            date: new Date(new Date(selectedDate).setUTCHours(12, 0, 0)),
            diaryId,
        },
    );
}

export async function upsertLog(
    logData: ILog,
    selectedDate: string,
    diaryId: string,
) {
    await mongoClient.connect();

    const startDate = new Date(new Date(selectedDate).setUTCHours(0, 0, 0, 0));
    const endDate = new Date(new Date(selectedDate).setUTCHours(23, 59, 59, 0));

    const foundLogs: ILogWithId[] = await Log.find({
        diaryId,
        date: {
            $gte: startDate,
            $lte: endDate,
        },
    });

    if (foundLogs.length > 0 && foundLogs[0]._id) {
        await Log.deleteMany({ _id: foundLogs.slice(1).map((log) => log._id) });
        await updateLog(foundLogs[0]._id, logData, selectedDate, diaryId);
        revalidatePath('/', 'layout');
    } else {
        await createLog(logData, selectedDate, diaryId);
        revalidatePath('/', 'layout');
    }
}

export async function deleteLog(logId?: string) {
    if (!logId) return;

    await mongoClient.connect();

    await Log.deleteOne({ _id: logId });

    revalidatePath('/', 'layout');
}
