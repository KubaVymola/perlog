import React, { useMemo } from 'react';
import { CheckboxGroup } from '@nextui-org/react';
import DaysCheckbox from './DaysPickerCheckbox';
import { weekdays } from '@/lib/constants/weekdays';
import { DiaryFormRepeatEnum } from '../types/diary-form';

type DaysPickerProps = {
    value: string[];
    onChange: (e: any) => void;
    type: DiaryFormRepeatEnum;
};

export default function DaysPicker({ type, value, onChange }: DaysPickerProps) {
    const monthDays = useMemo(
        () => Array.from({ length: 31 }, (_, index) => String(index + 1)),
        [],
    );

    if (type !== DiaryFormRepeatEnum.week && type !== DiaryFormRepeatEnum.month)
        return null;

    return (
        <CheckboxGroup
            classNames={{ wrapper: 'gap-2 grid grid-cols-7 justify-stretch' }}
            orientation="horizontal"
            value={value}
            onChange={onChange}
        >
            {(type === DiaryFormRepeatEnum.week ? weekdays : monthDays).map(
                (day) => (
                    <DaysCheckbox key={day} value={day}>
                        {day}
                    </DaysCheckbox>
                ),
            )}
        </CheckboxGroup>
    );
}
