import React from 'react';
import { IDiaryWithId, IDynamicRouteProps } from '@/lib/common/types';
import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/mongodb/models/diary';
import DiaryDetail from '@/lib/components/DiaryDetail';
import { getServerSession } from 'next-auth';

const getDiary = async (
    id: string,
    email: string | null | undefined,
): Promise<IDiaryWithId | null> => {
    if (!email) return null;

    await mongoClient.connect();
    const data = await Diary.findById(id).lean();

    if (!data) return null;

    const dataSerialized = JSON.parse(JSON.stringify(data));

    return dataSerialized;
};

export default async function Page({ params }: IDynamicRouteProps<'id'>) {
    const session = await getServerSession();

    const diaryData = await getDiary(params.id, session?.user?.email);

    if (!diaryData) return null;

    return <DiaryDetail diaryData={diaryData} />;
}
