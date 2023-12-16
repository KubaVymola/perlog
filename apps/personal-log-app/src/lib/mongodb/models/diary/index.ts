import mongoose, { Document, Schema, Model } from 'mongoose';
import { IDiary, IDiaryField } from '@/lib/common/types';

export interface IDiarySchema extends Document, IDiary {}
export interface IDiaryFieldSchema extends Document, IDiaryField {}

const DiaryFieldSchema = new Schema<IDiaryFieldSchema>({
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
    initialTarget: {
        type: Schema.Types.Mixed,
    },
    moveTargetByValue: {
        type: Number,
    },
    moveTargetAfterDayCount: {
        type: Number,
    },
    selectValues: {
        type: [String],
    },
    rangeFrom: {
        type: Number,
    },
    rangeTo: {
        type: Number,
    },
});

const DiarySchema = new Schema<IDiarySchema>(
    {
        diaryName: {
            type: String,
            unique: true,
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
    },
    {
        timestamps: { updatedAt: true, createdAt: true },
    },
);

const Diary: Model<IDiarySchema> =
    mongoose.models.Diary || mongoose.model<IDiarySchema>('Diary', DiarySchema);

export default Diary;
