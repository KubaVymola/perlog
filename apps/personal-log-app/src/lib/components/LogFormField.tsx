import React from 'react';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { Card, Divider } from '@nextui-org/react';
import { LogFormData, LogFormFieldInitialData } from './LogForm';
import LogFormFieldInput from './LogFormFieldInput';
import { useLogFieldTargetValue } from '../hooks/useLogFieldTargetValue';

export type LogFormFieldProps = {
    control: Control<LogFormData>;
    index: number;
    watch: UseFormWatch<LogFormData>;
    setValue: UseFormSetValue<LogFormData>;
    errors?: FieldErrors<LogFormData>;
    fieldData: LogFormFieldInitialData;
    diaryCreateTime?: Date;
};

export default function LogFormField({
    control,
    index,
    fieldData,
    diaryCreateTime,
}: LogFormFieldProps) {
    const { fieldName, note, variant } = fieldData;
    const fieldTarget = useLogFieldTargetValue(fieldData, diaryCreateTime);

    if (!fieldName) return null;
    if (!variant || variant.length === 0) return null;

    return (
        <Card className="flex w-full flex-row items-center justify-stretch gap-4 p-4">
            <div className="flex flex-1 flex-col items-center gap-2">
                <Controller
                    name={`fields.${index}.value`}
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                        <LogFormFieldInput
                            name={name}
                            value={value}
                            onChange={(value) => {
                                onChange(value);
                            }}
                            fieldData={fieldData}
                            fieldTarget={fieldTarget}
                        />
                    )}
                />
                {fieldTarget && (
                    <div className="text-sm">Target: {fieldTarget}</div>
                )}
            </div>
            <div className="flex flex-1 flex-col items-start gap-2">
                <div>{fieldName}</div>
                {note && <Divider orientation="horizontal" className="-mx-1" />}
                {note && <div className="text-sm">{note}</div>}
            </div>
        </Card>
    );
}
