import {
    DiaryFieldTypesEnum,
    DiaryFieldVariantsEnum,
} from '@/lib/common/enums';

export const diaryFieldTypeData = [
    {
        type: DiaryFieldTypesEnum.Record,
        displayName: 'Record',
        allowedVariants: [
            DiaryFieldVariantsEnum.AnyTags,
            DiaryFieldVariantsEnum.FixedTags,
            DiaryFieldVariantsEnum.Select,
            DiaryFieldVariantsEnum.Number,
            DiaryFieldVariantsEnum.Time,
            DiaryFieldVariantsEnum.RangeInt,
            DiaryFieldVariantsEnum.RangeFloat,
        ],
    },
    {
        type: DiaryFieldTypesEnum.FixedTarget,
        displayName: 'Fixed target',
        allowedVariants: [
            DiaryFieldVariantsEnum.Number,
            DiaryFieldVariantsEnum.Time,
            DiaryFieldVariantsEnum.RangeInt,
            DiaryFieldVariantsEnum.RangeFloat,
        ],
    },
    {
        type: DiaryFieldTypesEnum.MovingTarget,
        displayName: 'Moving target',
        allowedVariants: [
            DiaryFieldVariantsEnum.Number,
            DiaryFieldVariantsEnum.Time,
            DiaryFieldVariantsEnum.RangeInt,
            DiaryFieldVariantsEnum.RangeFloat,
        ],
    },
];

export const diaryFieldVariantData: Record<
    DiaryFieldVariantsEnum,
    { displayName: string }
> = {
    [DiaryFieldVariantsEnum.AnyTags]: {
        displayName: 'Any tags',
    },
    [DiaryFieldVariantsEnum.FixedTags]: {
        displayName: 'Fixed tags',
    },
    [DiaryFieldVariantsEnum.Select]: {
        displayName: 'Select',
    },
    [DiaryFieldVariantsEnum.Number]: {
        displayName: 'Number',
    },
    [DiaryFieldVariantsEnum.Time]: {
        displayName: 'Time',
    },
    [DiaryFieldVariantsEnum.RangeInt]: {
        displayName: 'Range (Integer)',
    },
    [DiaryFieldVariantsEnum.RangeFloat]: {
        displayName: 'Range (Decimal)',
    },
};
