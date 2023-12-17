import { dateDiffInDays } from '../utils/date';
import { LogFormFieldInitialData } from '../components/LogForm';
import { DiaryFieldTypesEnum } from '../common/enums';

type UseLogFieldTargetProps = Pick<
    LogFormFieldInitialData,
    | 'variant'
    | 'initialTarget'
    | 'moveTargetByValue'
    | 'moveTargetAfterDayCount'
    | 'fieldType'
>;

export const useLogFieldTargetValue = (
    {
        fieldType,
        variant,
        initialTarget,
        moveTargetByValue,
        moveTargetAfterDayCount,
    }: UseLogFieldTargetProps,
    diaryCreatedAt?: Date,
) => {
    // TODO add calculation of target time

    if (typeof variant === 'undefined' || typeof fieldType === 'undefined') {
        return undefined;
    }

    if (fieldType === DiaryFieldTypesEnum.FixedTarget) {
        if (typeof initialTarget === 'undefined') return undefined;

        return parseInt(initialTarget, 10);
    }

    if (fieldType === DiaryFieldTypesEnum.MovingTarget) {
        if (
            typeof initialTarget === 'undefined' ||
            typeof moveTargetByValue === 'undefined' ||
            typeof moveTargetAfterDayCount === 'undefined'
        ) {
            return undefined;
        }

        if (!diaryCreatedAt) return 'unknown';

        return (
            parseInt(initialTarget, 10) +
            parseInt(moveTargetByValue, 10) *
                Math.floor(
                    dateDiffInDays(
                        // TODO change new Date() to new Date(selectedDate)
                        new Date(),
                        new Date(diaryCreatedAt),
                        true,
                    ) / parseInt(moveTargetAfterDayCount, 10),
                )
        );
    }

    return undefined;
};
