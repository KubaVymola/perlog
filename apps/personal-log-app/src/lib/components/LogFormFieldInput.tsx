import {
    CheckboxGroup,
    Input,
    Select,
    SelectItem,
    Slider,
} from '@nextui-org/react';
import React from 'react';
import { LogFormFieldInitialData } from './LogForm';
import { DiaryFieldVariantsEnum } from '../common/enums';
import ChipInput from './ChipInput';
import CheckboxGroupChip from './CheckboxGroupChip';

type LogFormFieldInputProps = {
    name: string;
    onChange: (value: string | string[] | undefined) => void;
    value: string | string[] | undefined;
    fieldData: LogFormFieldInitialData;
    fieldTarget: number | string | undefined;
};

export default function LogFormFieldInput({
    name,
    value,
    onChange,
    fieldData,
    fieldTarget,
}: LogFormFieldInputProps) {
    const valueToArray = (value: string | string[] | undefined) => {
        if (!value) return [];
        if (!Array.isArray(value)) return [value];
        return value;
    };

    if (fieldData.variant === DiaryFieldVariantsEnum.Number) {
        return (
            <Input
                name={name}
                value={Array.isArray(value) ? value[0] : value}
                type="number"
                onChange={(e) => onChange(e.target.value)}
                className="flex-1"
                label="Enter value"
            />
        );
    }

    if (fieldData.variant === DiaryFieldVariantsEnum.Select) {
        return (
            <Select
                label="label"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                selectedKeys={value && !Array.isArray(value) ? [value] : []}
            >
                {fieldData.selectValues?.map((selectValue) => (
                    <SelectItem key={selectValue} value={selectValue}>
                        {selectValue}
                    </SelectItem>
                )) ?? []}
            </Select>
        );
    }

    if (fieldData.variant === DiaryFieldVariantsEnum.AnyTags) {
        return (
            <ChipInput
                onChange={(value) => onChange(value ?? '')}
                value={valueToArray(value)}
                orientation="vertical"
            />
        );
    }

    if (fieldData.variant === DiaryFieldVariantsEnum.FixedTags) {
        return (
            <CheckboxGroup
                classNames={{
                    wrapper: 'gap-2 flex flex-row items-centers',
                }}
                orientation="horizontal"
                value={valueToArray(value)}
                onChange={(value) => {
                    if (Array.isArray(value)) onChange(value);
                }}
            >
                {fieldData.selectValues &&
                    fieldData.selectValues.map((value) => (
                        <CheckboxGroupChip
                            key={value}
                            value={value}
                            color="primary"
                            className="!w-auto"
                        >
                            {value}
                        </CheckboxGroupChip>
                    ))}
            </CheckboxGroup>
        );
    }

    if (
        fieldData.variant === DiaryFieldVariantsEnum.RangeFloat ||
        fieldData.variant === DiaryFieldVariantsEnum.RangeInt
    ) {
        return (
            <Slider
                value={
                    !Number.isNaN(value)
                        ? Number(value)
                        : Number(fieldData.rangeFrom ?? '0')
                }
                onChange={(value) => onChange(value.toString())}
                step={
                    fieldData.variant === DiaryFieldVariantsEnum.RangeFloat
                        ? 0.1
                        : 1
                }
                {...(typeof fieldTarget === 'number' && {
                    fillOffset: fieldTarget,
                })}
                classNames={{
                    base: 'flex-col-reverse',
                    labelWrapper: 'justify-center',
                    value: 'text-sm',
                }}
                label=" "
                hideValue={false}
                getValue={(value) => `Value: ${value}`}
                maxValue={parseFloat(fieldData.rangeTo ?? '10')}
                minValue={parseFloat(fieldData.rangeFrom ?? '0')}
                aria-label={`${fieldData.fieldName} slider`}
            />
        );
    }

    // TODO add time record input

    return null;
}
