import React from 'react';
import { Card, Divider } from '@nextui-org/react';
import DiaryForm from '@/lib/components/DiaryForm';
import BackButton from '@/lib/components/BackButton';
import IconWrapper from '@/lib/components/IconWrapper';

export default async function Page() {
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

                <DiaryForm />
            </Card>
        </>
    );
}
