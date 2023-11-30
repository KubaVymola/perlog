import { DiaryFormFieldType } from './diary-form-field';

export type DiaryFormType = {
    name: string;
    repeatType: 'week' | 'month';
    repeatValues: string[];
    note?: string;
    fields: DiaryFormFieldType[];
};
