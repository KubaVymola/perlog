'use client';

import React from 'react';
import Input from '@/lib/components/input';
import { useFieldArray, useForm } from 'react-hook-form';

type DiaryFieldNumericVariant = 'int' | 'float' | 'time';
type DiaryFieldVariant =
    | DiaryFieldNumericVariant
    | 'select'
    | 'fixed-tags'
    | 'any-tags';

type DiaryFieldCommonAttributes = {
    name: string;
    showName: string;
    note?: string;
};

type DiaryField = DiaryFieldCommonAttributes &
    (
        | {
              type: 'record';
              variant: DiaryFieldVariant;
          }
        | {
              type: 'fixed-target';
              variant: DiaryFieldNumericVariant;
              target: number;
          }
        | {
              type: 'moving-target';
              variant: DiaryFieldNumericVariant;
              initalTarget: number;
              moveTargetByValue: number;
              moveTargetAfterDayCount: number;
          }
    );

type FormData = {
    name: string;
    repeatType: 'week' | 'month';
    repeatValues: number[];
    note: string;
    fields: DiaryField[];
};

export default function NewDiaryForm() {
    const { register, handleSubmit, control, watch } = useForm<FormData>();
    const { fields, append, remove } = useFieldArray<FormData>({
        name: 'fields',
        control,
    });

    function onSubmit(data: FormData) {
        console.log(data);
    }

    function addField(e: React.MouseEvent<HTMLButtonElement>) {
        append({
            type: 'record',
            name: 'test',
            showName: 'Test',
            variant: 'int',
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-2 rounded-lg bg-white p-2"
        >
            <Input
                type="text"
                placeholder="Diary name"
                {...register('name', { required: true })}
            />
            <select
                placeholder="Repeat type"
                {...register('repeatType', { required: true })}
            >
                <option value="week">Week</option>
                <option value="month">Month</option>
            </select>

            {watch('repeatType') === 'week' && <div>Week type</div>}
            {watch('repeatType') === 'month' && <div>Month type</div>}

            {fields.map((field, index) => (
                <div key={field.id}>
                    {field.id} - {field.showName} -
                    <input
                        type="text"
                        {...register(`fields.${index}.name` as const)}
                    />
                </div>
            ))}

            <button type="button" onClick={addField}>
                Add field
            </button>

            <button type="submit">Submit</button>
        </form>
    );
}
