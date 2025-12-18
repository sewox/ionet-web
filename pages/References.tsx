import React from 'react';
import { useData } from '../context/DataContext';
import { useContent } from '../hooks/useContent';
import SEO from '../components/SEO';

const References: React.FC = () => {
    const { projects, testimonials } = useData() as any;
    const { getContent } = useContent();

    return (
        <>
            <SEO title="Referanslar" description="Referanslarımız ve başarı hikayelerimiz." />
            <div className="flex flex-col">
                {/* Hero */}
                <section className="relative bg-secondary py-20 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(#127ae2 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                        <h1
                            className="text-4xl md:text-6xl font-black text-white mb-6"
                            dangerouslySetInnerHTML={{ __html: getContent('ref_hero_title', 'Sektör Liderleriyle <br/><span class="text-primary">Geleceği İnşa Ediyoruz</span>') }}
                        />
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            {getContent('ref_hero_desc', "Teknoloji mimarı olarak, karmaşık dijital dönüşüm süreçlerinde Türkiye'nin önde gelen kurumlarına rehberlik ediyoruz.")}
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                            <div>
                                <div className="text-3xl font-black text-primary mb-1">{getContent('ref_stat1_val', '50+')}</div>
                                <div className="text-sm text-gray-500 font-medium">{getContent('ref_stat1_label', 'Kurumsal Müşteri')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-primary mb-1">{getContent('ref_stat2_val', '120+')}</div>
                                <div className="text-sm text-gray-500 font-medium">{getContent('ref_stat2_label', 'Tamamlanan Proje')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-primary mb-1">{getContent('ref_stat3_val', '%98')}</div>
                                <div className="text-sm text-gray-500 font-medium">{getContent('ref_stat3_label', 'Müşteri Memnuniyeti')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-primary mb-1">{getContent('ref_stat4_val', '10+')}</div>
                                <div className="text-sm text-gray-500 font-medium">{getContent('ref_stat4_label', 'Sektör Deneyimi')}</div>
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
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${getContent('ref_case_img', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJsn6bTWj6k7J83lxYFQ6EVoXUVI5c119tyy2eYj3DBP2A3Pm16-G5AKaRcCBGg47LuCq2NP0iJZuPaFHfqbuDQaiodbtUSzSgAXEXV7T8n_eWbzY8jlK6AZFZXZpORj6M5DNmTu79kzyjRMjNxSSOA-nwbRCojt_CDCJ_Lyg4CB9brHYW1xkuRX6rs1pLVqbF0wL74wlMpHP0ApF6CkZX50tDi9iODpkIaDVkqpnZCGt15aOj2uwrYmfv4bdXVWMDHxJ7T09jBeSn')}')` }}></div>
                                <div className="absolute bottom-6 left-6 flex gap-2">
                                    {getContent('ref_case_tags', 'FİNANS,SİBER GÜVENLİK').split(',').map((tag: string, i: number) => (
                                        <span key={i} className={`px-3 py-1 ${i === 0 ? 'bg-primary text-white' : 'bg-white/90 backdrop-blur text-gray-900'} text-xs font-bold rounded shadow-lg`}>{tag.trim()}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-2xl">account_balance</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{getContent('ref_case_client', 'Ulusal Finans Grubu')}</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Bankacılık & Finans</p>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                    {getContent('ref_case_title', 'Siber Güvenlik Altyapısının Modernizasyonu')}
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {getContent('ref_case_desc', "200+ şubesi bulunan finans devinin ağ güvenliği mimarisini, I/ONET'in özel geliştirdiği Sıfır Güven (Zero Trust) protokolleriyle yeniden yapılandırdık. Veri işleme hızında kayıp yaşanmadan güvenlik duvarı verimliliği %40 artırıldı.")}
                                </p>
                                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100 mb-8">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{getContent('ref_case_stat1_val', '%99.99')}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">{getContent('ref_case_stat1_label', 'Uptime Garantisi')}</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{getContent('ref_case_stat2_val', '3 Ay')}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">{getContent('ref_case_stat2_label', 'Proje Süresi')}</p>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{getContent('ref_projects_title', 'Referans Projeler')}</h2>
                            <p className="text-lg text-gray-500">{getContent('ref_projects_desc', 'Farklı sektörlerdeki iş ortaklarımız için geliştirdiğimiz özelleştirilmiş çözümler.')}</p>
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
                {testimonials && testimonials.length > 0 && (
                    <section className="bg-secondary text-white py-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-[200px]">format_quote</span>
                        </div>
                        {/* Carousel logic would be better here, but for now simple structure or just first one */}
                        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                            <h2 className="text-3xl md:text-4xl font-medium italic leading-relaxed mb-10">
                                "{testimonials[0].quote}"
                            </h2>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full border-2 border-primary mb-4 overflow-hidden">
                                    <img src={testimonials[0].image} alt={testimonials[0].name} className="w-full h-full object-cover" />
                                </div>
                                <div className="font-bold text-lg">{testimonials[0].name}</div>
                                <div className="text-gray-400 text-sm">{testimonials[0].title}</div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="bg-primary py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">{getContent('ref_cta_title', 'Sıradaki Başarı Hikayesi Sizin Olsun')}</h2>
                        <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                            {getContent('ref_cta_desc', 'Teknoloji altyapınızı güçlendirmek ve dijital dönüşüm yolculuğunuzda güvenilir bir partnerle ilerlemek için bizimle iletişime geçin.')}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-primary font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-gray-50 transition-all">
                                {getContent('ref_cta_btn1_text', 'Bizimle İletişime Geçin')}
                            </button>
                            <button className="bg-primary-dark border border-white/20 text-white font-bold py-4 px-10 rounded-lg hover:bg-blue-800 transition-all">
                                {getContent('ref_cta_btn2_text', 'Hizmetlerimizi İnceleyin')}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default References;