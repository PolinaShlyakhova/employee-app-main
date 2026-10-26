import { memo } from 'react';
import styles from './SelectedFilters.module.scss';

interface SelectedItem {
    key: string;
    value: string;
    label: string;
}

interface Props<T extends SelectedItem> {
    items: T[];
    onRemove: (item: T) => void;
    onSearch: () => void;
}

function SelectedFiltersBase<T extends SelectedItem>({ items, onRemove, onSearch }: Props<T>) {
    return (
        <section className={styles.band} aria-label="Выбранные фильтры">
            <div className={styles.inner}>
                <div className={styles.selected}>
                    <span className={styles.title}>Выбранные фильтры:</span>
                    {items.length > 0 && (
                        <ul className={styles.chips}>
                            {items.map((item) => (
                                <li key={`${item.key}-${item.value}`}>
                                    <button
                                        type="button"
                                        className={styles.chip}
                                        aria-label={`Убрать фильтр «${item.label}»`}
                                        onClick={() => onRemove(item)}
                                    >
                                        <span className={styles.cross} aria-hidden="true" />
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="button" className={styles.search} onClick={onSearch}>
                    Найти
                </button>
            </div>
        </section>
    );
}

export const SelectedFilters = memo(SelectedFiltersBase) as typeof SelectedFiltersBase;
