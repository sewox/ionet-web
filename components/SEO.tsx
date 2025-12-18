import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    canonical?: string;
    jsonLd?: any;
    robots?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url, canonical, jsonLd, robots }) => {
    const { siteSettings } = useData();

    const getContent = (key: string, defaultValue: string = '') => {
        return siteSettings.find(s => s.ckey === key)?.value || defaultValue;
    };

    const siteTitle = getContent('site_title', 'I/ONET Teknoloji');
    const fullTitle = `${title} | ${siteTitle}`;
    const defaultDescription = getContent('site_description', 'I/ONET Teknoloji - Geleceğin Teknolojisi');
    const defaultKeywords = getContent('site_keywords', 'teknoloji, yazılım, siber güvenlik, bulut bilişim, altyapı');
    const defaultImage = getContent('site_og_image', '');

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            {robots && <meta name="robots" content={robots} />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* OG Tags */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content="website" />
            {url && <meta property="og:url" content={url} />}
            {(image || defaultImage) && <meta property="og:image" content={image || defaultImage} />}

            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {(image || defaultImage) && <meta name="twitter:image" content={image || defaultImage} />}

            {/* Structured Data */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
