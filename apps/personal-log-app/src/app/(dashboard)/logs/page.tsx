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
import { getServerSession } from 'next-auth';

const getDiaries = async (
    email: string | null | undefined,
): Promise<IDiaryWithId[]> => {
    if (!email) return [];

    await mongoClient.connect();

    const diaries = await Diary.find({ email });

    return cleanObject(diaries);
};

const getLog = async (
    diaryId: string,
    date: string,
    email: string | null | undefined,
): Promise<ILogWithId | undefined> => {
    if (!email) return;

    await mongoClient.connect();

    const startDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
    const endDate = new Date(new Date(date).setUTCHours(23, 59, 59, 0));

    const log: ILogWithId | null = await Log.findOne({
        diaryId,
        email,
        date: {
            $gte: startDate,
            $lte: endDate,
        },
    });

    return cleanObject(log) ?? undefined;
};

const getLastNLogDates = async (
    diaryId: string,
    email: string | null | undefined,
) => {
    if (!email) return [];

    await mongoClient.connect();

    const logs: { date: Date }[] = cleanObject(
        await Log.find({ diaryId }, 'date')
            .sort({ date: -1 })
            .limit(numberOfSelectDays),
    );

    return logs.map((log) => getDateString(new Date(log.date)));
};

export default async function Page({ searchParams }: IStaticRouteProps) {
    const session = await getServerSession();
    const email = session?.user?.email;

    const diaries = await getDiaries(email);
    let log: ILogWithId | undefined = undefined;
    let lastNLogDates: string[] | undefined = undefined;

    if (searchParams && searchParams['diary']) {
        lastNLogDates = await getLastNLogDates(
            queryParamToSingleValue(searchParams['diary']),
            email,
        );
    }

    if (searchParams && searchParams['diary'] && searchParams['day']) {
        log = await getLog(
            queryParamToSingleValue(searchParams['diary']),
            queryParamToSingleValue(searchParams['day']),
            email,
        );
    }

    return (
        <LogDetail diaries={diaries} log={log} lastNLogDates={lastNLogDates} />
    );
}
