import { DiaryRepeatTypeEnum } from '../common/enums';

export const stripTimeFromDate = (date: Date) => {
    const toReturn = new Date(date);

    toReturn.setHours(0);
    toReturn.setMinutes(0);
    toReturn.setSeconds(0);

    return toReturn;
};

export const dateDiffInDays = (
    earlierDate: Date,
    laterDate: Date,
    absoluteValue?: boolean,
) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
        earlierDate.getFullYear(),
        earlierDate.getMonth(),
        earlierDate.getDate(),
    );
    const utc2 = Date.UTC(
        laterDate.getFullYear(),
        laterDate.getMonth(),
        laterDate.getDate(),
    );

    if (absoluteValue === true) {
        return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
    } else {
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
};

export const getDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const generatePreviousDaysList = (
    numberOfDays: number,
    repeatType: DiaryRepeatTypeEnum,
    repeatValues: string[],
) => {
    const toReturn: Date[] = [];
    const currentDay = new Date();

    if (repeatValues.length === 0) return [];

    for (
        let date = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            currentDay.getDate(),
            0,
            0,
            0,
            0,
        );
        toReturn.length < numberOfDays;
        date.setDate(date.getDate() - 1)
    ) {
        if (
            (repeatType === DiaryRepeatTypeEnum.week &&
                repeatValues.includes(String(date.getDay()))) ||
            repeatValues.includes(String(date.getDay() + 7)) ||
            (repeatType === DiaryRepeatTypeEnum.month &&
                repeatValues.includes(String(date.getDate())))
        ) {
            toReturn.push(new Date(date));
        }
    }

    return toReturn.reverse();
};
