import { configureStore } from '@reduxjs/toolkit';
import { employeesApi } from '../features/employees/employeesApi';
import filtersReducer from '../features/filters/filtersSlice';
import filtersUiReducer from '../features/filters/filtersUiSlice';
import { saveFilters } from '../features/filters/filtersStorage';
import themeReducer from '../features/theme/themeSlice';
import { applyTheme } from '../features/theme/themeStorage';

export const store = configureStore({
    reducer: {
        [employeesApi.reducerPath]: employeesApi.reducer,
        filters: filtersReducer,
        filtersUi: filtersUiReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeesApi.middleware),
});

let prevState = store.getState();
store.subscribe(() => {
    const state = store.getState();
    if (state.filters !== prevState.filters) saveFilters(state.filters);
    if (state.theme.mode !== prevState.theme.mode) applyTheme(state.theme.mode);
    prevState = state;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
