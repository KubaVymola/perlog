import { CheckboxGroup } from '@nextui-org/react';
import React, { useEffect } from 'react';
import DaysCheckbox from './DaysPickerCheckbox';
import { weekdays } from '@/lib/constants/weekdays';

type DaysPickerProps = {
    value: string[];
    onChange: (e: any) => void;
    type: 'week' | 'month';
};

export default function DaysPicker({ type, value, onChange }: DaysPickerProps) {
    const monthDays = Array.from({ length: 31 }, (_, index) =>
        String(index + 1),
    );

    if (type !== 'week' && type !== 'month') return null;

    return (
        <CheckboxGroup
            classNames={{ wrapper: 'gap-2 grid grid-cols-7 justify-stretch' }}
            orientation="horizontal"
            value={value}
            onChange={onChange}
        >
            {(type === 'week' ? weekdays : monthDays).map((day) => (
                <DaysCheckbox key={day} value={day}>
                    {day}
                </DaysCheckbox>
            ))}
        </CheckboxGroup>
    );
}
