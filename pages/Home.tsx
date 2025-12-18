import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useContent } from '../hooks/useContent';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { getContent } = useContent();
  const { homeFeatures, homeServices, blogPosts } = useData() as any;

  const defaultFeatures = [
    { title: 'Stratejik Planlama', description: 'İş hedeflerinize uygun, uzun vadeli ve sürdürülebilir teknoloji yol haritaları.', icon: 'hub' },
    { title: 'Güvenlik Mimarisi', description: 'Her katmanda proaktif güvenlik önlemleri ile verinizi koruyan sıfır güven (zero trust) yaklaşımı.', icon: 'security' },
    { title: 'Ölçeklenebilirlik', description: 'Büyüyen iş hacminize anında yanıt veren, esnek ve performanslı sistem tasarımı.', icon: 'speed' }
  ];

  const defaultServices = [
    { id: '1', title: 'Altyapı Hizmetleri', description: 'Kurumsal ağ tasarımı, sunucu sanallaştırma, veri merkezi kurulumu ve yönetimi ile kesintisiz operasyon.', icon: 'dns', link: '/infrastructure', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDb44wifGxcujhVd_6qIMvI2J-P9DDBY_YwMHOpz7At-JG-aueLwrdGJPkwN87oyZtLQBvXK6p8-eY38c8wtf7EJ2e-ECMN1okJTNtpfaEs0Gu_3I2HQwhqOc8zzswT2PlW0Ta9uc8TFxfqHsCt8TBsa2YeaW7qZs0wFY1eo-EcbPgsVFa0YEl69QAe9cc1j1Yb0zIJBCf-xYk6DAP70fF0qvTN6KnPCD7kWkbMQst3mtAUJ2P9uvWp8f3TCsJ4kwhTFDOIhXbc-7j' },
    { id: '2', title: 'Yazılım Çözümleri', description: 'İş süreçlerinize özel geliştirilen yazılımlar, API entegrasyonları ve modern uygulama modernizasyonu.', icon: 'terminal', link: '/infrastructure', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApZJQbdHDx1gF46PqLr8Vu0HVtKqApfugb2aIyd8GbDAzYSPniVLqk3fK5tn4FDAbfaQmI-5m1Ld28D4MViJuqXXGITi562c6J0O34VlQKD7clk7JO8aabJwzYRxYO_C3SqOGW8fMh1y8truqi5LJ3xkBQ1hrmhZccWQ2b-dNQBl6Yp-U8re5gkHbmYjhCx_tSkIZILp7PPlvwXlsqjW2g8e2QKdcG4x89SLrZaAAopeDrBSUTxX2IkJm-f6jgYOeVLOKQKOFj6rg0' },
    { id: '3', title: 'Danışmanlık', description: 'Dijital dönüşüm yolculuğunuzda verimlilik artıran, maliyet düşüren stratejik teknoloji danışmanlığı.', icon: 'person_search', link: '/infrastructure', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmr2Bl_80fMPymFAKlqmX0kUVNs2-AHtviiu0sKM_N4pM5ZyhF3AGmJMvixuoqzZKsq8hIz8G502UujlJJRylFmLemRkyVwZm5-rlULf52MyubeG9EnGSgEvLcHmlVSLyuOjcWpeA_hLyRZBdA7HKzJJh0OzMlIe-WpEBfeZUSdWROB_Ba8uABvVbFhEv3tVLKSMgGGKtayn18dnLulgM12MUMEVpMNIHm0qH_3h75MSoPMa2HXSmuDEIBMklpL_TBW5n0e2crRJW' }
  ];

  const displayFeatures = homeFeatures && homeFeatures.length > 0 ? homeFeatures : defaultFeatures;
  const displayServices = homeServices && homeServices.length > 0 ? homeServices : defaultServices;
  const getServiceLink = (link: string) => link || '#';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ionet.com.tr/#organization",
        "name": "I/ONET Teknoloji",
        "url": "https://www.ionet.com.tr",
        "logo": getContent('header_logo_image') || "https://www.ionet.com.tr/logo.png",
        "sameAs": [
          getContent('social_linkedin', 'https://linkedin.com'),
          getContent('social_twitter', 'https://twitter.com'),
          getContent('social_facebook', 'https://facebook.com')
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ionet.com.tr/#website",
        "url": "https://www.ionet.com.tr",
        "name": "I/ONET Teknoloji",
        "publisher": {
          "@id": "https://www.ionet.com.tr/#organization"
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Ana Sayfa"
        canonical="https://www.ionet.com.tr"
        jsonLd={organizationSchema}
        description={getContent('site_description', 'I/ONET Teknoloji - Geleceğin Teknolojisi')}
      />
      <div className="bg-white min-h-screen font-sans text-[#111418]">
        {/* Hero Section */}
        <section className="relative w-full min-h-[600px] flex items-center justify-center bg-secondary pt-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center opacity-40" style={{ backgroundImage: `url('${getContent('home_hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsCBuHLP6gfJpAFeAJTDQ_N7Pl_lmCb4pGQqOgfqOiYGDqTQ_7GWr_HhCui9q-3JkIQoqiIoA2JDtbMKer6PQLAsrrz-Cw1G5hh9Ek-BYJ3VIAvo5wvqwYW03hhe0WQyEiFddR8M0C7pXkolY3DQxfBhjJ6cFyHQ88tpZu0nXGoDXsV1Q0yyjXRDcTUZ93tqO68SiO2D6lMN_OHGjYe9KNW9xfLjqofwU_sBtPu82KSjrxwHnSzhjSG4EGJp_YkE6t-NllVBiYjfF3')}')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
            <div className="max-w-3xl flex flex-col gap-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">{getContent('home_hero_badge', 'Geleceğin Teknolojisi')}</span>
              </div>
              <h1
                className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight [&>p]:inline [&>span]:inline"
                dangerouslySetInnerHTML={{ __html: getContent('home_hero_title', 'Teknolojiyi Sizin İçin <span class="text-primary">Dizayn Ediyoruz.</span>') }}
              />
              <div
                className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mt-4"
                dangerouslySetInnerHTML={{ __html: getContent('home_hero_subtitle', 'Standart çözümlerle yetinmeyen işletmeler için sürdürülebilir, güvenli ve ölçeklenebilir altyapı mimarisi kurguluyoruz.') }}
              />
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to={getContent('home_hero_btn1_url', '/infrastructure')} className="flex items-center justify-center gap-2 h-12 px-8 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-lg transition-all shadow-lg shadow-primary/25">
                  <span>{getContent('home_hero_btn1_text', 'Mimarimizle Tanışın')}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
                <Link to={getContent('home_hero_btn2_url', '/contact')} className="flex items-center justify-center gap-2 h-12 px-8 bg-white/10 hover:bg-white/20 text-white text-base font-medium rounded-lg backdrop-blur-sm transition-all border border-white/10">
                  {getContent('home_hero_btn2_text', 'Hizmet Kataloğu')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="w-full bg-white py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2
                  className="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4 [&>span]:border-b-4 [&>span]:border-primary/20 [&>span]:text-primary"
                  dangerouslySetInnerHTML={{ __html: getContent('home_motto_title', 'Biz Tamirci Değil, <span class="text-primary border-b-4 border-primary/20">Mimarız.</span>') }}
                />
                <div
                  className="text-gray-600 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: getContent('home_motto_desc', 'İşletmeniz için sadece anlık sorunları çözen değil, geleceği bugünden inşa eden sürdürülebilir teknolojik yapılar kuruyoruz.') }}
                />
              </div>
              <div className="hidden md:block pb-2">
                <span className="material-symbols-outlined text-gray-200 text-6xl">architecture</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayFeatures.map((feature: any) => (
                <div key={feature.id || feature.title} className="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="w-full bg-surface-light py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Uzmanlık Alanlarımız</span>
              <h2 className="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-tight">
                {getContent('home_services_title', 'Teknoloji Ekosisteminizi Yönetiyoruz')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayServices.map((service: any, index: number) => (
                <div key={service.id || index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
                    {/* Fallback image logic or dynamic image if added in future. Using static images for now based on index or default */}
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${service.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"}')` }}></div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      <span className="material-symbols-outlined text-primary">{service.icon}</span>
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </div>
                    <Link to={service.link || '/infrastructure'} className="text-primary text-sm font-bold inline-flex items-center group-hover:gap-2 transition-all">
                      Detaylı İncele <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Teaser */}
        <section className="w-full bg-white py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Teknoloji Gündemi</span>
                <h2 className="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-tight">
                  Son Blog Yazıları
                </h2>
                <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                  Dijital dönüşüm, altyapı trendleri ve teknoloji dünyasından en güncel analizler.
                </p>
              </div>
              <Link to="/blog" className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-light text-gray-900 font-semibold hover:bg-primary hover:text-white transition-all duration-300 group">
                Tüm Yazıları Gör
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(blogPosts && blogPosts.length > 0 ? blogPosts.slice(0, 3) : [
                { id: '1', title: 'Modern Veri Merkezlerinde Enerji Verimliliği ve Sürdürülebilirlik', category: 'Altyapı', date: '14 Ekim 2024', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmr2Bl_80fMPymFAKlqmX0kUVNs2-AHtvii0sKM_N4pM5ZyhF3AGmJMvixuoqzZKsq8hIz8G502UujlJJRylFmLemRkyVwZm5-rlULf52MyubeG9EnGSgEvLcHmlVSLyuOjcWpeA_hLyRZBdA7HKzJJh0OzMlIe-WpEBfeZUSdWROB_Ba8uABvVbFhEv3tVLKSMgGGKtayn18dnLulgM12MUMEVpMNIHm0qH_3h75MSoPMa2HXSmuDEIBMklpL_TBW5n0e2crYRJX' },
                { id: '2', title: 'Zero Trust Mimarisi: Kurumsal Ağınızı Geleceğe Hazırlayın', category: 'Siber Güvenlik', date: '28 Eylül 2024', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApZJQbdHDx1gF46PqLr8Vu0HVtKqApfugb2aIyd8GbDAzYSPniVLqk3fK5tn4FDAbfaQmI-5m1Ld28D4MViJuqXXGITi562c6J0O34VlQKD7clk7JO8aabJwzYRxYO_C3SqOGW8fMh1y8truqi5LJ3xkBQ1hrmhZccWQ2b-dNQBl6Yp-U8re5gkHbmYjhCx_tSkIZILp7PPlvwXlsqjW2g8e2QKdcG4x89SLrZaAAopeDrBSUTxX2IkJm-f6jgYOeVLOKQKOFj6rg0' },
                { id: '3', title: 'Mikroservis Dönüşümü: Monolitik Yapılardan Çıkış Stratejileri', category: 'Yazılım', date: '15 Eylül 2024', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDb44wifGxcujhVd_6qIMvI2J-P9DDBY_YwMHOpz7At-JG-aueLwrdGJPkwN87oyZtLQBvXK6p8-eY38c8wtf7EJ2e-ECMN1okJTNtpfaEs0Gu_3I2HQwhqOc8zzswT2PlW0Ta9uc8TFxfqHsCt8TBsa2YeaW7qZs0wFY1eo-EcbPgsVFa0YEl69QAe9cc1j1Yb0zIJBCf-xYk6DAP70fF0qvTN6KnPCD7kWkbMQst3mtAUJ2P9uvWp8f3TCsJ4kwhTFDOIhXbc-7j' }
              ]).map((post: any) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${post.image || "https://images.unsplash.com/photo-1499750310159-5b5722198031?q=80&w=2670&auto=format&fit=crop"}')` }}></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-primary font-bold text-sm mt-auto group/link">
                      Devamını Oku
                      <span className="material-symbols-outlined text-[18px] ml-1 group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-white py-20 border-t border-gray-100">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="bg-gradient-to-br from-secondary to-gray-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[200px] text-white">hub</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 relative z-10">
                {getContent('home_cta_title', 'Projenizi Mimar Gözüyle Değerlendirelim')}
              </h2>
              <div
                className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10"
                dangerouslySetInnerHTML={{ __html: getContent('home_cta_desc', 'Mevcut altyapınızı analiz edelim, eksikleri belirleyelim ve işletmenizi geleceğe taşıyacak yol haritasını birlikte çizelim.') }}
              />
              <Link to={getContent('home_cta_btn_url', '/contact')} className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 relative z-10 inline-block">
                {getContent('home_cta_btn_text', 'Ücretsiz Ön Görüşme Planla')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;