'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { weekdayNames } from '../common/constants/weekdays';
import { getDateString } from '../utils/date';

type DateSelectType = {
    daysList: Date[];
    selectedDay: string;
    setSelectedDay: (day: string) => void;
    lastNLogDates?: string[];
};

export default function LogDateSelect({
    daysList,
    selectedDay,
    setSelectedDay,
    lastNLogDates,
}: DateSelectType) {
    const getBorderClass = (day: Date) => {
        if (!lastNLogDates) return '';
        if (lastNLogDates.includes(getDateString(day))) {
            return 'border-success';
        } else {
            return 'border-danger';
        }
    };

    return (
        <Tabs
            radius="full"
            color="primary"
            size="lg"
            fullWidth
            selectedKey={selectedDay}
            onSelectionChange={(e) => setSelectedDay(String(e))}
            classNames={{
                tabList: 'bg-white shadow-medium',
            }}
        >
            {daysList.map((day) => (
                <Tab
                    key={getDateString(day)}
                    value={getDateString(day)}
                    title={`${weekdayNames[day.getDay()]} ${day.getDate()}. ${
                        day.getMonth() + 1
                    }.`}
                    className={`${getBorderClass(day)} border-2 px-2`}
                />
            ))}
        </Tabs>
    );
}
