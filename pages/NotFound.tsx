import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background-light px-6 py-12">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Content */}
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <span className="text-primary font-black text-9xl leading-none opacity-10 select-none -ml-2 mb-[-2rem]">404</span>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight relative z-10">
                    Bağlantı Hatası
                </h1>
                <p className="text-lg text-gray-500 mb-10 leading-relaxed relative z-10">
                    Üzgünüz, aradığınız veri akışı sağlanamadı veya sayfa taşınmış olabilir. Kurumsal mimarimiz içinde sizi doğru noktaya yönlendirelim.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                    <Link to="/" className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-200 text-center">
                        Ana Sayfaya Dön
                    </Link>
                    <Link to="/contact" className="px-8 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium rounded-lg transition-all text-center">
                        İletişime Geç
                    </Link>
                </div>
            </div>
            
            {/* Visual */}
            <div className="md:w-1/2 bg-gray-50 relative flex items-center justify-center p-10 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(#127ae2 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-inner flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-multiply" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfCUj1CZCBkk_q_4nIZWPc8MW602caLAnqXdb7kyoFMT4HZCZZgp48Gr5P0lkAnbhkX2WypcsBhB5mXJM1Wm2JZxXVLqFCgTTmREgYfRGlCNmpFkj_Ne8X7DC6FfTz0PO498yL8BVtyHDSc9xt2Jh5g16JS6eCPG5RgCS47AwECNBNI1dJK3ylnDYcbWdq9gwTOrlsotc7ZY5rg4_lIDd3ulrD2k375-6qjLubUyAaH5CzWfsVK8__cozqDOIvk_dGxaE9VoQHV2KB')"}}></div>
                     <span className="material-symbols-outlined text-white text-[120px] opacity-50 relative z-10">hub</span>
                </div>
            </div>
        </div>

        <div className="max-w-4xl w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/infrastructure" className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">design_services</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Hizmetlerimiz</h3>
                <p className="text-xs text-gray-500">Teknoloji mimarisi ve yazılım çözümleri.</p>
            </Link>
            <Link to="/" className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">domain</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Kurumsal</h3>
                <p className="text-xs text-gray-500">Vizyonumuz, misyonumuz ve değerlerimiz.</p>
            </Link>
            <Link to="/contact" className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">support_agent</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Destek & İletişim</h3>
                <p className="text-xs text-gray-500">Teknik sorunlar için ekibimize ulaşın.</p>
            </Link>
        </div>
    </div>
  );
};

export default NotFound;