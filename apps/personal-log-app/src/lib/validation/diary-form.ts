import { z } from 'zod';
import { diaryFieldSchema } from './diary-form-field';
import { IDiary } from '@/lib/common/types';
import { DiaryRepeatTypeEnum } from '@/lib/common/enums';

export const diaryFormSchema = z.object<
    Record<keyof Omit<IDiary, 'updatedAt' | 'createdAt'>, z.ZodTypeAny>
>({
    diaryName: z.string().min(3),
    note: z.string().optional(),
    repeatType: z.nativeEnum(DiaryRepeatTypeEnum, {
        errorMap: () => ({
            message: 'Select repeat type',
        }),
    }),
    repeatValues: z.array(z.string()),
    fields: z.array(diaryFieldSchema),
});
