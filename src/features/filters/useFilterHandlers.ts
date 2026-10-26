import { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import type { GenderQuery, PositionQuery, TechnologyQuery } from '../employees/types';
import { removeFilter, setSearch, toggleFilter } from './filtersSlice';
import type { FilterKey, FilterValue } from './filtersSlice';
import { closeFilter, openFilter } from './filtersUiSlice';

export function useFilterHandlers() {
    const dispatch = useAppDispatch();

    return useMemo(() => {
        const setOpen = (key: FilterKey) => (open: boolean) => {
            dispatch(open ? openFilter(key) : closeFilter(key));
        };

        return {
            setSearch: (value: string) => {
                dispatch(setSearch(value));
            },
            removeFilter: (item: FilterValue) => {
                dispatch(removeFilter(item));
            },
            position: {
                onOpenChange: setOpen('position'),
                onToggle: (value: PositionQuery) => {
                    dispatch(toggleFilter({ key: 'position', value }));
                },
            },
            gender: {
                onOpenChange: setOpen('gender'),
                onToggle: (value: GenderQuery) => {
                    dispatch(toggleFilter({ key: 'gender', value }));
                },
            },
            stack: {
                onOpenChange: setOpen('stack'),
                onToggle: (value: TechnologyQuery) => {
                    dispatch(toggleFilter({ key: 'stack', value }));
                },
            },
        };
    }, [dispatch]);
}
