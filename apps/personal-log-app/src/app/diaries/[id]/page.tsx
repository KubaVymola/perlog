import React from 'react';
import { IDiaryWithId, IDynamicRouteProps } from '@/lib/common/types';
import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/mongodb/models/diary';
import DiaryDetail from '@/lib/components/DiaryDetail';

const getDiary = async (id: string): Promise<IDiaryWithId | null> => {
    await mongoClient.connect();
    const data = await Diary.findById(id).lean();

    if (!data) return null;

    const dataSerialized = JSON.parse(JSON.stringify(data));

    return dataSerialized;
};

export default async function Page({ params }: IDynamicRouteProps<'id'>) {
    const diaryData = await getDiary(params.id);

    if (!diaryData) return null;

    return <DiaryDetail diaryData={diaryData} />;
}
