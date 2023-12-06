import {
    DiaryFieldTypesEnum,
    DiaryFieldVariantsEnum,
    DiaryWeekdaysEnum,
    DiaryRepeatTypeEnum,
} from './enums';

export interface IDynamicRouteProps<T extends string> {
    params: { [P in T]: string };
}

export interface IDiary {
    diaryName: string;
    repeatType: DiaryRepeatTypeEnum;
    repeatValues: DiaryWeekdaysEnum[] | string[];
    note?: string;
    fields: IDiaryField[];
}

export interface IDiaryField {
    fieldName: string;
    note?: string;
    fieldType?: DiaryFieldTypesEnum | '';
    variant?: DiaryFieldVariantsEnum | '';
    initialTarget?: string;
    moveTargetByValue?: string;
    moveTargetAfterDayCount?: string;
    selectValues?: string[];
    rangeFrom?: string;
    rangeTo?: string;
}
