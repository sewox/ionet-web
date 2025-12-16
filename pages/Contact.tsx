import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    subject: 'Genel Bilgi',
    message: '',
    privacyAccepted: false
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { sendMessage } = useData();

  const validateForm = () => {
    const errors: any = {};
    if (!formData.name) errors.name = 'Adınız zorunludur.';
    if (!formData.email) {
      errors.email = 'E-posta adresiniz zorunludur.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Geçerli bir e-posta adresi giriniz.';
    }
    if (!formData.message) errors.message = 'Mesajınız zorunludur.';
    if (!formData.privacyAccepted) errors.privacyAccepted = 'KVKK metnini onaylamanız gerekmektedir.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, privacyAccepted: e.target.checked }));
    if (formErrors.privacyAccepted) {
      setFormErrors((prev: any) => ({ ...prev, privacyAccepted: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus('submitting');

    try {
      // Simulate network delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      await sendMessage({
        id: Date.now().toString(),
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        date: new Date().toLocaleString('tr-TR')
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        subject: 'Genel Bilgi',
        message: '',
        privacyAccepted: false
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

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
                    <p className="text-gray-600 text-sm">Bilişim Vadisi, Muallimköy Mah.<br />Deniz Cad. No:143/5 Gebze/Kocaeli</p>
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
                {submitStatus === 'success' ? (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3 border border-green-200">
                    <span className="material-symbols-outlined">check_circle</span>
                    <div>
                      <p className="font-bold">Mesajınız başarıyla gönderildi!</p>
                      <p className="text-sm">En kısa sürede sizinle iletişime geçeceğiz.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Adınız *</label>
                        <input name="name" value={formData.name} onChange={handleChange} type="text" className={`h-12 w-full rounded-lg border bg-gray-50 px-4 text-sm outline-none transition-all ${formErrors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`} placeholder="Adınız" />
                        {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Soyadınız</label>
                        <input name="surname" value={formData.surname} onChange={handleChange} type="text" className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="Soyadınız" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">E-posta Adresi *</label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" className={`h-12 w-full rounded-lg border bg-gray-50 px-4 text-sm outline-none transition-all ${formErrors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`} placeholder="ornek@sirket.com" />
                        {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Telefon</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="0555 555 55 55" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700">Konu</label>
                      <select name="subject" value={formData.subject} onChange={handleChange} className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all outline-none">
                        <option>Genel Bilgi</option>
                        <option>Proje Teklifi</option>
                        <option>Teknik Destek</option>
                        <option>Kariyer</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700">Mesajınız *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className={`w-full rounded-lg border bg-gray-50 p-4 text-sm outline-none resize-none transition-all ${formErrors.message ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`} placeholder="Mesajınız..."></textarea>
                      {formErrors.message && <span className="text-red-500 text-xs">{formErrors.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <input name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleCheckboxChange} type="checkbox" id="privacy" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <label htmlFor="privacy" className="text-xs text-gray-500 cursor-pointer">KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.</label>
                      </div>
                      {formErrors.privacyAccepted && <span className="text-red-500 text-xs">{formErrors.privacyAccepted}</span>}
                    </div>

                    <button type="submit" disabled={submitStatus === 'submitting'} className="mt-2 h-12 w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                      {submitStatus === 'submitting' ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                          <span>Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <span>Gönder</span>
                          <span className="material-symbols-outlined text-[20px]">send</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[400px] w-full bg-gray-200 relative">
        <div className="absolute inset-0 overflow-hidden">
          {/* Placeholder for map - styled to look corporate */}
          <div className="w-full h-full bg-cover bg-center grayscale contrast-125" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFgc-_ODpL0kNulGm3nVtZKP_JkAP2dq5GKxC94vYkJIy23Nn3uLoAW76U-kSKzFdHiEXab__ccztF4tX4y7cnfBQF8rOFmTF8iY4D4udpw-_L78x6Tv4zV_fHa12rWjErlfzJrjRTUHo8BXfApG_6RDUrKFVlW2TY0gHjgOSNood-2glnZs1bIIggksEqHG-k-Gutgm6JzBADIU1RdrLS87BlGUwcfNlukaymSR2wdUaUYHAYiL06rxCnodcVKq1spxvQf13FYV40')" }}></div>
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