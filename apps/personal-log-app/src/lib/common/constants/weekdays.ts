import { WeekdaysEnum } from '../enums';

export const weekdays = Object.values(WeekdaysEnum)
    .filter((v) => !isNaN(Number(v)))
    .map((v) => String(v));

export const weekdayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
