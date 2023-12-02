export enum DiaryFieldVariants {
    Number = 'Number',
    RangeInt = 'RangeInt',
    RangeFloat = 'RangeFloat',
    Time = 'Time',
    Select = 'Select',
    FixedTags = 'FixedTags',
    AnyTags = 'AnyTags',
}

export enum DiaryFieldTypes {
    Record = 'Record',
    FixedTarget = 'FixedTarget',
    MovingTarget = 'MovingTarget',
}

export type DiaryFormFieldType = {
    fieldName: string;
    note?: string;
    fieldType?: DiaryFieldTypes | '';
    variant?: DiaryFieldVariants | '';
    initialTarget?: string;
    moveTargetByValue?: string;
    moveTargetAfterDayCount?: string;
    selectValues?: string[];
    rangeFrom?: string;
    rangeTo?: string;
};
