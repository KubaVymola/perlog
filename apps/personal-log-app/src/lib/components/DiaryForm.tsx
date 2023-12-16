'use client';

import React from 'react';
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DaysPicker from './DaysPicker';
import DiaryFormField from './DiaryFormField';
import ErrorMessage from './ErrorMessage';
import { addDiary, updateDiary } from '@/app/diaries/actions';
import { weekdays } from '@/lib/common/constants/weekdays';
import { DiaryRepeatTypeEnum } from '@/lib/common/enums';
import { IDiary } from '@/lib/common/types';
import { diaryFormSchema } from '@/lib/validation/diary-form';
import toast from 'react-hot-toast';

export type DiaryFormProps = {
    initialFormData?: Partial<IDiary>;
    diaryId?: string;
};

export default function DiaryForm({
    initialFormData,
    diaryId,
}: DiaryFormProps) {
    const {
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IDiary>({
        defaultValues: {
            diaryName: initialFormData?.diaryName ?? '',
            repeatType: initialFormData?.repeatType ?? DiaryRepeatTypeEnum.week,
            repeatValues: initialFormData?.repeatValues ?? weekdays,
            ...initialFormData,
        },
        resolver: zodResolver(diaryFormSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        delayError: 50,
        mode: 'onBlur',
    });

    const { fields, append, remove } = useFieldArray<IDiary>({
        name: 'fields',
        control,
    });

    const resetRepeatValues = (newRepeatType: string) => {
        if (newRepeatType === 'week') setValue('repeatValues', weekdays);
        if (newRepeatType === 'month') setValue('repeatValues', []);
    };

    async function onSubmit(data: IDiary) {
        if (diaryId) {
            await updateDiary(diaryId, data);
            toast.success('Diary updated');
        } else {
            await addDiary(data);
            toast.success('Diary created');
        }
    }

    function addField() {
        append({ fieldName: '', note: '', fieldType: '', variant: '' });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4"
        >
            <Controller
                control={control}
                name="diaryName"
                render={({ field }) => (
                    <Input type="text" label="Diary name" {...field} />
                )}
            />

            <ErrorMessage message={errors.diaryName?.message} />

            <Controller
                control={control}
                name="repeatType"
                render={({ field }) => (
                    <Select
                        label="Repeat type"
                        placeholder="Select repeat type"
                        selectedKeys={field.value ? [field.value] : []}
                        {...field}
                        onChange={(e) => {
                            field.onChange(e);
                            resetRepeatValues(e.target.value);
                        }}
                    >
                        <SelectItem
                            key={DiaryRepeatTypeEnum.week}
                            value={DiaryRepeatTypeEnum.week}
                        >
                            Week
                        </SelectItem>
                        <SelectItem
                            key={DiaryRepeatTypeEnum.month}
                            value={DiaryRepeatTypeEnum.month}
                        >
                            Month
                        </SelectItem>
                    </Select>
                )}
            />

            <ErrorMessage message={errors.repeatType?.message} />

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

            {fields.map((field, index) => (
                <React.Fragment key={field.id}>
                    <DiaryFormField
                        index={index}
                        control={control}
                        remove={remove}
                        watch={watch}
                        setValue={setValue}
                        errors={errors}
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
