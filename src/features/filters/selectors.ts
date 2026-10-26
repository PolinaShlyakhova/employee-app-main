import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { EmployeesQueryArg } from '../employees/types';
import type { FilterValue } from './filtersSlice';
import { GENDER_OPTIONS, POSITION_OPTIONS, STACK_OPTIONS, getOptionLabel } from './options';

export type SelectedFilter = FilterValue & { label: string };

export const selectFilters = (state: RootState) => state.filters;
export const selectOpenFilter = (state: RootState) => state.filtersUi.openFilter;

export const selectEmployeesQueryArg = createSelector(
    [selectFilters],
    (filters): EmployeesQueryArg => {
        const arg: EmployeesQueryArg = {};
        const name = filters.search.trim();

        if (name) arg.name = name;
        if (filters.gender.length) arg.gender = [...filters.gender].sort();
        if (filters.position.length) arg.position = [...filters.position].sort();
        if (filters.stack.length) arg.stack = [...filters.stack].sort();

        return arg;
    }
);

export const selectSelectedFilters = createSelector(
    [selectFilters],
    (filters): SelectedFilter[] => [
        ...filters.gender.map((value) => ({
            key: 'gender' as const,
            value,
            label: getOptionLabel(GENDER_OPTIONS, value),
        })),
        ...filters.position.map((value) => ({
            key: 'position' as const,
            value,
            label: getOptionLabel(POSITION_OPTIONS, value),
        })),
        ...filters.stack.map((value) => ({
            key: 'stack' as const,
            value,
            label: getOptionLabel(STACK_OPTIONS, value),
        })),
    ]
);
