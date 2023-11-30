import { z } from 'zod';
import {
    DiaryFieldTypes,
    DiaryFieldVariants,
    DiaryFormFieldType,
} from '../types/diary-form-field';

export const diaryFieldSchema = z.object<Record<keyof DiaryFormFieldType, any>>(
    {
        name: z.string().min(3),
        note: z.string().optional(),
        type: z.nativeEnum(DiaryFieldTypes),
        variant: z.nativeEnum(DiaryFieldVariants),
        initalTarget: z.coerce.number().or(z.string()),
        moveTargetByValue: z.coerce.string(),
        moveTargetAfterDayCount: z.coerce.number().nonnegative(),
        selectValues: z.array(z.string()),
        rangeFrom: z.coerce.number(),
        rangeTo: z.coerce.number(),
    },
);
