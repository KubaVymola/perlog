import React, { useMemo } from 'react';
import { CheckboxGroup } from '@nextui-org/react';
import { DiaryRepeatTypeEnum } from '@/lib/common/enums';
import { weekdayNames } from '../common/constants/weekdays';
import CheckboxGroupChip from './CheckboxGroupChip';

type DaysPickerProps = {
    value: string[];
    onChange: (e: string[] | React.FormEvent<HTMLDivElement>) => void;
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
            onChange={(value) => {
                if (Array.isArray(value)) onChange(value);
            }}
        >
            {type === DiaryRepeatTypeEnum.week &&
                weekdayNames.map((day, index) => (
                    <CheckboxGroupChip
                        key={String(index)}
                        value={String(index)}
                        className={`row-start-1 ${
                            index === 0 ? 'col-start-7' : `col-start-${index}`
                        }`}
                    >
                        {day}
                    </CheckboxGroupChip>
                ))}

            {type === DiaryRepeatTypeEnum.month &&
                monthDays.map((day) => (
                    <CheckboxGroupChip key={day} value={day}>
                        {day}
                    </CheckboxGroupChip>
                ))}
        </CheckboxGroup>
    );
}
