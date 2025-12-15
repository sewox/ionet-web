import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useData();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Makale Bulunamadı</h2>
              <Link to="/blog" className="text-primary hover:underline">Blog'a Dön</Link>
          </div>
      );
  }

  // Related posts logic (simple slice for demo)
  const relatedPosts = blogPosts.filter(p => p.id !== id).slice(0, 2);

  return (
    <div className="flex flex-col items-center">
        <article className="w-full max-w-[800px] px-6 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded uppercase">{post.category}</span>
                    <span className="text-gray-400 text-xs uppercase font-medium">5 dk okuma</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                    {post.title}
                </h1>
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-500">group</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-900 text-sm">I/ONET Teknoloji Ekibi</span>
                            <span className="text-xs text-gray-500">{post.date}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-primary"><span className="material-symbols-outlined">share</span></button>
                        <button className="p-2 text-gray-400 hover:text-primary"><span className="material-symbols-outlined">bookmark</span></button>
                    </div>
                </div>
            </div>

            <div className="mb-8 rounded-2xl overflow-hidden shadow-sm">
                <img src={post.image} alt={post.title} className="w-full h-auto" />
            </div>

            <div className="prose prose-lg prose-blue max-w-none text-gray-800">
                <p className="font-medium text-xl leading-relaxed mb-6">
                    {post.summary}
                </p>
                {/* Dynamically rendering content, handling basic text or passed html */}
                <div dangerouslySetInnerHTML={{ __html: post.content || "<p>İçerik hazırlanıyor...</p>" }} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-200 cursor-pointer">#{post.category.replace(' ', '')}</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-200 cursor-pointer">#Teknoloji</span>
            </div>

            {/* Feedback */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-bold text-gray-900 text-sm">Bu makaleyi faydalı buldunuz mu?</p>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded shadow-sm border border-gray-200 hover:border-primary text-gray-600 hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-lg">thumb_up</span>
                        <span className="text-sm font-bold">Evet</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded shadow-sm border border-gray-200 hover:border-red-500 text-gray-600 hover:text-red-500 transition-all">
                        <span className="material-symbols-outlined text-lg">thumb_down</span>
                        <span className="text-sm font-bold">Hayır</span>
                    </button>
                </div>
            </div>
        </article>

        {/* Related Articles */}
        <section className="w-full bg-surface-light py-16 mt-8">
            <div className="max-w-[800px] mx-auto px-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">İlgili Makaleler</h3>
                <div className="space-y-6">
                    {relatedPosts.map(rel => (
                         <Link to={`/article/${rel.id}`} key={rel.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 hover:shadow-md transition-all cursor-pointer">
                            <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                                <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-primary text-[10px] font-bold uppercase mb-1">{rel.category}</span>
                                <h4 className="font-bold text-gray-900 mb-1">{rel.title}</h4>
                                <span className="text-xs text-gray-500">{rel.date}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link to="/blog" className="block w-full text-center mt-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors">
                    Tüm Makaleleri Gör
                </Link>
            </div>
        </section>
    </div>
  );
};

export default BlogPost;