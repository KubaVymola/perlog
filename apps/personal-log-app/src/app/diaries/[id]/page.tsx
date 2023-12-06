import React from 'react';
import { Card, Divider } from '@nextui-org/react';
import DiaryForm from '@/lib/components/DiaryForm';
import BackButton from '@/lib/components/BackButton';
import IconWrapper from '@/lib/components/IconWrapper';
import { IDiary, IDynamicRouteProps } from '@/lib/common/types';
import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/mongodb/models/diary';

const getDiary = async (id: string): Promise<{ data: IDiary | null }> => {
    await mongoClient.connect();
    const data = await Diary.findById(id).lean();

    const dataSerialized = JSON.parse(JSON.stringify(data));

    console.log(dataSerialized);

    return { data: dataSerialized };
};

export default async function Page({ params }: IDynamicRouteProps<'id'>) {
    const diaryData = await getDiary(params.id);

    if (!diaryData.data) return null;

    return (
        <>
            <Card className="flex w-full flex-col items-center gap-4 p-4">
                <div className="flex items-center justify-center">
                    <div>New diary</div>
                    <BackButton
                        className="absolute left-4 min-w-0 px-4"
                        type="button"
                        variant="light"
                        color="default"
                    >
                        <IconWrapper icon="mdi:arrow-left" width="1rem" />
                    </BackButton>
                </div>

                <Divider orientation="horizontal" />

                <DiaryForm initialFormData={diaryData.data} />
            </Card>
        </>
    );
}
