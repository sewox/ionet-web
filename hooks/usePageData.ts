// src/hooks/usePageData.ts
// Custom hook for lazy loading page-specific data

import { useEffect, useState } from 'react';

const API_BASE = ((import.meta as any).env.VITE_BASE_PATH || '/').replace(/\/$/, '');

export function usePageData<T>(endpoint: string, dependencies: any[] = []): {
    data: T[];
    loading: boolean;
    error: string | null;
} {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const url = `${API_BASE}${endpoint}`;
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                }

                const json = await res.json();

                if (mounted) {
                    setData(json);
                    setError(null);
                }
            } catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                    setData([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, dependencies);

    return { data, loading, error };
}

// Example usage in a component:
// const { data: blogPosts, loading } = usePageData<BlogPost>('/v1/blog_posts');
