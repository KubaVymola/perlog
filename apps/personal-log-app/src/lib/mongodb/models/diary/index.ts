import mongoose from 'mongoose';

import { DiaryFormType } from '@/lib/types/diary-form';

const DiarySchema = new mongoose.Schema<DiaryFormType>({
    diaryName: {
        type: String,
    },
    note: {
        type: String,
    },
    repeatType: {
        type: String,
    },
    repeatValues: {
        type: [String],
    },
    fields: [
        {
            fieldName: {
                type: String,
            },
        },
    ],
});

export default mongoose.models.Diary ||
    mongoose.model<DiaryFormType>('Diary', DiarySchema);
