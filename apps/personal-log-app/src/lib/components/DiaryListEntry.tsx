'use client';

import { Button, Card } from '@nextui-org/react';
import React from 'react';
import { IDiarySchema } from '../mongodb/models/diary';
import IconWrapper from './IconWrapper';
import ModalCallback from './ModalCallback';
import Link from 'next/link';
import { deleteDiary } from '@/app/diaries/actions';
import toast from 'react-hot-toast';

type DiaryListEntryProps = {
    diary: IDiarySchema;
};

export default function DiaryListEntry({ diary }: DiaryListEntryProps) {
    const deleteDiaryWrapper = async () => {
        if (!diary._id) {
            toast.error('Something went wrong');
            return;
        }

        await deleteDiary(diary._id);
        toast.success('Diary deleted');
    };

    return (
        <Card key={diary._id} className="p-4">
            <div className="flex items-center gap-1">
                <div className="me-4">{diary.diaryName}</div>
                <Link href={`diaries/${diary._id}`} passHref legacyBehavior>
                    <Button
                        className="ms-auto min-w-0 px-3 py-1"
                        type="button"
                        variant="light"
                    >
                        <IconWrapper
                            width="1rem"
                            icon="mdi:file-edit"
                            className="text-primary"
                        />
                    </Button>
                </Link>

                <ModalCallback
                    triggerButtonChildren={
                        <IconWrapper
                            width="1rem"
                            icon="material-symbols:delete"
                            className="text-danger"
                        />
                    }
                    triggerButtonProps={{
                        className: 'min-w-0 px-3 py-1',
                        type: 'button',
                        variant: 'light',
                    }}
                    actionButtonChildren="Delete"
                    actionButtonProps={{ color: 'danger' }}
                    callback={deleteDiaryWrapper}
                    modalTitle="Really delete diary?"
                />
            </div>
        </Card>
    );
}
