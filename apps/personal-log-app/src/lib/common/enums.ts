export enum DiaryRepeatTypeEnum {
    week = 'week',
    month = 'month',
}

export enum WeekdaysEnum {
    Su = 0,
    Mo,
    Tu,
    We,
    Th,
    Fr,
    Sa,
}

export enum MonthsEnum {
    January = 0,
    February = 1,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

export enum DiaryFieldTypesEnum {
    Record = 'Record',
    FixedTarget = 'FixedTarget',
    MovingTarget = 'MovingTarget',
}

export enum DiaryFieldVariantsEnum {
    Text = 'Text',
    Number = 'Number',
    RangeInt = 'RangeInt',
    RangeFloat = 'RangeFloat',
    Time = 'Time',
    Select = 'Select',
    FixedTags = 'FixedTags',
    AnyTags = 'AnyTags',
}
