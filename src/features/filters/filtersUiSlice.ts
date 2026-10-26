import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FilterKey } from './filtersSlice';

interface FiltersUiState {
    openFilter: FilterKey | null;
}

const initialState: FiltersUiState = { openFilter: null };

const filtersUiSlice = createSlice({
    name: 'filtersUi',
    initialState,
    reducers: {
        openFilter(state, action: PayloadAction<FilterKey>) {
            state.openFilter = action.payload;
        },
        closeFilter(state, action: PayloadAction<FilterKey>) {
            if (state.openFilter === action.payload) state.openFilter = null;
        },
    },
});

export const { openFilter, closeFilter } = filtersUiSlice.actions;
export default filtersUiSlice.reducer;
