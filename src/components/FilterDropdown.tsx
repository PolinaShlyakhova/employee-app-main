import { memo, useCallback, useEffect, useId, useRef } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { useDismiss } from '../hooks/useDismiss';
import type { DismissReason } from '../hooks/useDismiss';
import type { FilterOption } from '../features/filters/options';
import styles from './FilterDropdown.module.scss';

interface Props<T extends string> {
    label: string;
    options: readonly FilterOption<T>[];
    selected: T[];
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onToggle: (value: T) => void;
}

function FilterDropdownBase<T extends string>({
    label,
    options,
    selected,
    isOpen,
    onOpenChange,
    onToggle,
}: Props<T>) {
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const panelId = useId();

    const handleDismiss = useCallback(
        (reason: DismissReason) => {
            onOpenChange(false);
            if (reason === 'escape') triggerRef.current?.focus();
        },
        [onOpenChange]
    );

    useDismiss(rootRef, handleDismiss, isOpen);

    useEffect(() => {
        if (isOpen) panelRef.current?.querySelector('input')?.focus();
    }, [isOpen]);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();

        if (!isOpen) {
            onOpenChange(true);
            return;
        }

        const inputs = Array.from(panelRef.current?.querySelectorAll('input') ?? []);
        const current = inputs.findIndex((input) => input === document.activeElement);
        const step = e.key === 'ArrowDown' ? 1 : -1;
        const next =
            current === -1
                ? step > 0
                    ? 0
                    : inputs.length - 1
                : (current + step + inputs.length) % inputs.length;
        inputs[next]?.focus();
    };

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (isOpen && e.relatedTarget && !rootRef.current?.contains(e.relatedTarget)) {
            onOpenChange(false);
        }
    };

    return (
        <div
            className={isOpen ? `${styles.dropdown} ${styles.open}` : styles.dropdown}
            ref={rootRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        >
            <button
                ref={triggerRef}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onOpenChange(!isOpen)}
            >
                {label}
                <span className={styles.chevron} aria-hidden="true" />
            </button>
            {isOpen && (
                <div
                    id={panelId}
                    ref={panelRef}
                    role="group"
                    aria-label={label}
                    className={styles.panel}
                >
                    {options.map((opt) => (
                        <label key={opt.value} className={styles.option}>
                            {opt.label}
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={selected.includes(opt.value)}
                                onChange={() => onToggle(opt.value)}
                            />
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export const FilterDropdown = memo(FilterDropdownBase) as typeof FilterDropdownBase;
