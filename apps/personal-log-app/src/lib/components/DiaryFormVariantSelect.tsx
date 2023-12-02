import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
    diaryFieldTypeData,
    diaryFieldVariantData,
} from '@/lib/constants/diary-form-fields';
import { DiaryFormType } from '@/lib/types/diary-form';

type DiaryFormVariantSelectProps = {
    index: number;
    control: Control<DiaryFormType, any>;
    type: string | undefined;
};

export default function DiaryFormVariantSelect({
    control,
    index,
    type,
}: DiaryFormVariantSelectProps) {
    return (
        <Controller
            name={`fields.${index}.variant`}
            control={control}
            render={({ field }) => (
                <Select
                    label="Variant"
                    placeholder="Select variant"
                    selectedKeys={field.value ? [field.value] : []}
                    {...field}
                >
                    {diaryFieldTypeData
                        .find((field) => field.type === type)
                        ?.allowedVariants.map((variant) => (
                            <SelectItem key={variant} value={variant}>
                                {diaryFieldVariantData[variant].displayName}
                            </SelectItem>
                        )) ?? <>(null)</>}
                </Select>
            )}
        />
    );
}
