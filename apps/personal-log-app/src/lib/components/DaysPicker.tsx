import React, { useMemo } from 'react';
import { CheckboxGroup } from '@nextui-org/react';
import DaysCheckbox from './DaysPickerCheckbox';
import { weekdays } from '@/lib/common/constants/weekdays';
import { DiaryRepeatTypeEnum } from '@/lib/common/enums';

type DaysPickerProps = {
    value: string[];
    onChange: (e: any) => void;
    type: DiaryRepeatTypeEnum;
};

export default function DaysPicker({ type, value, onChange }: DaysPickerProps) {
    const monthDays = useMemo(
        () => Array.from({ length: 31 }, (_, index) => String(index + 1)),
        [],
    );

    if (type !== DiaryRepeatTypeEnum.week && type !== DiaryRepeatTypeEnum.month)
        return null;

    return (
        <CheckboxGroup
            classNames={{ wrapper: 'gap-2 grid grid-cols-7 justify-stretch' }}
            orientation="horizontal"
            value={value}
            onChange={onChange}
        >
            {(type === DiaryRepeatTypeEnum.week ? weekdays : monthDays).map(
                (day) => (
                    <DaysCheckbox key={day} value={day}>
                        {day}
                    </DaysCheckbox>
                ),
            )}
        </CheckboxGroup>
    );
}
