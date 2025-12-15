import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Blog: React.FC = () => {
  const { blogPosts } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  // Derive unique categories from available blog posts
  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(p => p.category));
    return ['Tümü', ...Array.from(cats)];
  }, [blogPosts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const categoryMatch = selectedCategory === 'Tümü' || post.category === selectedCategory;
      const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  // Determine featured post (first of filtered) and the rest of the list
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const listPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="flex flex-col">
        <section className="bg-white border-b border-gray-100 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="h-1 w-8 bg-primary rounded-full"></span>
                    <span className="text-primary font-bold text-xs tracking-widest uppercase">Bilgi Merkezi</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Güncel Teknoloji & Haberler</h1>
                <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                    Teknoloji trendleri, derinlemesine sektör analizleri ve I/ONET uzmanlık alanlarıyla ilgili en son gelişmeleri takip edin.
                </p>

                {/* Featured Article */}
                {featuredPost ? (
                    <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                        <div className="lg:w-1/2 h-64 lg:h-auto bg-gray-900 relative">
                            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{backgroundImage: `url('${featuredPost.image}')`}}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-50 text-primary text-xs font-bold px-2 py-1 rounded uppercase">Öne Çıkan</span>
                                <span className="text-gray-400 text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {featuredPost.date}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                                {featuredPost.summary}
                            </p>
                            <Link to={`/article/${featuredPost.id}`} className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                Okumaya Devam Et <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="mt-12 p-10 text-center bg-gray-50 rounded-2xl border border-gray-200">
                        <p className="text-gray-500">Aradığınız kriterlere uygun içerik bulunamadı.</p>
                    </div>
                )}
            </div>
        </section>

        {/* Toolbar */}
        <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${
                                selectedCategory === cat 
                                ? 'bg-primary text-white font-bold' 
                                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Makale veya konu ara..." 
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" 
                    />
                </div>
            </div>
        </section>

        {/* Grid */}
        <section className="bg-background-light py-16">
            <div className="max-w-7xl mx-auto px-6">
                {listPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listPosts.map(post => (
                            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: `url('${post.image}')`}}></div>
                                </div>
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-primary text-xs font-bold uppercase">{post.category}</span>
                                        <span className="text-gray-400 text-xs">{post.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.summary}</p>
                                    <Link to={`/article/${post.id}`} className="text-sm font-bold text-primary flex items-center gap-1 mt-auto">Devamını Oku <span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}

                {listPosts.length > 0 && (
                    <div className="flex justify-center mt-16">
                        <button className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
                            Daha Fazla Yükle
                        </button>
                    </div>
                )}
            </div>
        </section>

        {/* Newsletter */}
        <section className="bg-secondary py-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-white text-3xl font-bold mb-4">Teknoloji Dünyasından Geri Kalmayın</h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">En son trendler, I/ONET haberleri ve derinlemesine teknoloji analizleri için bültenimize abone olun.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input type="email" placeholder="E-posta adresiniz" className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                        Abone Ol
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Blog;