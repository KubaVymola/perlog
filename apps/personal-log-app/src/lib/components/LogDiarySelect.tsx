'use client';

import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { IDiaryWithId } from '../common/types';

type LogSelectProps = {
    diaries: IDiaryWithId[];
    selectedDiary: string | undefined;
    setSelectedDiary: (diary: string) => void;
};

export default function LogDiarySelect({
    diaries,
    selectedDiary,
    setSelectedDiary,
}: LogSelectProps) {
    return (
        <Select
            label="Select diary"
            className="max-w-xs"
            classNames={{
                base: '!max-w-none',
                trigger:
                    'bg-white transition-colors duraiton-150 data-[hover=true]:bg-default-100',
            }}
            color="default"
            onChange={(e) => {
                setSelectedDiary(e.target.value);
            }}
            selectedKeys={selectedDiary ? [selectedDiary] : []}
        >
            {diaries &&
                diaries.map((diary, index) => (
                    <SelectItem key={diary._id ?? index} value={diary._id}>
                        {diary.diaryName}
                    </SelectItem>
                ))}
        </Select>
    );
}
