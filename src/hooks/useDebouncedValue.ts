import { useCallback, useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number): [T, () => void] {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    const flush = useCallback(() => setDebounced(value), [value]);

    return [debounced, flush];
}
