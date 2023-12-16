export const queryParamToSingleValue = (value: string | string[]) =>
    Array.isArray(value) ? value[0] : value;
