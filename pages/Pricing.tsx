import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="flex flex-col">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="max-w-3xl">
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">FİYATLANDIRMA & MODELLER</span>
                    <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                        Şeffaf ve Ölçeklenebilir <br/>Çözümler
                    </h1>
                    <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                        İşletmeniz için en uygun teknoloji mimarisini ve danışmanlık modelini şeffaf fiyatlarla keşfedin. Gizli maliyet yok, sadece ihtiyacınız olan teknoloji var.
                    </p>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 bg-[radial-gradient(#0f66bd_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Starter */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-2xl group-hover:bg-gray-400 transition-colors"></div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Başlangıç Paketi</h3>
                            <span className="material-symbols-outlined text-gray-400">rocket_launch</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">Küçük işletmeler ve MVP projeleri için ideal.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-gray-900">₺15.000</span>
                            <span className="text-gray-500">/ay</span>
                        </div>
                        <button className="w-full py-3 rounded-lg bg-gray-100 text-gray-900 font-bold mb-8 hover:bg-gray-200 transition-colors">
                            Paketi Seç
                        </button>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Temel Danışmanlık
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Sistem Analizi
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Aylık Raporlama
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <span className="material-symbols-outlined text-gray-300 text-[20px]">cancel</span>
                                <span className="line-through">7/24 Destek</span>
                            </li>
                        </ul>
                    </div>

                    {/* Enterprise - Highlighted */}
                    <div className="bg-white rounded-2xl border-2 border-primary p-8 shadow-xl relative scale-105 z-10 flex flex-col">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-md">
                            En Popüler
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Kurumsal Paket</h3>
                            <span className="material-symbols-outlined text-primary">domain</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">Büyüyen ekipler ve kritik altyapılar için.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-gray-900">₺45.000</span>
                            <span className="text-gray-500">/ay</span>
                        </div>
                        <button className="w-full py-3 rounded-lg bg-primary text-white font-bold mb-8 hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                            Hemen Başlayın
                        </button>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-center gap-3 text-sm text-gray-700 font-semibold">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Tam Kapsamlı Geliştirme
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                7/24 Öncelikli Destek
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Gelişmiş Bakım & Yedekleme
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Güvenlik Denetimi
                            </li>
                        </ul>
                    </div>

                    {/* Custom */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 rounded-t-2xl group-hover:bg-black transition-colors"></div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Özel Çözüm</h3>
                            <span className="material-symbols-outlined text-gray-400">architecture</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">Karmaşık mimariler ve kurumsal ihtiyaçlar.</p>
                        <div className="mb-8 flex items-center h-[40px]">
                            <span className="text-2xl font-black text-gray-900">Teklif Alın</span>
                        </div>
                        <button className="w-full py-3 rounded-lg bg-gray-100 text-gray-900 font-bold mb-8 hover:bg-gray-200 transition-colors">
                            Bize Ulaşın
                        </button>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Özel Mimari Tasarım
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Dedicated (Atanmış) Ekip
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Sınırsız Ölçekleme
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                Yerinde Kurulum & Eğitim
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="mt-8 text-center">
                    <a href="#" className="text-primary text-sm font-semibold hover:underline flex items-center justify-center gap-1">
                        Tüm özellikleri karşılaştır <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>
        </section>

        {/* Why Us (Condensed) */}
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Neden I/ONET?</h2>
                    <p className="text-gray-500 mt-2">Teknoloji mimarlığında güven ve tecrübe ile işinizi geleceğe taşıyoruz. Sadece kod yazmıyoruz, sistem inşa ediyoruz.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-xl border border-gray-100 bg-surface-light">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                            <span className="material-symbols-outlined">verified</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Şeffaf Süreç</h3>
                        <p className="text-sm text-gray-600">Proje başlangıcından teslime kadar tüm maliyetler, faturalandırma ve süreçler tamamen açıktır.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-gray-100 bg-surface-light">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                            <span className="material-symbols-outlined">engineering</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Uzman Kadro</h3>
                        <p className="text-sm text-gray-600">Alanında uzman mühendisler, sertifikalı teknoloji mimarları ve danışmanlar ile çalışırsınız.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-gray-100 bg-surface-light">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Ölçeklenebilir Yapı</h3>
                        <p className="text-sm text-gray-600">Bugünün ihtiyaçlarını karşılarken yarının büyüme hedeflerine uyum sağlayan esnek altyapılar.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background-light border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Sıkça Sorulan Sorular</h2>
                <div className="space-y-4">
                    <details className="group bg-white rounded-lg border border-gray-200 p-4 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between text-gray-900 font-medium">
                            <span>Fiyatlandırmaya KDV dahil mi?</span>
                            <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180 text-gray-400">expand_more</span>
                        </summary>
                        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                            Hayır, belirtilen fiyatlara KDV dahil değildir. Faturalandırma süreçleri ve vergilendirme detayları için teklif aşamasında detaylı bilgi verilmektedir.
                        </p>
                    </details>
                    <details className="group bg-white rounded-lg border border-gray-200 p-4 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between text-gray-900 font-medium">
                            <span>Paket değişikliği yapabilir miyim?</span>
                            <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180 text-gray-400">expand_more</span>
                        </summary>
                        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                            Evet, projenizin ihtiyaçları değiştikçe bir üst pakete geçiş yapabilir veya mevcut paketinizi ihtiyacınıza göre özelleştirebilirsiniz. Esneklik temel prensibimizdir.
                        </p>
                    </details>
                    <details className="group bg-white rounded-lg border border-gray-200 p-4 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between text-gray-900 font-medium">
                            <span>Sözleşme süresi ne kadar?</span>
                            <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180 text-gray-400">expand_more</span>
                        </summary>
                        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                            Başlangıç ve Kurumsal paketlerimiz aylık abonelik bazlıdır ve istediğiniz zaman iptal edebilirsiniz. Özel çözümler proje bazlı olup, sözleşme süreleri projenin kapsamına göre belirlenir.
                        </p>
                    </details>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Pricing;