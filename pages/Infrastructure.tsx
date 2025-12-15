import React from 'react';
import { Link } from 'react-router-dom';

const Infrastructure: React.FC = () => {
  return (
    <div className="flex flex-col">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary">Anasayfa</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <Link to="/services" className="hover:text-primary">Hizmetler</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="font-semibold text-primary">Altyapı Çözümleri</span>
                </div>
            </div>
        </div>

        {/* Hero */}
        <section className="bg-white py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            Geleceğin <span className="text-primary">Altyapısını</span> İnşa Ediyoruz
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            İş sürekliliğinizi garanti altına alan, ölçeklenebilir ve güvenli sistem mimarisi tasarlıyoruz. I/ONET ile teknolojik altyapınızı modernize edin.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-200 transition-all">
                                Uzmanlarımızla Görüşün
                            </button>
                            <button className="bg-white border border-gray-200 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all">
                                Çözümleri Keşfedin
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative rounded-2xl bg-surface-light p-2 shadow-xl ring-1 ring-gray-100">
                             <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative group">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhCMjth5vqj6iD3z9xOT0humbWStYdT4kTUMKj5CX2zpNmsxuSYopR7Bm1gDOLhEf23_Cbn0Sc2-3bOLHRrM5My6wP-D42BPtFE3HERT_HBd_bAxlJIqcIZKlM653n3oaFm2Vkd0XbKeG6q-8ZxMx3jw9HggVyAekJsgMZmp5QAVPfXmIZzZ-1sLuInqMeADedTGkNxLBOPLSPOJCwkEocUcxfg4ELqNJn_9tli5k0yI6qmiaQZZCMYGDFcxRxeYA6yqbVWZu8kMQq')"}}></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
                             </div>
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">%99.9 Uptime</p>
                                    <p className="text-xs text-gray-500">Garantili Süreklilik</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Grid */}
        <section className="bg-surface-light py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Hizmet Kapsamımız</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kurumunuzun ihtiyaçlarına özel, uçtan uca altyapı yönetimi ve entegrasyon hizmetleri.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="size-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl">storage</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Sunucu Yönetimi ve Optimizasyon</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Fiziksel ve sanal sunucularınızın performansını maksimize ediyoruz. Düzenli bakım, yama yönetimi ve kaynak optimizasyonu ile donanım ömrünü uzatıyor, maliyetlerinizi düşürüyoruz.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> Sanallaştırma (VMware / Hyper-V)</li>
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> Linux & Windows Server Yönetimi</li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="size-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl">hub</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Ağ ve Güvenlik Çözümleri</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Kurumsal ağınızın omurgasını güçlendiriyoruz. SD-WAN teknolojileri, yeni nesil güvenlik duvarları ve switch konfigürasyonları ile kesintisiz ve güvenli veri akışı sağlıyoruz.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> LAN / WAN / Wi-Fi Planlama</li>
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> Firewall ve VPN Kurulumu</li>
                        </ul>
                    </div>

                     {/* Card 3 */}
                     <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="size-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl">cloud_sync</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Bulut ve Hibrit Entegrasyon</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Yerel sistemlerinizi bulutun esnekliğiyle birleştiriyoruz. AWS, Azure veya özel bulut çözümleriyle veri yedekliliği ve erişilebilirlik standartlarınızı yükseltiyoruz.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> Bulut Migrasyon Stratejileri</li>
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> Disaster Recovery (Felaket Kurtarma)</li>
                        </ul>
                    </div>

                     {/* Card 4 */}
                     <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="size-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl">domain</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Veri Merkezi Hizmetleri</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Kritik sistemleriniz için modern veri merkezi altyapısı kuruyoruz. Soğutma, güç yönetimi ve kablolama standartlarına uygun, sürdürülebilir sistem odaları tasarlıyoruz.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> Sistem Odası Tasarımı</li>
                            <li className="flex items-center gap-2 text-sm text-gray-600"><span className="material-symbols-outlined text-primary text-sm">check</span> Ortam İzleme Sistemleri</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Tech Stack Bar */}
        <section className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">TEKNOLOJİ İŞ ORTAKLARIMIZ</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Using text representation for tech stack logos to avoid external images dependency if needed, but styling them like logos */}
                    <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">grid_view</span> Microsoft</span>
                    <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">cloud</span> AWS</span>
                    <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">router</span> Cisco</span>
                    <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">memory</span> VMware</span>
                    <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">database</span> Oracle</span>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm mb-6">
                    Hemen Başlayın
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    Altyapınızı Modernleştirmeye <br className="hidden md:block"/> Hazır Mısınız?
                </h2>
                <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                    Mevcut sistemlerinizin analizini yapalım, size en uygun modernizasyon yol haritasını birlikte belirleyelim.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition-all">
                        Ücretsiz Analiz Talep Edin
                    </button>
                    <button className="bg-transparent border border-gray-700 text-white font-bold py-4 px-8 rounded-lg hover:bg-white/5 transition-all">
                        İletişime Geçin
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Infrastructure;