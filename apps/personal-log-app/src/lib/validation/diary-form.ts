import { z } from 'zod';
import { diaryFieldSchema } from './diary-form-field';
import { DiaryFormType, DiaryFormRepeatEnum } from '../types/diary-form';

export const diaryFormSchema = z.object<Record<keyof DiaryFormType, any>>({
    diaryName: z.string().min(3),
    note: z.string().optional(),
    repeatType: z.nativeEnum(DiaryFormRepeatEnum, {
        errorMap: () => ({
            message: 'Select repeat type',
        }),
    }),
    repeatValues: z.array(z.string()),
    fields: z.array(diaryFieldSchema),
});
