import { DiaryFormFieldType } from './diary-form-field';

export enum DiaryFormRepeatEnum {
    week = 'week',
    month = 'month',
}

export enum DiaryFormDaysEnum {
    Mo = 'Mo',
    Tu = 'Tu',
    We = 'We',
    Th = 'Th',
    Fr = 'Fr',
    Sa = 'Sa',
    Su = 'Su',
}

export type DiaryFormType = {
    diaryName: string;
    repeatType: DiaryFormRepeatEnum;
    repeatValues: DiaryFormDaysEnum[] | string[];
    note?: string;
    fields: DiaryFormFieldType[];
};
