import React from 'react';
import mongoClient from '@/lib/mongodb/client';
import {
    IDiaryWithId,
    ILogWithId,
    IStaticRouteProps,
} from '@/lib/common/types';
import Diary from '@/lib/mongodb/models/diary';
import Log from '@/lib/mongodb/models/log';
import cleanObject from '@/lib/utils/clean-object';
import LogDetail from '@/lib/components/LogDetail';
import { numberOfSelectDays } from '@/lib/common/constants/date-select';
import { queryParamToSingleValue } from '@/lib/utils/sanitize-query-param';
import { getDateString } from '@/lib/utils/date';

const getDiaries = async (): Promise<IDiaryWithId[]> => {
    await mongoClient.connect();

    const diaries = await Diary.find();

    return cleanObject(diaries);
};

const getLog = async (
    diaryId: string,
    date: string,
): Promise<ILogWithId | undefined> => {
    await mongoClient.connect();

    const startDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
    const endDate = new Date(new Date(date).setUTCHours(23, 59, 59, 0));

    const log: ILogWithId | null = await Log.findOne({
        diaryId,
        date: {
            $gte: startDate,
            $lte: endDate,
        },
    });

    return cleanObject(log) ?? undefined;
};

const getLastNLogDates = async (diaryId: string) => {
    await mongoClient.connect();

    const logs: { date: Date }[] = cleanObject(
        await Log.find({ diaryId }, 'date')
            .sort({ date: -1 })
            .limit(numberOfSelectDays),
    );

    return logs.map((log) => getDateString(new Date(log.date)));
};

export default async function Page({ searchParams }: IStaticRouteProps) {
    const diaries = await getDiaries();
    let log: ILogWithId | undefined = undefined;
    let lastNLogDates: string[] | undefined = undefined;

    if (searchParams && searchParams['diary']) {
        lastNLogDates = await getLastNLogDates(
            queryParamToSingleValue(searchParams['diary']),
        );
    }

    if (searchParams && searchParams['diary'] && searchParams['day']) {
        log = await getLog(
            queryParamToSingleValue(searchParams['diary']),
            queryParamToSingleValue(searchParams['day']),
        );
    }

    return (
        <LogDetail diaries={diaries} log={log} lastNLogDates={lastNLogDates} />
    );
}
