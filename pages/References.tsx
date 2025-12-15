import React from 'react';
import { useData } from '../context/DataContext';

const References: React.FC = () => {
  const { projects } = useData();

  return (
    <div className="flex flex-col">
        {/* Hero */}
        <section className="relative bg-secondary py-20 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: "radial-gradient(#127ae2 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Sektör Liderleriyle <br/><span className="text-primary">Geleceği İnşa Ediyoruz</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Teknoloji mimarı olarak, karmaşık dijital dönüşüm süreçlerinde Türkiye'nin önde gelen kurumlarına rehberlik ediyoruz.
                </p>
            </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                    <div>
                        <div className="text-3xl font-black text-primary mb-1">50+</div>
                        <div className="text-sm text-gray-500 font-medium">Kurumsal Müşteri</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-primary mb-1">120+</div>
                        <div className="text-sm text-gray-500 font-medium">Tamamlanan Proje</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-primary mb-1">%98</div>
                        <div className="text-sm text-gray-500 font-medium">Müşteri Memnuniyeti</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-primary mb-1">10+</div>
                        <div className="text-sm text-gray-500 font-medium">Sektör Deneyimi</div>
                    </div>
                </div>
            </div>
        </section>

        {/* Featured Case Study */}
        <section className="py-20 bg-surface-light">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold text-gray-900">Öne Çıkan Başarı Hikayesi</h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row group hover:shadow-lg transition-all">
                    <div className="lg:w-1/2 relative min-h-[300px]">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJsn6bTWj6k7J83lxYFQ6EVoXUVI5c119tyy2eYj3DBP2A3Pm16-G5AKaRcCBGg47LuCq2NP0iJZuPaFHfqbuDQaiodbtUSzSgAXEXV7T8n_eWbzY8jlK6AZFZXZpORj6M5DNmTu79kzyjRMjNxSSOA-nwbRCojt_CDCJ_Lyg4CB9brHYW1xkuRX6rs1pLVqbF0wL74wlMpHP0ApF6CkZX50tDi9iODpkIaDVkqpnZCGt15aOj2uwrYmfv4bdXVWMDHxJ7T09jBeSn')"}}></div>
                        <div className="absolute bottom-6 left-6 flex gap-2">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded shadow-lg">FİNANS</span>
                            <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold rounded shadow-lg">SİBER GÜVENLİK</span>
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">account_balance</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Ulusal Finans Grubu</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Bankacılık & Finans</p>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                            Siber Güvenlik Altyapısının Modernizasyonu
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            200+ şubesi bulunan finans devinin ağ güvenliği mimarisini, I/ONET'in özel geliştirdiği Sıfır Güven (Zero Trust) protokolleriyle yeniden yapılandırdık. Veri işleme hızında kayıp yaşanmadan güvenlik duvarı verimliliği %40 artırıldı.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100 mb-8">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">%99.99</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Uptime Garantisi</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">3 Ay</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Proje Süresi</p>
                            </div>
                        </div>
                        <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all self-start">
                            Vaka Analizini Oku <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Project Grid */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Referans Projeler</h2>
                    <p className="text-lg text-gray-500">Farklı sektörlerdeki iş ortaklarımız için geliştirdiğimiz özelleştirilmiş çözümler.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(project => (
                        <div key={project.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-2xl">domain</span>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded">{project.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-1">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 border-t border-gray-100 pt-4 mt-auto">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    Başarı ile tamamlandı
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonial */}
        <section className="bg-secondary text-white py-24 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[200px]">format_quote</span>
            </div>
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-medium italic leading-relaxed mb-10">
                    "I/ONET ekibi, projemizi sadece teknik bir iş olarak görmedi, iş süreçlerimizi anlayan gerçek bir partner gibi hareket etti. Karmaşık altyapımızı modernleştirirken gösterdikleri profesyonellik etkileyiciydi."
                </h2>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-2 border-primary mb-4 overflow-hidden">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy_iwk1E2m95cFTSHR4niD-Cou_RWQ2utdlQJNmI-752_OqQB5QIvEEebb-ACauOkYfrAcpRamz5Qfut1paT8eM3aRhKJeBSkBmNK1o8lIry6ZnH8dpv-vPBxE7s5g5FQ_9a0YOPI3qJjbDRuuVOM3JQ4GQlsaCeRyCTYNX1xIS9xt0POFuLc6vonJMU99W_PyL6kNIWrDY_Erut15yicTq-uPR6bZI_spSCodjAZNEZf6xLtZ2E5k6fVwxDbS7gqn1wi_kmA6pJW8" alt="Ahmet Yılmaz" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold text-lg">Ahmet Yılmaz</div>
                    <div className="text-gray-400 text-sm">CTO, Ulusal Finans Grubu</div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">Sıradaki Başarı Hikayesi Sizin Olsun</h2>
                <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                    Teknoloji altyapınızı güçlendirmek ve dijital dönüşüm yolculuğunuzda güvenilir bir partnerle ilerlemek için bizimle iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-white text-primary font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-gray-50 transition-all">
                        Bizimle İletişime Geçin
                    </button>
                    <button className="bg-primary-dark border border-white/20 text-white font-bold py-4 px-10 rounded-lg hover:bg-blue-800 transition-all">
                        Hizmetlerimizi İnceleyin
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default References;