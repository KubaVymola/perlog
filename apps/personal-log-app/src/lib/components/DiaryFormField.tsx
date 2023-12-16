import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormSetValue,
    UseFormWatch,
    UseFieldArrayRemove,
} from 'react-hook-form';
import ChipInput from './ChipInput';
import ErrorMessage from './ErrorMessage';
import { IDiary } from '@/lib/common/types';
import {
    DiaryFieldTypesEnum,
    DiaryFieldVariantsEnum,
} from '@/lib/common/enums';
import {
    diaryFieldTypeData,
    diaryFieldVariantData,
} from '@/lib/common/constants/diary-form-fields';

export type DiaryFormFieldProps = {
    control: Control<IDiary>;
    index: number;
    watch: UseFormWatch<IDiary>;
    remove: UseFieldArrayRemove;
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
    const watchFieldType = watch(`fields.${index}.fieldType`);
    const watchVariant = watch(`fields.${index}.variant`);
    const watchMoveTargetAfterDayCount = watch(
        `fields.${index}.moveTargetAfterDayCount`,
    );

    const showVariant = watchFieldType !== '';
    const showSelectValues =
        watchVariant === DiaryFieldVariantsEnum.FixedTags ||
        watchVariant === DiaryFieldVariantsEnum.Select;
    const showTarget =
        (watchFieldType === DiaryFieldTypesEnum.FixedTarget ||
            watchFieldType === DiaryFieldTypesEnum.MovingTarget) &&
        watchVariant !== '';
    const showMoveTarget =
        watchFieldType === DiaryFieldTypesEnum.MovingTarget &&
        watchVariant !== '';
    const showRange =
        watchVariant === DiaryFieldVariantsEnum.RangeInt ||
        watchVariant === DiaryFieldVariantsEnum.RangeFloat;

    const rangePlaceholder =
        watchVariant === DiaryFieldVariantsEnum.RangeFloat ? '0.00' : '0';
    const initialTargetPlaceholder =
        watchVariant === DiaryFieldVariantsEnum.Time
            ? '00:00'
            : watchVariant === DiaryFieldVariantsEnum.RangeFloat
              ? '0.00'
              : '0';
    const initialTargetType =
        watchVariant === DiaryFieldVariantsEnum.Time ? 'text' : 'number';
    const moveTargetByValuePlaceholder =
        watchVariant === DiaryFieldVariantsEnum.Time ? 'minutes' : '';
    const moveTargetAfterDaysPlaceholder =
        watchMoveTargetAfterDayCount === '1' ? 'day' : 'days';

    const [innerErrors, setInnerErrors] = useState(
        errors?.fields && errors.fields[index]
            ? errors.fields[index]
            : undefined,
    );

    const allowedVariants = useMemo(
        () =>
            diaryFieldTypeData.find((field) => field.type === watchFieldType)
                ?.allowedVariants ?? [],
        [watchFieldType],
    );

    useEffect(() => {
        if (!errors?.fields) return;
        if (!errors.fields[index]) return;

        setInnerErrors(errors.fields[index]);
    }, [errors, index]);

    const resetInputs = () => {
        setValue(`fields.${index}.variant`, '');
        setValue(`fields.${index}.initialTarget`, '');
        setValue(`fields.${index}.moveTargetByValue`, '');
        setValue(`fields.${index}.moveTargetAfterDayCount`, '');
        setValue(`fields.${index}.selectValues`, []);
        setValue(`fields.${index}.rangeFrom`, '');
        setValue(`fields.${index}.rangeTo`, '');
    };

    const resetSelectValues = (newVariant: string) => {
        if (
            newVariant === DiaryFieldVariantsEnum.FixedTags ||
            newVariant === DiaryFieldVariantsEnum.Select
        ) {
            setValue(`fields.${index}.selectValues`, []);
        }
    };

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
                            onChange={(e) => {
                                resetInputs();
                                field.onChange(e);
                            }}
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
                <ErrorMessage message={innerErrors?.fieldType?.message} />

                {showVariant && (
                    <Controller
                        name={`fields.${index}.variant`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Variant"
                                placeholder="Select variant"
                                selectedKeys={field.value ? [field.value] : []}
                                {...field}
                                onChange={(e) => {
                                    resetSelectValues(e.target.value);
                                    field.onChange(e);
                                }}
                                classNames={{
                                    listboxWrapper: 'max-h-none',
                                }}
                            >
                                {allowedVariants.map((variant) => (
                                    <SelectItem key={variant} value={variant}>
                                        {
                                            diaryFieldVariantData[variant]
                                                .displayName
                                        }
                                    </SelectItem>
                                )) ?? <>(null)</>}
                            </Select>
                        )}
                    />
                )}
                {showVariant && (
                    <ErrorMessage message={innerErrors?.variant?.message} />
                )}

                {showTarget && (
                    <Controller
                        name={`fields.${index}.initialTarget`}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type={initialTargetType}
                                label="Target"
                                placeholder={initialTargetPlaceholder}
                            />
                        )}
                    />
                )}

                {showMoveTarget && (
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
                                            {moveTargetByValuePlaceholder}
                                        </span>
                                    </div>
                                }
                            />
                        )}
                    />
                )}

                {showMoveTarget && (
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
                                            {moveTargetAfterDaysPlaceholder}
                                        </span>
                                    </div>
                                }
                            />
                        )}
                    />
                )}

                {showSelectValues && (
                    <div className="col-span-2">
                        <Controller
                            name={`fields.${index}.selectValues`}
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <ChipInput
                                    onChange={(value) => onChange(value)}
                                    value={value}
                                    ref={ref}
                                />
                            )}
                        />
                    </div>
                )}

                {showRange && (
                    <Controller
                        name={`fields.${index}.rangeFrom`}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                label="Range from"
                                placeholder={rangePlaceholder}
                            />
                        )}
                    />
                )}

                {showRange && (
                    <Controller
                        name={`fields.${index}.rangeTo`}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                label="Range to"
                                placeholder={rangePlaceholder}
                            />
                        )}
                    />
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
