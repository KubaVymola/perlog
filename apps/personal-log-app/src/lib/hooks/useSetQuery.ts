import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useSetQuery = () => {
    const searchParamsHook = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (newParams: Record<string, string | undefined>) => {
            const searchParams = new URLSearchParams(searchParamsHook);

            for (const key in newParams) {
                const value = newParams[key];

                if (!value) searchParams.delete(key);
                else searchParams.set(key, value);
            }

            return searchParams.toString();
        },
        [searchParamsHook],
    );

    const updateQueryParams = useCallback(
        (newParams: Record<string, string | undefined>) =>
            router.push(`${pathname}?${createQueryString(newParams)}`),
        [router, pathname, createQueryString],
    );

    return updateQueryParams;
};
