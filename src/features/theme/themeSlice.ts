import { createSlice } from '@reduxjs/toolkit';
import type { Theme } from './themeStorage';
import { getInitialTheme } from './themeStorage';

interface ThemeState {
    mode: Theme;
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: (): ThemeState => ({ mode: getInitialTheme() }),
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
