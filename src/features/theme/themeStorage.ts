export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const TRANSITION_MS = 400;

let transitionTimer: number | undefined;

export function getInitialTheme(): Theme {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
    const root = document.documentElement;

    root.classList.add('theme-transition');
    root.dataset.theme = theme;
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(
        () => root.classList.remove('theme-transition'),
        TRANSITION_MS
    );

    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
    }
}
