import React from 'react';
import { useData } from '../context/DataContext';
import { useContent } from '../hooks/useContent';

const Careers: React.FC = () => {
  const { jobs, careerValues, careerTechStack } = useData() as any;
  const { getContent } = useContent();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-secondary relative overflow-hidden py-24">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#127ae2 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">{getContent('career_hero_badge', 'Kariyer Fırsatları')}</span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-6"
            dangerouslySetInnerHTML={{ __html: getContent('career_hero_title', 'Geleceğin Teknolojisini <br/><span class="text-primary">İnşa Edin</span>') }}
          />
          <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
            {getContent('career_hero_desc', 'Bilişim Vadisi\'nin kalbinde global çözümler üretiyoruz. Sıradan bir kod yazarı değil, dijital dünyanın mimarı olun.')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#positions" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
              {getContent('career_hero_btn1_text', 'Açık Pozisyonlar')} <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-all border border-white/10">
              {getContent('career_hero_btn2_text', 'I/ONET Kültürü')}
            </button>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{getContent('career_values_title', 'Neden I/ONET?')}</h2>
              <div className="space-y-8">
                {careerValues && careerValues.length > 0 ? careerValues.map((val: any) => (
                  <div key={val.id} className="flex gap-4">
                    <div className="size-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">{val.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500">Henüz değer eklenmemiş.</p>
                )}
              </div>
            </div>

            <div className="bg-surface-light p-10 rounded-3xl border border-gray-100 relative">
              <span className="material-symbols-outlined text-[64px] text-gray-200 absolute top-6 left-6">format_quote</span>
              <div className="relative z-10 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">I/ONET Kültürü</h3>
                <p className="text-gray-600 text-lg italic mb-6 leading-relaxed">
                  "{getContent('career_quote_text', 'Biz I/ONET\'te sadece yazılım geliştirmiyoruz; dijital ekosistemlerin geleceğini tasarlıyoruz. Hiyerarşiden uzak, liyakatin esas olduğu bir yapı inşa ettik.')}"
                </p>
                <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                  <div className="size-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">domain</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{getContent('career_quote_author', 'Yönetim Kurulu Mesajı')}</div>
                    <div className="text-xs text-primary font-bold uppercase">{getContent('career_quote_role', 'I/ONET Teknoloji')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-black mb-1">{getContent('career_stat1_val', '10+')}</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">{getContent('career_stat1_label', 'Yıllık Tecrübe')}</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">{getContent('career_stat2_val', '50+')}</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">{getContent('career_stat2_label', 'Global Proje')}</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">{getContent('career_stat3_val', '100%')}</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">{getContent('career_stat3_label', 'Müşteri Memnuniyeti')}</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">{getContent('career_stat4_val', '2')}</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">{getContent('career_stat4_label', 'Lokasyon')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Positions */}
      <section id="positions" className="py-20 bg-background-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{getContent('career_jobs_title', 'Açık Pozisyonlar')}</h2>
              <p className="text-gray-500 mt-2">{getContent('career_jobs_desc', 'Ekibimize katılın ve fark yaratın.')}</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">Tümü</button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Yazılım Geliştirme</button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Tasarım & UI/UX</button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Sistem & DevOps</button>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{job.department}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> {job.location}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> {job.time}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">work_history</span> {job.exp}</span>
                  </div>
                </div>
                <button className="px-6 py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors w-full md:w-auto">
                  Başvur
                </button>
              </div>
            ))}
            {jobs.length === 0 && <p className="text-center text-gray-500 py-4">Şu anda açık pozisyon bulunmamaktadır.</p>}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">Aradığınız pozisyonu bulamadınız mı?</p>
            <a href="#" className="text-primary font-bold hover:underline flex items-center justify-center gap-1">
              Genel Başvuru Yapın <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <div className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{getContent('career_tech_title', 'Kullandığımız Teknolojiler')}</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {careerTechStack && careerTechStack.length > 0 ? careerTechStack.map((tech: any) => (
              <span key={tech.id} className="text-xl font-bold text-gray-600 flex items-center gap-2">
                <span className="material-symbols-outlined">{tech.icon}</span> {tech.name}
              </span>
            )) : (
              <>
                <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">cloud</span> AWS</span>
                <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">code</span> Java</span>
                <span className="text-xl font-bold text-gray-600 flex items-center gap-2"><span className="material-symbols-outlined">data_object</span> React</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;