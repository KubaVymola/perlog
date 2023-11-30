import { z } from 'zod';
import { diaryFieldSchema } from './diary-form-field';
import { DiaryFormType } from '../types/diary-form';

export const diaryFormSchema = z.object<Record<keyof DiaryFormType, any>>({
    name: z.string(),
    note: z.string().optional(),
    repeatType: z.enum(['week', 'month']),
    repeatValues: z.array(z.string()),
    fields: z.array(diaryFieldSchema),
});
