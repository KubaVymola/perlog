import { z } from 'zod';
import {
    DiaryFieldTypes,
    DiaryFieldVariants,
    DiaryFormFieldType,
} from '../types/diary-form-field';

export const diaryFieldSchema = z
    .object<Record<keyof DiaryFormFieldType, any>>({
        fieldName: z.string().min(3),
        note: z.string().optional(),
        fieldType: z.nativeEnum(DiaryFieldTypes),
        variant: z.nativeEnum(DiaryFieldVariants),
        initialTarget: z.coerce.number().or(z.string()),
        moveTargetByValue: z.coerce.number(),
        moveTargetAfterDayCount: z.coerce.number().nonnegative(),
        selectValues: z.array(z.string()),
        rangeFrom: z.coerce.number(),
        rangeTo: z.coerce.number(),
    })
    .superRefine((ctx) => {
        console.log(typeof ctx.initialTarget);
        console.log(ctx.initialTarget);
        if (ctx.fieldType === DiaryFieldTypes.Record) return true;

        if (ctx.variant === DiaryFieldVariants.Time) {
            if (typeof ctx.initialTarget !== 'string') return false;

            if (
                !ctx.initialTarget.match(
                    /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                )
            ) {
                return false;
            }
        }

        if (ctx.fieldType === DiaryFieldTypes.MovingTarget) {
        }

        return true;
    });
