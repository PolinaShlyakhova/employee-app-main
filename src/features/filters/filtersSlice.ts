import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GenderQuery, PositionQuery, TechnologyQuery } from '../employees/types';
import { loadInitialFilters } from './filtersStorage';

export interface FiltersState {
    search: string;
    gender: GenderQuery[];
    position: PositionQuery[];
    stack: TechnologyQuery[];
}

export type FilterKey = Exclude<keyof FiltersState, 'search'>;

export type FilterValue =
    | { key: 'gender'; value: GenderQuery }
    | { key: 'position'; value: PositionQuery }
    | { key: 'stack'; value: TechnologyQuery };

const filtersSlice = createSlice({
    name: 'filters',
    initialState: loadInitialFilters,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        toggleFilter(state, action: PayloadAction<FilterValue>) {
            const { key, value } = action.payload;
            const list: string[] = state[key];
            const idx = list.indexOf(value);
            if (idx >= 0) list.splice(idx, 1);
            else list.push(value);
        },
        removeFilter(state, action: PayloadAction<FilterValue>) {
            const { key, value } = action.payload;
            const list: string[] = state[key];
            const idx = list.indexOf(value);
            if (idx >= 0) list.splice(idx, 1);
        },
    },
});

export const { setSearch, toggleFilter, removeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
