import { memo } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import styles from './SearchInput.module.scss';

interface Props {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    className?: string;
}

function SearchInputBase({ value, onChange, onSubmit, className }: Props) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form role="search" className={className} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="search"
                placeholder="Поиск"
                aria-label="Поиск по ФИО"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            />
        </form>
    );
}

export const SearchInput = memo(SearchInputBase);
