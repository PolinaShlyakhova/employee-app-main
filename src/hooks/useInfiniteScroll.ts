import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useInfiniteScroll(
    sentinelRef: RefObject<HTMLElement | null>,
    onLoadMore: () => void,
    hasMore: boolean,
    loading: boolean
) {
    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || !hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) onLoadMore();
            },
            { rootMargin: '200px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [sentinelRef, onLoadMore, hasMore, loading]);
}
