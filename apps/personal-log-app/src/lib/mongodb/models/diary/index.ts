import mongoose, { Document } from 'mongoose';

import { IDiary, IDiaryField } from '@/lib/common/types';
import {
    DiaryFieldTypesEnum,
    DiaryFieldVariantsEnum,
} from '@/lib/common/enums';

export interface IDiarySchema extends Document, IDiary {}
export interface IDiaryFieldSchema extends Document, IDiaryField {}

const DiaryFieldSchema = new mongoose.Schema<IDiaryFieldSchema>({
    fieldName: {
        type: String,
    },
    note: {
        type: String,
    },
    fieldType: {
        type: String,
    },
    variant: {
        type: String,
    },
});

const DiarySchema = new mongoose.Schema<IDiarySchema>({
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
    fields: [DiaryFieldSchema],
});

const Diary: mongoose.Model<IDiarySchema> =
    mongoose.models.Diary || mongoose.model<IDiarySchema>('Diary', DiarySchema);

export default Diary;
