import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import {
    DiaryFieldData,
    DiaryFieldTypes,
    DiaryVariantData,
} from './types/DiaryFormTypes';
import { Control, Controller } from 'react-hook-form';
import { FormData } from './types/DiaryFormTypes';

type DiaryFormVariantSelectProps = {
    index: number;
    control: Control<FormData, any>;
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
                    {DiaryFieldData.find(
                        (field) => field.type === type,
                    )?.allowedVariants.map((variant) => (
                        <SelectItem key={variant} value={variant}>
                            {DiaryVariantData[variant].displayName}
                        </SelectItem>
                    )) ?? <>(null)</>}
                </Select>
            )}
        />
    );
}
