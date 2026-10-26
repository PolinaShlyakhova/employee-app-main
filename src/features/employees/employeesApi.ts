import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { appendQueryArg } from './queryParams';
import type { Employee, EmployeesQueryArg } from './types';

export const PAGE_SIZE = 20;

const CACHE_LIFETIME = 300;

function buildQueryString(page: number, arg: EmployeesQueryArg): string {
    const search = new URLSearchParams();
    search.set('page', String(page));
    search.set('count', String(PAGE_SIZE));

    return appendQueryArg(search, arg).toString();
}

export const employeesApi = createApi({
    reducerPath: 'employeesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    keepUnusedDataFor: CACHE_LIFETIME,
    refetchOnMountOrArgChange: CACHE_LIFETIME,
    endpoints: (build) => ({
        getEmployees: build.infiniteQuery<Employee[], EmployeesQueryArg, number>({
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, _allPages, lastPageParam) =>
                    lastPage.length < PAGE_SIZE ? undefined : lastPageParam + 1,
            },
            query: ({ queryArg, pageParam }) => `Employee?${buildQueryString(pageParam, queryArg)}`,
        }),
        getEmployeeById: build.query<Employee, number>({
            query: (id) => `Employee/${id}`,
        }),
    }),
});

export const { useGetEmployeesInfiniteQuery, useGetEmployeeByIdQuery } = employeesApi;
