'use client';

import { Select, SelectItem } from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { IDiaryWithId } from '../common/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

type LogSelectProps = {
    diaries: IDiaryWithId[];
};

export default function LogSelect({ diaries }: LogSelectProps) {
    const diaryParamName = 'diary';
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [selectedDiary, setSelectedDiary] = useState(
        diaries[0]._id ?? undefined,
    );
    const createQueryString = useCallback(
        (name: string, value?: string) => {
            const params = new URLSearchParams(searchParams);

            if (!value) params.delete(name);
            else params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    useEffect(() => {
        if (!selectedDiary) {
            router.push(
                `${pathname}?${createQueryString(diaryParamName, undefined)}`,
            );
            return;
        }

        router.push(
            `${pathname}?${createQueryString(diaryParamName, selectedDiary)}`,
        );
    }, [selectedDiary]);

    return (
        <Select
            label="Select diary"
            className="max-w-xs"
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
