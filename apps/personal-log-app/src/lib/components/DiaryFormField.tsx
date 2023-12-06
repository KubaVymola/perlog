import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import DiaryFormVariantSelect from './DiaryFormVariantSelect';
import ChipInput from './ChipInput';
import ErrorMessage from './ErrorMessage';
import { IDiary } from '@/lib/common/types';
import {
    DiaryFieldTypesEnum,
    DiaryFieldVariantsEnum,
} from '@/lib/common/enums';
import { diaryFieldTypeData } from '@/lib/common/constants/diary-form-fields';

export type DiaryFormFieldProps = {
    control: Control<IDiary, any>;
    index: number;
    watch: UseFormWatch<IDiary>;
    remove: any;
    setValue: UseFormSetValue<IDiary>;
    errors?: FieldErrors<IDiary>;
};

export default function DiaryFormField({
    index,
    control,
    watch,
    remove,
    setValue,
    errors,
}: DiaryFormFieldProps) {
    useEffect(() => {
        // setValue(`fields.${index}.variant`, '');
        // setValue(`fields.${index}.initialTarget`, '');
        // setValue(`fields.${index}.moveTargetByValue`, '');
        // setValue(`fields.${index}.moveTargetAfterDayCount`, '');
        // setValue(`fields.${index}.selectValues`, []);
        // setValue(`fields.${index}.rangeFrom`, '');
        // setValue(`fields.${index}.rangeTo`, '');
    }, [watch(`fields.${index}.fieldType`)]);

    const [innerErrors, setInnerErrors] = useState(
        errors?.fields && errors.fields[index]
            ? errors.fields[index]
            : undefined,
    );

    useEffect(() => {
        if (!errors?.fields) return;
        if (!errors.fields[index]) return;

        setInnerErrors(errors.fields[index]);
    }, [errors]);

    useEffect(() => {
        if (
            watch(`fields.${index}.variant`) ===
                DiaryFieldVariantsEnum.FixedTags ||
            watch(`fields.${index}.variant`) === DiaryFieldVariantsEnum.Select
        )
            return;

        // setValue(`fields.${index}.selectValues`, []);
    }, [watch(`fields.${index}.variant`)]);

    return (
        <div className="flex w-full flex-row items-center justify-start gap-4">
            <div className="grid w-full grid-cols-2 items-start gap-4">
                <div>
                    <Controller
                        name={`fields.${index}.fieldName`}
                        control={control}
                        render={({ field }) => (
                            <Input label="Name" type="text" {...field} />
                        )}
                    />

                    <ErrorMessage message={innerErrors?.fieldName?.message} />
                </div>

                <Controller
                    name={`fields.${index}.note`}
                    control={control}
                    render={({ field }) => (
                        <Input label="Note (optional)" type="text" {...field} />
                    )}
                />

                <Controller
                    name={`fields.${index}.fieldType`}
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

                {watch(`fields.${index}.fieldType`) !== '' && (
                    <>
                        <DiaryFormVariantSelect
                            control={control}
                            type={watch(`fields.${index}.fieldType`)}
                            index={index}
                        />
                        <ErrorMessage
                            message={innerErrors?.fieldType?.message}
                        />
                    </>
                )}

                {(watch(`fields.${index}.fieldType`) ===
                    DiaryFieldTypesEnum.FixedTarget ||
                    watch(`fields.${index}.fieldType`) ===
                        DiaryFieldTypesEnum.MovingTarget) &&
                    watch(`fields.${index}.variant`) !== '' && (
                        <Controller
                            name={`fields.${index}.initialTarget`}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type={
                                        watch(`fields.${index}.variant`) ===
                                        DiaryFieldVariantsEnum.Time
                                            ? 'text'
                                            : 'number'
                                    }
                                    label="Target"
                                    placeholder={
                                        watch(`fields.${index}.variant`) ===
                                        DiaryFieldVariantsEnum.Time
                                            ? '00:00'
                                            : watch(
                                                    `fields.${index}.variant`,
                                                    '',
                                                ) ===
                                                DiaryFieldVariantsEnum.RangeFloat
                                              ? '0.00'
                                              : '0'
                                    }
                                />
                            )}
                        />
                    )}

                {watch(`fields.${index}.fieldType`, '') ===
                    DiaryFieldTypesEnum.MovingTarget &&
                    watch(`fields.${index}.variant`, '') !== '' && (
                        <Controller
                            name={`fields.${index}.moveTargetByValue`}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    label="Change target by"
                                    placeholder="0"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">
                                                {watch(
                                                    `fields.${index}.variant`,
                                                ) ===
                                                DiaryFieldVariantsEnum.Time
                                                    ? 'minutes'
                                                    : ''}
                                            </span>
                                        </div>
                                    }
                                />
                            )}
                        />
                    )}

                {watch(`fields.${index}.fieldType`, '') ===
                    DiaryFieldTypesEnum.MovingTarget &&
                    watch(`fields.${index}.variant`, '') !== '' && (
                        <Controller
                            control={control}
                            name={`fields.${index}.moveTargetAfterDayCount`}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    label="Change target each"
                                    placeholder="0"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">
                                                {watch(
                                                    `fields.${index}.moveTargetAfterDayCount`,
                                                ) === '1'
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
                    DiaryFieldVariantsEnum.FixedTags ||
                    watch(`fields.${index}.variant`) ===
                        DiaryFieldVariantsEnum.Select) && (
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
                    DiaryFieldVariantsEnum.RangeInt ||
                    watch(`fields.${index}.variant`) ===
                        DiaryFieldVariantsEnum.RangeFloat) && (
                    <>
                        <Controller
                            name={`fields.${index}.rangeFrom`}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    label="Range from"
                                    placeholder={
                                        watch(`fields.${index}.variant`) ===
                                        DiaryFieldVariantsEnum.RangeFloat
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
                                    type="number"
                                    label="Range to"
                                    placeholder={
                                        watch(`fields.${index}.variant`) ===
                                        DiaryFieldVariantsEnum.RangeFloat
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
