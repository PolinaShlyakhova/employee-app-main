import { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { selectEmployeesQueryArg } from '../filters/selectors';
import { useGetEmployeesInfiniteQuery } from './employeesApi';

const QUERY_DEBOUNCE_MS = 300;

export function useEmployeesList() {
    const [queryArg, applyNow] = useDebouncedValue(
        useAppSelector(selectEmployeesQueryArg),
        QUERY_DEBOUNCE_MS
    );
    const {
        currentData,
        error,
        isFetching,
        isFetchingNextPage,
        isError,
        hasNextPage,
        fetchNextPage,
        refetch,
    } = useGetEmployeesInfiniteQuery(queryArg);

    const employees = useMemo(() => currentData?.pages.flat() ?? [], [currentData]);
    const isLoading = !currentData && isFetching;
    const hasMore = hasNextPage && !isError;

    const loadMore = useCallback(() => {
        if (hasMore && !isFetchingNextPage) void fetchNextPage();
    }, [hasMore, isFetchingNextPage, fetchNextPage]);

    const retry = useCallback(() => {
        void (currentData ? fetchNextPage() : refetch());
    }, [currentData, fetchNextPage, refetch]);

    return {
        employees,
        isLoading,
        isLoadingMore: isFetchingNextPage,
        error: isFetching ? undefined : error,
        hasMore,
        loadMore,
        retry,
        applyNow,
    };
}
