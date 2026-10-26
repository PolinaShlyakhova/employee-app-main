import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleTheme } from '../features/theme/themeSlice';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
    const mode = useAppSelector((s) => s.theme.mode);
    const dispatch = useAppDispatch();
    const isDark = mode === 'dark';

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Тёмная тема"
            className={styles.toggle}
            onClick={() => dispatch(toggleTheme())}
        >
            <span className={styles.knob} />
        </button>
    );
}
