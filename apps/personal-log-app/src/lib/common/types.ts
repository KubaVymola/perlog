import {
    DiaryFieldTypesEnum,
    DiaryFieldVariantsEnum,
    DiaryRepeatTypeEnum,
} from './enums';

export interface IStaticRouteProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

export interface IDynamicRouteProps<T extends string>
    extends IStaticRouteProps {
    params: { [P in T]: string };
}

export type IDiary = {
    diaryName: string;
    repeatType: DiaryRepeatTypeEnum;
    repeatValues: string[];
    note?: string;
    fields: IDiaryField[];
    createdAt?: Date;
    updatedAt?: Date;
    email: string;
};

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

export interface IDiaryWithId extends IDiary {
    _id: string;
}

export interface ILog {
    date: Date;
    diaryId: object;
    fields: ILogField[];
    email: string;
}

export interface ILogField {
    fieldName: string;
    note?: string;
    value: string | string[];
}

export interface ILogWithId extends ILog {
    _id?: string;
}

type HookFormOnChangeArgs<T> = { target: { value: T } };
export type HookFormOnChangeType<T = string> = (
    event: HookFormOnChangeArgs<T>,
) => void;
