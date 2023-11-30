'use client';

import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import DaysPicker from './DaysPicker';
import { weekdays } from '@/lib/constants/weekdays';
import DiaryFormField from './DiaryFormField';
import { addDiary } from '@/app/diaries/actions';
import { DiaryFormType } from '../types/diary-form';

export type DiaryFormProps = {
    initialFormData?: Partial<DiaryFormType>;
};

export default function DiaryForm({ initialFormData }: DiaryFormProps) {
    const { register, handleSubmit, control, watch, setValue } =
        useForm<DiaryFormType>({
            defaultValues: {
                name: 'test',
                repeatType: 'week',
                repeatValues: weekdays,
                ...initialFormData,
            },
        });

    const { fields, append, remove } = useFieldArray<DiaryFormType>({
        name: 'fields',
        control,
    });

    useEffect(() => {
        if (watch('repeatType') === 'week') setValue('repeatValues', weekdays);
        if (watch('repeatType') === 'month') setValue('repeatValues', []);
    }, [watch('repeatType')]);

    function onSubmit(data: DiaryFormType) {
        console.log(data);
        // addDiary(data);
    }

    function addField() {
        append({ name: '', note: '', type: '', variant: '' });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4"
        >
            <Controller
                control={control}
                name="name"
                render={({ field }) => (
                    <Input type="text" label="Diary name" {...field} />
                )}
            />

            <Controller
                control={control}
                name="repeatType"
                render={({ field }) => (
                    <Select
                        label="Repeat type"
                        placeholder="Select repeat type"
                        selectedKeys={field.value ? [field.value] : []}
                        {...field}
                    >
                        <SelectItem key="week" value="week">
                            Week
                        </SelectItem>
                        <SelectItem key="month" value="month">
                            Month
                        </SelectItem>
                    </Select>
                )}
            />

            <Controller
                control={control}
                name="repeatValues"
                render={({ field: { value, onChange } }) => (
                    <DaysPicker
                        type={watch('repeatType')}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />

            <Divider orientation="horizontal" />
            {/* {fields.length !== 0 && <Divider orientation="horizontal" />} */}

            {fields.map((field, index) => (
                <React.Fragment key={field.id}>
                    <DiaryFormField
                        index={index}
                        control={control}
                        remove={remove}
                        watch={watch}
                        setValue={setValue}
                    />
                    {index !== fields.length - 1 && (
                        <Divider orientation="horizontal" />
                    )}
                </React.Fragment>
            ))}

            <Button
                color="primary"
                variant="bordered"
                radius="full"
                type="button"
                onClick={addField}
            >
                + Add field
            </Button>

            <Button color="primary" radius="full" type="submit">
                Submit
            </Button>
        </form>
    );
}
