import { DiaryFieldTypes, DiaryFieldVariants } from '../types/diary-form-field';

export const diaryFieldTypeData = [
    {
        type: DiaryFieldTypes.Record,
        displayName: 'Record',
        allowedVariants: [
            DiaryFieldVariants.AnyTags,
            DiaryFieldVariants.FixedTags,
            DiaryFieldVariants.Select,
            DiaryFieldVariants.Number,
            DiaryFieldVariants.Time,
            DiaryFieldVariants.RangeInt,
            DiaryFieldVariants.RangeFloat,
        ],
    },
    {
        type: DiaryFieldTypes.FixedTarget,
        displayName: 'Fixed target',
        allowedVariants: [
            DiaryFieldVariants.Number,
            DiaryFieldVariants.Time,
            DiaryFieldVariants.RangeInt,
            DiaryFieldVariants.RangeFloat,
        ],
    },
    {
        type: DiaryFieldTypes.MovingTarget,
        displayName: 'Moving target',
        allowedVariants: [
            DiaryFieldVariants.Number,
            DiaryFieldVariants.Time,
            DiaryFieldVariants.RangeInt,
            DiaryFieldVariants.RangeFloat,
        ],
    },
];

export const diaryFieldVariantData: Record<
    DiaryFieldVariants,
    { displayName: string }
> = {
    [DiaryFieldVariants.AnyTags]: {
        displayName: 'Any tags',
    },
    [DiaryFieldVariants.FixedTags]: {
        displayName: 'Fixed tags',
    },
    [DiaryFieldVariants.Select]: {
        displayName: 'Select',
    },
    [DiaryFieldVariants.Number]: {
        displayName: 'Number',
    },
    [DiaryFieldVariants.Time]: {
        displayName: 'Time',
    },
    [DiaryFieldVariants.RangeInt]: {
        displayName: 'Range (Integer)',
    },
    [DiaryFieldVariants.RangeFloat]: {
        displayName: 'Range (Decimal)',
    },
};
