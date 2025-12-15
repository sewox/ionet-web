import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10 bg-surface-light min-h-screen">
        <div className="w-full max-w-7xl px-6 flex flex-col lg:flex-row gap-10 items-start">
            {/* Sidebar */}
            <div className="lg:w-64 shrink-0 lg:sticky lg:top-24">
                <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
                    <h3 className="font-bold text-gray-900 px-4 py-3 border-b border-gray-100 text-xs uppercase tracking-widest">Bu Sayfada</h3>
                    <nav className="flex flex-col text-sm mt-2">
                        <a href="#giris" className="px-4 py-2 text-primary font-medium border-l-2 border-primary bg-blue-50">1. Giriş</a>
                        <a href="#kullanim" className="px-4 py-2 text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-300">2. Hizmetlerin Kullanımı</a>
                        <a href="#fikri-mulkiyet" className="px-4 py-2 text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-300">3. Fikri Mülkiyet Hakları</a>
                        <a href="#sorumluluk" className="px-4 py-2 text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-300">4. Sorumluluğun Sınırlandırılması</a>
                        <a href="#gizlilik" className="px-4 py-2 text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-300">5. Gizlilik ve Veri Güvenliği</a>
                        <a href="#hukuk" className="px-4 py-2 text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-300">6. Uygulanacak Hukuk</a>
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
                        <span>Son Güncelleme: 24 Ekim 2024</span>
                    </div>
                </div>

                <div className="p-8 space-y-12">
                    <section id="giris">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">1</span>
                            <h2 className="text-2xl font-bold text-gray-900">Giriş</h2>
                        </div>
                        <div className="pl-11 text-gray-600 space-y-4 leading-relaxed">
                            <p>
                                I/ONET Teknoloji ("Şirket") tarafından işletilen web sitesine ve sunulan hizmetlere hoş geldiniz. Bu Şartlar ve Koşullar ("Sözleşme"), web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda sizinle Şirket arasındaki yasal ilişkiyi düzenler.
                            </p>
                            <p>
                                Hizmetlerimize erişerek veya kullanarak, bu Sözleşme'nin tüm hükümlerini okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz. Eğer bu şartlardan herhangi birini kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayı derhal durdurunuz.
                            </p>
                        </div>
                    </section>

                    <section id="kullanim">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">2</span>
                            <h2 className="text-2xl font-bold text-gray-900">Hizmetlerin Kullanımı</h2>
                        </div>
                        <div className="pl-11 text-gray-600 space-y-4 leading-relaxed">
                            <p>Web sitemiz ve sunduğumuz teknolojik çözümler, yalnızca yasal amaçlar doğrultusunda kullanılabilir. Kullanıcılar, aşağıdaki eylemlerden kaçınmayı taahhüt eder:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Şirketin altyapısına, sunucularına veya ağlarına zarar verecek veya aşırı yük bindirecek işlemler yapmak.</li>
                                <li>Herhangi bir robot, örümcek veya diğer otomatik cihazları kullanarak sistemlerimize izinsiz erişim sağlamak.</li>
                                <li>Başkalarının fikri mülkiyet haklarını ihlal eden içerik yüklemek veya paylaşmak.</li>
                                <li>Yürürlükteki yerel, ulusal veya uluslararası yasaları ihlal etmek.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="fikri-mulkiyet">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">3</span>
                            <h2 className="text-2xl font-bold text-gray-900">Fikri Mülkiyet Hakları</h2>
                        </div>
                        <div className="pl-11 text-gray-600 space-y-4 leading-relaxed">
                            <p>
                                Bu web sitesinde yer alan tüm içerik, tasarımlar, grafikler, kodlar, logolar ve yazılımlar ("I/ONET Varlıkları") I/ONET Teknoloji'nin mülkiyetindedir ve telif hakkı, marka ve diğer fikri mülkiyet yasaları ile korunmaktadır.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                                <p className="text-sm">
                                    <strong>Önemli Not:</strong> Şirketin önceden yazılı izni olmaksızın, I/ONET Varlıkları'nın herhangi bir kısmını kopyalamak, çoğaltmak, dağıtmak veya türev çalışmalar oluşturmak kesinlikle yasaktır.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="sorumluluk">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">4</span>
                            <h2 className="text-2xl font-bold text-gray-900">Sorumluluğun Sınırlandırılması</h2>
                        </div>
                        <div className="pl-11 text-gray-600 space-y-4 leading-relaxed">
                            <p>
                                I/ONET Teknoloji, hizmetlerin kesintisiz veya hatasız olacağını garanti etmez. Web sitesinin kullanımından veya kullanılamamasından kaynaklanan doğrudan, dolaylı, arızi veya cezai zararlardan (veri kaybı veya kar kaybı dahil ancak bunlarla sınırlı olmamak üzere) yasaların izin verdiği ölçüde sorumlu tutulamaz.
                            </p>
                        </div>
                    </section>

                    <section id="gizlilik">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">5</span>
                            <h2 className="text-2xl font-bold text-gray-900">Gizlilik ve Veri Güvenliği</h2>
                        </div>
                        <div className="pl-11 text-gray-600 space-y-4 leading-relaxed">
                            <p>
                                Kişisel verilerinizin gizliliği bizim için esastır. Verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında detaylı bilgi için <a href="#" className="text-primary font-medium hover:underline">Gizlilik Politikası</a> sayfamızı inceleyiniz. I/ONET, endüstri standardı güvenlik önlemleri uygulayarak verilerinizi korumayı taahhüt eder.
                            </p>
                        </div>
                    </section>

                    <section id="hukuk">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">6</span>
                            <h2 className="text-2xl font-bold text-gray-900">Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
                        </div>
                        <div className="pl-11 text-gray-600 space-y-4 leading-relaxed">
                            <p>
                                Bu Sözleşme, Türkiye Cumhuriyeti yasalarına tabidir ve bu yasalara göre yorumlanacaktır. Bu Sözleşme'den doğabilecek her türlü uyuşmazlığın çözümünde İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri münhasıran yetkilidir.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="bg-gray-50 border-t border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-gray-900 font-bold text-lg">Sorularınız mı var?</h4>
                        <p className="text-gray-600 text-sm mt-1">Hukuki şartlarımız hakkında daha fazla bilgiye ihtiyacınız varsa bizimle iletişime geçin.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors">İletişim</button>
                        <button className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">Destek Merkezi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Legal;