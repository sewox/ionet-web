import React from 'react';
import { useData } from '../context/DataContext';

const Legal: React.FC = () => {
    const { legalSections } = useData() as any;

    return (
        <div className="flex flex-col items-center pt-28 pb-10 bg-surface-light min-h-screen">
            <div className="w-full max-w-7xl px-6 flex flex-col lg:flex-row gap-10 items-start">
                {/* Sidebar */}
                <div className="lg:w-64 shrink-0 lg:sticky lg:top-24">
                    <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
                        <h3 className="font-bold text-gray-900 px-4 py-3 border-b border-gray-100 text-xs uppercase tracking-widest">Bu Sayfada</h3>
                        <nav className="flex flex-col text-sm mt-2">
                            {legalSections && legalSections.length > 0 ? (
                                legalSections.map((sec: any) => (
                                    <a
                                        key={sec.id}
                                        href={`#${sec.anchor}`}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-300 transition-colors truncate"
                                        title={sec.title}
                                    >
                                        {sec.title}
                                    </a>
                                ))
                            ) : (
                                <span className="px-4 py-2 text-gray-400 italic">Bölüm bulunamadı.</span>
                            )}
                        </nav>
                    </div>

                    <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                            <span className="material-symbols-outlined">description</span>
                            <span className="font-bold text-sm">Çevrimdışı Okuyun</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Bu sözleşmenin tam metnini cihazınıza pdf olarak indirin.</p>
                        <button className="w-full py-2 bg-white text-primary border border-primary/20 rounded font-bold text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-sm">download</span> PDF İndir
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                            <span className="material-symbols-outlined text-sm">gavel</span>
                            <span>Yasal Sözleşmeler</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Şartlar ve Koşullar</h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            I/ONET dijital varlıklarının, teknoloji çözümlerinin ve hizmetlerinin kullanımına ilişkin yasal çerçeve, haklarınız ve yükümlülükleriniz aşağıda detaylandırılmıştır.
                        </p>
                        <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            <span>Son Güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="p-8 space-y-12">
                        {legalSections && legalSections.length > 0 ? (
                            legalSections.map((sec: any, index: number) => (
                                <section key={sec.id} id={sec.anchor}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                                            {index + 1}
                                        </span>
                                        <h2 className="text-2xl font-bold text-gray-900">{sec.title}</h2>
                                    </div>
                                    <div
                                        className="pl-11 text-gray-600 space-y-4 leading-relaxed admin-html-content"
                                        dangerouslySetInnerHTML={{ __html: sec.content }}
                                    />
                                </section>
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                İçerik bulunamadı.
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 border-t border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg">Sorularınız mı var?</h4>
                            <p className="text-gray-600 text-sm mt-1">Hukuki şartlarımız hakkında daha fazla bilgiye ihtiyacınız varsa bizimle iletişime geçin.</p>
                        </div>
                        <div className="flex gap-4">
                            <a href="#/contact" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors">İletişim</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Legal;