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
    name: string;
    note?: string;
    type?: DiaryFieldTypes | '';
    variant?: DiaryFieldVariants | '';
    initalTarget?: string;
    moveTargetByValue?: number;
    moveTargetAfterDayCount?: number;
    selectValues?: string[];
    rangeFrom?: number;
    rangeTo?: number;
};
