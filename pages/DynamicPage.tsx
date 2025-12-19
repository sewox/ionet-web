import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Page } from '../context/DataContext';

const DynamicPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(`ionet-web/api/pages/slug/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setPage(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !page) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-black text-gray-900 mb-8">{page.title}</h1>
                <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
        </div>
    );
};

export default DynamicPage;
