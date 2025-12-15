import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] flex items-center justify-center bg-secondary pt-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsCBuHLP6gfJpAFeAJTDQ_N7Pl_lmCb4pGQqOgfqOiYGDqTQ_7GWr_HhCui9q-3JkIQoqiIoA2JDtbMKer6PQLAsrrz-Cw1G5hh9Ek-BYJ3VIAvo5wvqwYW03hhe0WQyEiFddR8M0C7pXkolY3DQxfBhjJ6cFyHQ88tpZu0nXGoDXsV1Q0yyjXRDcTUZ93tqO68SiO2D6lMN_OHGjYe9KNW9xfLjqofwU_sBtPu82KSjrxwHnSzhjSG4EGJp_YkE6t-NllVBiYjfF3')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-3xl flex flex-col gap-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Geleceğin Teknolojisi</span>
            </div>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
              Teknolojiyi Sizin İçin <span className="text-primary">Dizayn Ediyoruz.</span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              Standart çözümlerle yetinmeyen işletmeler için sürdürülebilir, güvenli ve ölçeklenebilir altyapı mimarisi kurguluyoruz.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/infrastructure" className="flex items-center justify-center gap-2 h-12 px-8 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-lg transition-all shadow-lg shadow-primary/25">
                <span>Mimarimizle Tanışın</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link to="/pricing" className="flex items-center justify-center gap-2 h-12 px-8 bg-white/10 hover:bg-white/20 text-white text-base font-medium rounded-lg backdrop-blur-sm transition-all border border-white/10">
                Hizmet Kataloğu
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
              <h2 className="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
                Biz Tamirci Değil, <span className="text-primary border-b-4 border-primary/20">Mimarız.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                İşletmeniz için sadece anlık sorunları çözen değil, geleceği bugünden inşa eden sürdürülebilir teknolojik yapılar kuruyoruz.
              </p>
            </div>
            <div className="hidden md:block pb-2">
              <span className="material-symbols-outlined text-gray-200 text-6xl">architecture</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px]">strategy</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Stratejik Planlama</h3>
              <p className="text-gray-600 leading-relaxed">
                İş hedeflerinize uygun, uzun vadeli teknoloji haritası çıkararak yatırımlarınızı en verimli şekilde yönetmenizi sağlıyoruz.
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px]">security</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Güvenlik Mimarisi</h3>
              <p className="text-gray-600 leading-relaxed">
                Siber tehditlere karşı proaktif, çok katmanlı ve sürekli güncellenen güvenlik duvarları ile verilerinizi koruma altına alıyoruz.
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px]">trending_up</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ölçeklenebilirlik</h3>
              <p className="text-gray-600 leading-relaxed">
                Büyüyen iş hacminize sorunsuz uyum sağlayan, esnek ve modüler altyapılar tasarlayarak performans kaybını önlüyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full bg-surface-light py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Uzmanlık Alanlarımız</span>
            <h2 className="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Teknoloji Ekosisteminizi Yönetiyoruz
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDb44wifGxcujhVd_6qIMvI2J-P9DDBY_YwMHOpz7At-JG-aueLwrdGJPkwN87oyZtLQBvXK6p8-eY38c8wtf7EJ2e-ECMN1okJTNtpfaEs0Gu_3I2HQwhqOc8zzswT2PlW0Ta9uc8TFxfqHsCt8TBsa2YeaW7qZs0wFY1eo-EcbPgsVFa0YEl69QAe9cc1j1Yb0zIJBCf-xYk6DAP70fF0qvTN6KnPCD7kWkbMQst3mtAUJ2P9uvWp8f3TCsJ4kwhTFDOIhXbc-7j')" }}></div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Altyapı Hizmetleri</h3>
                  <span className="material-symbols-outlined text-primary">dns</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Kurumsal ağ tasarımı, sunucu sanallaştırma, veri merkezi kurulumu ve yönetimi ile kesintisiz operasyon.
                </p>
                <Link to="/infrastructure" className="text-primary text-sm font-bold inline-flex items-center group-hover:gap-2 transition-all">
                  Detaylı İncele <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </Link>
              </div>
            </div>
            {/* Service 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApZJQbdHDx1gF46PqLr8Vu0HVtKqApfugb2aIyd8GbDAzYSPniVLqk3fK5tn4FDAbfaQmI-5m1Ld28D4MViJuqXXGITi562c6J0O34VlQKD7clk7JO8aabJwzYRxYO_C3SqOGW8fMh1y8truqi5LJ3xkBQ1hrmhZccWQ2b-dNQBl6Yp-U8re5gkHbmYjhCx_tSkIZILp7PPlvwXlsqjW2g8e2QKdcG4x89SLrZaAAopeDrBSUTxX2IkJm-f6jgYOeVLOKQKOFj6rg0')" }}></div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Yazılım Çözümleri</h3>
                  <span className="material-symbols-outlined text-primary">terminal</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  İş süreçlerinize özel geliştirilen yazılımlar, API entegrasyonları ve modern uygulama modernizasyonu.
                </p>
                <Link to="/infrastructure" className="text-primary text-sm font-bold inline-flex items-center group-hover:gap-2 transition-all">
                  Detaylı İncele <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </Link>
              </div>
            </div>
            {/* Service 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmr2Bl_80fMPymFAKlqmX0kUVNs2-AHtviiu0sKM_N4pM5ZyhF3AGmJMvixuoqzZKsq8hIz8G502UujlJJRylFmLemRkyVwZm5-rlULf52MyubeG9EnGSgEvLcHmlVSLyuOjcWpeA_hLyRZBdA7HKzJJh0OzMlIe-WpEBfeZUSdWROB_Ba8uABvVbFhEv3tVLKSMgGGKtayn18dnLulgM12MUMEVpMNIHm0qH_3h75MSoPMa2HXSmuDEIBMklpL_TBW5n0e2crYRJX')" }}></div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Teknoloji Danışmanlığı</h3>
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Dijital dönüşüm stratejileri, BT risk yönetimi, uyumluluk danışmanlığı ve süreç optimizasyonu.
                </p>
                <Link to="/infrastructure" className="text-primary text-sm font-bold inline-flex items-center group-hover:gap-2 transition-all">
                  Detaylı İncele <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </Link>
              </div>
            </div>
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
            <Link to="/article" className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsCBuHLP6gfJpAFeAJTDQ_N7Pl_lmCb4pGQqOgfqOiYGDqTQ_7GWr_HhCui9q-3JkIQoqiIoA2JDtbMKer6PQLAsrrz-Cw1G5hh9Ek-BYJ3VIAvo5wvqwYW03hhe0WQyEiFddR8M0C7pXkolY3DQxfBhjJ6cFyHQ88tpZu0nXGoDXsV1Q0yyjXRDcTUZ93tqO68SiO2D6lMN_OHGjYe9KNW9xfLjqofwU_sBtPu82KSjrxwHnSzhjSG4EGJp_YkE6t-NllVBiYjfF3')" }}></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  Altyapı
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>14 Ekim 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                  Modern Veri Merkezlerinde Enerji Verimliliği ve Sürdürülebilirlik
                </h3>
                <div className="flex items-center text-primary font-bold text-sm mt-auto group/link">
                  Devamını Oku
                  <span className="material-symbols-outlined text-[18px] ml-1 group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </Link>
            <Link to="/article" className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApZJQbdHDx1gF46PqLr8Vu0HVtKqApfugb2aIyd8GbDAzYSPniVLqk3fK5tn4FDAbfaQmI-5m1Ld28D4MViJuqXXGITi562c6J0O34VlQKD7clk7JO8aabJwzYRxYO_C3SqOGW8fMh1y8truqi5LJ3xkBQ1hrmhZccWQ2b-dNQBl6Yp-U8re5gkHbmYjhCx_tSkIZILp7PPlvwXlsqjW2g8e2QKdcG4x89SLrZaAAopeDrBSUTxX2IkJm-f6jgYOeVLOKQKOFj6rg0')" }}></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  Siber Güvenlik
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>28 Eylül 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                  Zero Trust Mimarisi: Kurumsal Ağınızı Geleceğe Hazırlayın
                </h3>
                <div className="flex items-center text-primary font-bold text-sm mt-auto group/link">
                  Devamını Oku
                  <span className="material-symbols-outlined text-[18px] ml-1 group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </Link>
            <Link to="/article" className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDb44wifGxcujhVd_6qIMvI2J-P9DDBY_YwMHOpz7At-JG-aueLwrdGJPkwN87oyZtLQBvXK6p8-eY38c8wtf7EJ2e-ECMN1okJTNtpfaEs0Gu_3I2HQwhqOc8zzswT2PlW0Ta9uc8TFxfqHsCt8TBsa2YeaW7qZs0wFY1eo-EcbPgsVFa0YEl69QAe9cc1j1Yb0zIJBCf-xYk6DAP70fF0qvTN6KnPCD7kWkbMQst3mtAUJ2P9uvWp8f3TCsJ4kwhTFDOIhXbc-7j')" }}></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  Yazılım
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>15 Eylül 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                  Mikroservis Dönüşümü: Monolitik Yapılardan Çıkış Stratejileri
                </h3>
                <div className="flex items-center text-primary font-bold text-sm mt-auto group/link">
                  Devamını Oku
                  <span className="material-symbols-outlined text-[18px] ml-1 group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </Link>
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
              Projenizi Mimar Gözüyle Değerlendirelim
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Mevcut altyapınızı analiz edelim, eksikleri belirleyelim ve işletmenizi geleceğe taşıyacak yol haritasını birlikte çizelim.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 relative z-10">
              Ücretsiz Ön Görüşme Planla
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;