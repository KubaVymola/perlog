import mongoose from 'mongoose';

export interface Log extends mongoose.Document {
    data: string;
}

const LogSchema = new mongoose.Schema<Log>({
    data: {
        type: String,
    },
});

export default mongoose.models.Log || mongoose.model<Log>('Log', LogSchema);
