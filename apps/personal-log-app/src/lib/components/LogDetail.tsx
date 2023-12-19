'use client';

import React, { useEffect, useMemo, useState } from 'react';
import LogDiarySelect from './LogDiarySelect';
import LogDateSelect from './LogDateSelect';
import { IDiaryWithId, ILogWithId } from '../common/types';
import { useSetQuery } from '../hooks/useSetQuery';
import { generatePreviousDaysList, getDateString } from '../utils/date';
import { numberOfSelectDays } from '../common/constants/date-select';
import LogForm from './LogForm';
import { deleteLog } from '@/app/actions/logs';
import ModalCallback from './ModalCallback';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

type LogDetailType = {
    diaries: IDiaryWithId[];
    log?: ILogWithId;
    lastNLogDates?: string[];
};

export default function LogDetail({
    diaries,
    log,
    lastNLogDates,
}: LogDetailType) {
    const setQuery = useSetQuery();
    const { data: session } = useSession();

    const [daysList, setDaysList] = useState<Date[] | undefined>(undefined);
    const [selectedDay, setSelectedDay] = useState<string | undefined>(
        undefined,
    );
    const [selectedDiaryId, setSelectedDiaryId] = useState<string | undefined>(
        diaries.length > 0 ? diaries[0]._id : undefined,
    );

    const selectedDiary = useMemo(
        () => diaries.find((diary) => diary._id === selectedDiaryId),
        [selectedDiaryId],
    );

    useEffect(() => {
        if (!selectedDiary) {
            setSelectedDay(() => undefined);
            return;
        }

        const newDaysList = generatePreviousDaysList(
            numberOfSelectDays,
            selectedDiary.repeatType,
            selectedDiary.repeatValues,
        );

        setDaysList(() => newDaysList);
        setSelectedDay(() =>
            getDateString(newDaysList[newDaysList.length - 1]),
        );
    }, [selectedDiary]);

    useEffect(() => {
        setQuery({
            diary: selectedDiaryId,
            day: selectedDay,
        });
    }, [selectedDay, selectedDiaryId]);

    const deleteLogWrapper = async () => {
        if (!log?._id) return;

        await deleteLog(log._id, session?.user?.email);
        toast.success('Log entry deleted');
    };

    return (
        <div className="flex w-full flex-col items-center gap-2">
            <LogDiarySelect
                diaries={diaries}
                selectedDiary={selectedDiaryId}
                setSelectedDiary={setSelectedDiaryId}
            />

            {selectedDiary && selectedDay && daysList && (
                <LogDateSelect
                    daysList={daysList}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    lastNLogDates={lastNLogDates}
                />
            )}

            {selectedDay && selectedDiary && (
                <LogForm
                    selectedDiary={selectedDiary}
                    selectedDay={selectedDay}
                    initialData={log}
                />
            )}

            {log?._id && (
                <ModalCallback
                    triggerButtonChildren={'Delete entry'}
                    triggerButtonProps={{
                        className: 'px-3 py-1 mt-2',
                        type: 'button',
                        color: 'danger',
                        variant: 'ghost',
                        radius: 'full',
                    }}
                    actionButtonChildren="Delete"
                    actionButtonProps={{ color: 'danger' }}
                    callback={deleteLogWrapper}
                    modalTitle="Really delete log entry?"
                />
            )}
        </div>
    );
}
