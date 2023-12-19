'use client';

import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { IDiaryField, IDiaryWithId, ILog, ILogField } from '../common/types';
import LogFormField from './LogFormField';
import { Button } from '@nextui-org/react';
import { upsertLog } from '@/app/actions/logs';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export type LogFormFieldInitialData = IDiaryField & Partial<ILogField>;
export type LogFormData = ILog & { fields: LogFormFieldInitialData[] };

type LogFormProps = {
    selectedDiary: IDiaryWithId;
    selectedDay: string;
    initialData?: Partial<ILog>;
};

export default function LogForm({
    selectedDay,
    selectedDiary,
    initialData,
}: LogFormProps) {
    const getInitialFields = useCallback(
        (): LogFormFieldInitialData[] =>
            selectedDiary.fields.map((diaryField) => ({
                value: '',
                ...diaryField,
                ...initialData?.fields?.find(
                    (initialDataField) =>
                        initialDataField.fieldName === diaryField.fieldName,
                ),
            })),
        [selectedDay, selectedDiary, initialData],
    );

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<LogFormData>({
        defaultValues: {
            ...initialData,
            fields: getInitialFields(),
        },
    });

    const { data: session } = useSession();

    const { fields } = useFieldArray<LogFormData>({
        name: 'fields',
        control,
    });

    useEffect(() => {
        reset({ ...initialData, fields: getInitialFields() });
    }, [selectedDiary, selectedDay, initialData]);

    async function onSubmit(data: ILog) {
        await upsertLog(
            data,
            selectedDay,
            selectedDiary._id,
            session?.user?.email,
        );

        if (initialData) toast.success('Log entry updated');
        else toast.success('Log entry created');
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col items-center gap-4"
            >
                {fields.map((field, index) => (
                    <LogFormField
                        control={control}
                        index={index}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        key={field.id}
                        fieldData={field}
                        diaryCreateTime={selectedDiary.createdAt}
                    />
                ))}
                <div className="flex flex-col justify-stretch gap-4 ">
                    <Button color="primary" radius="full" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </>
    );
}
