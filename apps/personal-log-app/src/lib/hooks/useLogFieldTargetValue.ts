import { useMemo } from 'react';
import { dateDiffInDays } from '../utils/date';
import { DiaryFormFieldProps } from '../components/DiaryFormField';
import { LogFormFieldInitialData } from '../components/LogForm';
import { DiaryFieldTypesEnum, DiaryFieldVariantsEnum } from '../common/enums';

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

        return useMemo(() => parseInt(initialTarget, 10), [initialTarget]);
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

        return useMemo(
            () =>
                parseInt(initialTarget, 10) +
                parseInt(moveTargetByValue, 10) *
                    Math.floor(
                        dateDiffInDays(
                            new Date(),
                            new Date(diaryCreatedAt),
                            true,
                        ) / parseInt(moveTargetAfterDayCount, 10),
                    ),
            [initialTarget, moveTargetByValue, moveTargetAfterDayCount],
        );
    }

    return undefined;
};
