import { ILog, ILogField } from '@/lib/common/types';
import mongoose from 'mongoose';

export interface ILogSchema extends mongoose.Document, ILog {}
export interface ILogFieldSchema extends mongoose.Document, ILogField {}

const LogFieldSchema = new mongoose.Schema<ILogFieldSchema>({
    fieldName: {
        type: String,
    },
    note: {
        type: String,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const LogSchema = new mongoose.Schema<ILogSchema>({
    date: {
        type: Date,
    },
    diaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diary',
    },
    email: {
        type: String,
    },
    fields: [LogFieldSchema],
});

export default mongoose.models.Log ||
    mongoose.model<ILogSchema>('Log', LogSchema);
