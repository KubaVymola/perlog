import mongoose from 'mongoose';

import { FormData as DiaryType } from '@/lib/components/types/DiaryFormTypes';

const DiarySchema = new mongoose.Schema<DiaryType>({
    name: {
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
            name: {
                type: String,
            },
        },
    ],
});

export default mongoose.models.Diary ||
    mongoose.model<DiaryType>('Diary', DiarySchema);
