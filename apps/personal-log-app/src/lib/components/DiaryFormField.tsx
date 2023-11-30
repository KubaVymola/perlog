import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';
import {
    Control,
    Controller,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import DiaryFormVariantSelect from './DiaryFormVariantSelect';
import ChipInput from './ChipInput';
import { DiaryFormType } from '../types/diary-form';
import { DiaryFieldTypes, DiaryFieldVariants } from '../types/diary-form-field';
import { diaryFieldTypeData } from '../constants/diary-form-fields';

export type DiaryFormFieldProps = {
    control: Control<DiaryFormType, any>;
    index: number;
    watch: UseFormWatch<DiaryFormType>;
    remove: any;
    setValue: UseFormSetValue<DiaryFormType>;
};

export default function DiaryFormField({
    index,
    control,
    watch,
    remove,
    setValue,
}: DiaryFormFieldProps) {
    useEffect(() => {
        setValue(`fields.${index}.variant`, '');
        setValue(`fields.${index}.initalTarget`, '');
        setValue(`fields.${index}.moveTargetByValue`, 0);
        setValue(`fields.${index}.moveTargetAfterDayCount`, 0);
        setValue(`fields.${index}.selectValues`, []);
        setValue(`fields.${index}.rangeFrom`, 0);
        setValue(`fields.${index}.rangeTo`, 0);
    }, [watch(`fields.${index}.type`)]);

    useEffect(() => {
        if (
            watch(`fields.${index}.variant`) === DiaryFieldVariants.FixedTags ||
            watch(`fields.${index}.variant`) === DiaryFieldVariants.Select
        )
            return;

        setValue(`fields.${index}.selectValues`, []);
    }, [watch(`fields.${index}.variant`)]);

    return (
        <div className="flex w-full flex-row items-center justify-start gap-4">
            <div className="grid w-full grid-cols-2 items-center gap-4">
                <Controller
                    name={`fields.${index}.name`}
                    control={control}
                    render={({ field }) => (
                        <Input label="Name" type="text" {...field} />
                    )}
                />

                <Controller
                    name={`fields.${index}.note`}
                    control={control}
                    render={({ field }) => (
                        <Input label="Note (optional)" type="text" {...field} />
                    )}
                />

                <Controller
                    name={`fields.${index}.type`}
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Field type"
                            placeholder="Select field type"
                            selectedKeys={field.value ? [field.value] : []}
                            {...field}
                        >
                            {diaryFieldTypeData.map((record) => (
                                <SelectItem
                                    key={record.type}
                                    value={record.type}
                                >
                                    {record.displayName}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />

                {watch(`fields.${index}.type`) !== '' && (
                    <DiaryFormVariantSelect
                        control={control}
                        type={watch(`fields.${index}.type`)}
                        index={index}
                    />
                )}

                {(watch(`fields.${index}.type`) ===
                    DiaryFieldTypes.FixedTarget ||
                    watch(`fields.${index}.type`) ===
                        DiaryFieldTypes.MovingTarget) &&
                    watch(`fields.${index}.variant`) !== '' && (
                        <Controller
                            name={`fields.${index}.initalTarget`}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type={
                                        watch(`fields.${index}.variant`, '') ===
                                        DiaryFieldVariants.Time
                                            ? 'text'
                                            : 'number'
                                    }
                                    label="Target"
                                    placeholder={
                                        watch(`fields.${index}.variant`, '') ===
                                        DiaryFieldVariants.Time
                                            ? '00:00'
                                            : watch(
                                                    `fields.${index}.variant`,
                                                    '',
                                                ) ===
                                                DiaryFieldVariants.RangeFloat
                                              ? '0.00'
                                              : '0'
                                    }
                                />
                            )}
                        />
                    )}

                {watch(`fields.${index}.type`, '') ===
                    DiaryFieldTypes.MovingTarget &&
                    watch(`fields.${index}.variant`, '') !== '' && (
                        <Controller
                            name={`fields.${index}.moveTargetByValue`}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={String(field.value)}
                                    type="number"
                                    label="Change target by"
                                    placeholder="0"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">
                                                {watch(
                                                    `fields.${index}.variant`,
                                                ) === DiaryFieldVariants.Time
                                                    ? 'minutes'
                                                    : ''}
                                            </span>
                                        </div>
                                    }
                                />
                            )}
                        />
                    )}

                {watch(`fields.${index}.type`, '') ===
                    DiaryFieldTypes.MovingTarget &&
                    watch(`fields.${index}.variant`, '') !== '' && (
                        <Controller
                            control={control}
                            name={`fields.${index}.moveTargetAfterDayCount`}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={String(field.value)}
                                    type="number"
                                    label="Change target each"
                                    placeholder="0"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">
                                                {watch(
                                                    `fields.${index}.moveTargetAfterDayCount`,
                                                ) === 1
                                                    ? 'day'
                                                    : 'days'}
                                            </span>
                                        </div>
                                    }
                                />
                            )}
                        />
                    )}

                {(watch(`fields.${index}.variant`) ===
                    DiaryFieldVariants.FixedTags ||
                    watch(`fields.${index}.variant`) ===
                        DiaryFieldVariants.Select) && (
                    <div className="col-span-2">
                        <Controller
                            name={`fields.${index}.selectValues`}
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <ChipInput
                                    onChange={onChange}
                                    value={value}
                                    ref={ref}
                                />
                            )}
                        />
                    </div>
                )}

                {(watch(`fields.${index}.variant`) ===
                    DiaryFieldVariants.RangeInt ||
                    watch(`fields.${index}.variant`) ===
                        DiaryFieldVariants.RangeFloat) && (
                    <>
                        <Controller
                            name={`fields.${index}.rangeFrom`}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={String(field.value)}
                                    type="number"
                                    label="Range from"
                                    placeholder={
                                        watch(`fields.${index}.variant`) ===
                                        DiaryFieldVariants.RangeFloat
                                            ? '0.00'
                                            : '0'
                                    }
                                />
                            )}
                        />
                        <Controller
                            name={`fields.${index}.rangeTo`}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={String(field.value)}
                                    type="number"
                                    label="Range to"
                                    placeholder={
                                        watch(`fields.${index}.variant`) ===
                                        DiaryFieldVariants.RangeFloat
                                            ? '0.00'
                                            : '0'
                                    }
                                />
                            )}
                        />
                    </>
                )}
            </div>

            <Button
                variant="ghost"
                color="danger"
                type="button"
                radius="full"
                size="sm"
                className="w-fit min-w-fit font-extrabold"
                onClick={() => remove(index)}
            >
                -
            </Button>
        </div>
    );
}
