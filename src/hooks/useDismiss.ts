import { useEffect } from 'react';
import type { RefObject } from 'react';

export type DismissReason = 'outside' | 'escape';

export function useDismiss<T extends HTMLElement>(
    ref: RefObject<T | null>,
    onDismiss: (reason: DismissReason) => void,
    active: boolean
) {
    useEffect(() => {
        if (!active) return;

        const handlePointer = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) onDismiss('outside');
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onDismiss('escape');
        };

        document.addEventListener('mousedown', handlePointer);
        document.addEventListener('touchstart', handlePointer);
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('mousedown', handlePointer);
            document.removeEventListener('touchstart', handlePointer);
            document.removeEventListener('keydown', handleKey);
        };
    }, [ref, onDismiss, active]);
}
