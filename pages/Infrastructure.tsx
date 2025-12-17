import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useContent } from '../hooks/useContent';
import { useData } from '../context/DataContext';

const Infrastructure: React.FC = () => {
    const { getContent } = useContent();
    const { infraFeatures, techPartners } = useData() as any;

    const defaultFeatures = [
        {
            title: 'Sunucu Yönetimi ve Optimizasyon',
            description: 'Fiziksel ve sanal sunucularınızın performansını maksimize ediyoruz. Düzenli bakım, yama yönetimi ve kaynak optimizasyonu ile donanım ömrünü uzatıyor, maliyetlerinizi düşürüyoruz.',
            icon: 'storage',
            points: 'Sanallaştırma (VMware / Hyper-V)\nLinux & Windows Server Yönetimi'
        },
        {
            title: 'Ağ ve Güvenlik Çözümleri',
            description: 'Kurumsal ağınızın omurgasını güçlendiriyoruz. SD-WAN teknolojileri, yeni nesil güvenlik duvarları ve switch konfigürasyonları ile kesintisiz ve güvenli veri akışı sağlıyoruz.',
            icon: 'hub',
            points: 'LAN / WAN / Wi-Fi Planlama\nFirewall ve VPN Kurulumu'
        }
    ];

    const defaultPartners = [
        { name: 'Microsoft', icon: 'grid_view' },
        { name: 'AWS', icon: 'cloud' },
        { name: 'Cisco', icon: 'router' },
        { name: 'VMware', icon: 'memory' },
        { name: 'Oracle', icon: 'database' },
    ];

    const displayFeatures = infraFeatures && infraFeatures.length > 0 ? infraFeatures : defaultFeatures;
    const displayPartners = techPartners && techPartners.length > 0 ? techPartners : defaultPartners;
    return (

        <>
            <SEO title="Altyapı" description="Kurumsal altyapı çözümleri." />
            <div className="flex flex-col">
                {/* Hero */}
                <section className="relative w-full py-20 bg-secondary overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(#127ae2 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm mb-6">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">{getContent('infra_hero_badge_title', 'Altyapı & Yönetim')}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                                {getContent('infra_hero_title', 'İşletmenizin Dijital Omurgasını Güçlendiriyoruz')}
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                {getContent('infra_hero_desc', 'Kesintisiz, güvenli ve yüksek performanslı BT altyapı çözümleri ile operasyonel verimliliğinizi maksimize ediyoruz.')}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#features" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                                    Çözümlerimiz
                                    <span className="material-symbols-outlined">arrow_downward</span>
                                </a>
                                <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-all border border-white/10">
                                    Teklif Alın
                                </Link>
                            </div>
                        </div>
                        <div className="relative lg:h-[500px] flex items-center justify-center animate-fade-in">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform scale-75"></div>
                            <img
                                src={getContent('infra_hero_img', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop')}
                                alt="Infrastructure"
                                className="relative z-10 rounded-2xl shadow-2xl border border-gray-700/50 w-full h-full object-cover"
                            />
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl z-20 max-w-[200px] hidden md:block">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">{getContent('infra_hero_badge_title', 'Sptime Garantisi')}</span>
                                </div>
                                <p className="text-xs text-gray-500">{getContent('infra_hero_badge_desc', '%99.9 Uptime ile iş sürekliliğinizi garanti altına alıyoruz.')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 bg-surface-light">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Hizmetlerimiz</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{getContent('infra_features_title', 'Uçtan Uca Altyapı Yönetimi')}</h2>
                            <p className="text-gray-600 text-lg">
                                {getContent('infra_features_desc', 'Modern işletmelerin ihtiyaç duyduğu tüm teknoloji katmanlarında uzman desteği sağlıyoruz.')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayFeatures.map((feature: any, index: number) => (
                                <div key={feature.id || index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-2 border-t border-gray-50 pt-4">
                                        {feature.points && feature.points.split('\n').map((point: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                                                <span className="material-symbols-outlined text-[16px] text-green-500 shrink-0">check</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Partners */}
                <section className="py-20 bg-white border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-gray-900">{getContent('infra_partners_title', 'Teknoloji Partnerlerimiz')}</h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Fallback partners - ideally these should be images/logos */}
                            {displayPartners.map((partner: any) => (
                                <div key={partner.id || partner.name} className="flex items-center gap-2 text-xl font-bold text-gray-400 hover:text-primary transition-colors cursor-default">
                                    <span className="material-symbols-outlined">{partner.icon}</span>
                                    <span>{partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-surface-light">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="bg-secondary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
                            <div className="relative z-10">
                                <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">
                                    {getContent('infra_cta_badge', 'Ücretsiz Analiz')}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    {getContent('infra_cta_title', 'Altyapınız Ne Kadar Güçlü?')}
                                </h2>
                                <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
                                    {getContent('infra_cta_desc', 'Mevcut sistemlerinizi ücretsiz analiz edelim, riskleri ve iyileştirme fırsatlarını raporlayalım.')}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1">
                                        {getContent('infra_cta_btn1_text', 'Analiz Talep Et')}
                                    </Link>
                                    <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10">
                                        {getContent('infra_cta_btn2_text', 'Bize Ulaşın')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Infrastructure;