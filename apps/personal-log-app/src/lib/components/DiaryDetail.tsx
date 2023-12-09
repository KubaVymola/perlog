import { Card, Divider } from '@nextui-org/react';
import React from 'react';
import BackButton from './BackButton';
import IconWrapper from './IconWrapper';
import DiaryForm from './DiaryForm';
import { IDiaryWithId } from '../common/types';

type DiaryDetailProps = {
    diaryData?: IDiaryWithId;
};

export default function DiaryDetail({ diaryData }: DiaryDetailProps) {
    return (
        <Card className="mb-4 flex w-full flex-col items-center gap-4 p-4">
            <div className="flex items-center justify-center">
                {!diaryData && <div>New diary</div>}
                {diaryData && <div>Edit diary</div>}
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

            <DiaryForm initialFormData={diaryData} diaryId={diaryData?._id} />
        </Card>
    );
}
