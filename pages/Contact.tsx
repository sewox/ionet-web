import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Bize Ulaşın</h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Teknoloji mimarı olarak iş süreçlerinizi dijitalleştiriyoruz. Projenizi hayata geçirmek için bizimle iletişime geçin.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-surface-light rounded-xl p-5 border border-gray-200 flex items-start gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Merkez Ofis</h3>
                    <p className="text-gray-600 text-sm">Bilişim Vadisi, Muallimköy Mah.<br/>Deniz Cad. No:143/5 Gebze/Kocaeli</p>
                  </div>
                </div>
                <div className="bg-surface-light rounded-xl p-5 border border-gray-200 flex items-start gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-600 text-sm">+90 (262) 555 00 00</p>
                    <p className="text-gray-400 text-xs mt-1">Hafta içi 09:00 - 18:00</p>
                  </div>
                </div>
                <div className="bg-surface-light rounded-xl p-5 border border-gray-200 flex items-start gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">E-posta</h3>
                    <p className="text-gray-600 text-sm">info@ionet.com.tr</p>
                    <p className="text-gray-400 text-xs mt-1">7/24 Destek</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Formu</h2>
                <form className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700">Adınız Soyadınız</label>
                      <input type="text" className="h-12 w-full rounded-lg border-gray-200 bg-gray-50 px-4 text-sm focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700">E-posta Adresi</label>
                      <input type="email" className="h-12 w-full rounded-lg border-gray-200 bg-gray-50 px-4 text-sm focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" placeholder="ornek@sirket.com" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Konu</label>
                    <select className="h-12 w-full rounded-lg border-gray-200 bg-gray-50 px-4 text-sm focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all">
                      <option>Genel Bilgi</option>
                      <option>Proje Teklifi</option>
                      <option>Teknik Destek</option>
                      <option>Kariyer</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Mesajınız</label>
                    <textarea rows={5} className="w-full rounded-lg border-gray-200 bg-gray-50 p-4 text-sm focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="Projenizden veya sorunuzdan kısaca bahsedin..."></textarea>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="privacy" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="privacy" className="text-xs text-gray-500">KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.</label>
                  </div>
                  <button type="button" className="mt-2 h-12 w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                    <span>Gönder</span>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[400px] w-full bg-gray-200 relative">
        <div className="absolute inset-0 overflow-hidden">
           {/* Placeholder for map - styled to look corporate */}
           <div className="w-full h-full bg-cover bg-center grayscale contrast-125" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFgc-_ODpL0kNulGm3nVtZKP_JkAP2dq5GKxC94vYkJIy23Nn3uLoAW76U-kSKzFdHiEXab__ccztF4tX4y7cnfBQF8rOFmTF8iY4D4udpw-_L78x6Tv4zV_fHa12rWjErlfzJrjRTUHo8BXfApG_6RDUrKFVlW2TY0gHjgOSNood-2glnZs1bIIggksEqHG-k-Gutgm6JzBADIU1RdrLS87BlGUwcfNlukaymSR2wdUaUYHAYiL06rxCnodcVKq1spxvQf13FYV40')"}}></div>
           <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply pointer-events-none"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center">
              <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                 <span className="material-symbols-outlined">apartment</span>
              </div>
              <div className="text-center">
                 <h4 className="font-bold text-gray-900 text-sm">Bilişim Vadisi</h4>
                 <p className="text-xs text-gray-500">I/ONET Merkez</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;