import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';
import { useContent } from '../hooks/useContent';

const Contact: React.FC = () => {
  const { getContent } = useContent();
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
    <>
      <SEO title="İletişim" description="Bize ulaşın. Sorularınız için buradayız." />
      <div className="flex flex-col items-center bg-surface-light min-h-screen pb-24 pt-32">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Left Column */}
            <div className="lg:col-span-12 flex flex-col gap-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">{getContent('contact_hero_title', 'Bize Ulaşın')}</h1>
                <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
                  {getContent('contact_hero_desc', 'Teknoloji mimarı olarak iş süreçlerinizi dijitalleştiriyoruz. Projenizi hayata geçirmek için bizimle iletişime geçin.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Merkez Ofis</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{getContent('contact_address', 'Bilişim Vadisi, Muallimköy Mah.\nDeniz Cad. No:143/5 Gebze/Kocaeli')}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">call</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Telefon</h3>
                    <p className="text-gray-600 text-base font-medium">{getContent('contact_phone', '+90 (262) 555 00 00')}</p>
                    <p className="text-gray-400 text-xs mt-1 font-medium tracking-wide uppercase">{getContent('contact_phone_note', 'Hafta içi 09:00 - 18:00')}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">mail</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">E-posta</h3>
                    <p className="text-gray-600 text-base font-medium">{getContent('contact_email', 'info@ionet.com.tr')}</p>
                    <p className="text-gray-400 text-xs mt-1 font-medium tracking-wide uppercase">{getContent('contact_email_note', '7/24 Destek')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8"></div>

            <h2 className="text-3xl font-black text-gray-900 mb-8 relative z-10">İletişim Formu</h2>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-2xl flex items-center gap-4 border border-green-200 animate-fade-in">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
                <div>
                  <p className="font-bold text-lg mb-1">Mesajınız başarıyla gönderildi!</p>
                  <p className="text-green-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Adınız *</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" className={`h-14 w-full rounded-xl border bg-gray-50 px-5 text-base outline-none transition-all shadow-sm ${formErrors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white'}`} placeholder="Adınız" />
                    {formErrors.name && <span className="text-red-500 text-xs font-semibold ml-1">{formErrors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Soyadınız</label>
                    <input name="surname" value={formData.surname} onChange={handleChange} type="text" className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 px-5 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm" placeholder="Soyadınız" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">E-posta Adresi *</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" className={`h-14 w-full rounded-xl border bg-gray-50 px-5 text-base outline-none transition-all shadow-sm ${formErrors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white'}`} placeholder="ornek@sirket.com" />
                    {formErrors.email && <span className="text-red-500 text-xs font-semibold ml-1">{formErrors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Telefon</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 px-5 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm" placeholder="0555 555 55 55" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Konu</label>
                  <div className="relative">
                    <select name="subject" value={formData.subject} onChange={handleChange} className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-5 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm">
                      <option>Genel Bilgi</option>
                      <option>Proje Teklifi</option>
                      <option>Teknik Destek</option>
                      <option>Kariyer</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Mesajınız *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className={`w-full rounded-xl border bg-gray-50 p-5 text-base outline-none resize-none transition-all shadow-sm ${formErrors.message ? 'border-red-500' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white'}`} placeholder="Mesajınız..."></textarea>
                  {formErrors.message && <span className="text-red-500 text-xs font-semibold ml-1">{formErrors.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 p-1">
                    <input name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleCheckboxChange} type="checkbox" id="privacy" className="size-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                    <label htmlFor="privacy" className="text-sm text-gray-500 cursor-pointer select-none">KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.</label>
                  </div>
                  {formErrors.privacyAccepted && <span className="text-red-500 text-xs font-semibold ml-9">{formErrors.privacyAccepted}</span>}
                </div>

                <button type="submit" disabled={submitStatus === 'submitting'} className="mt-4 h-14 w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  {submitStatus === 'submitting' ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Mesaj Gönder</span>
                      <span className="material-symbols-outlined text-[24px]">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[400px] w-full bg-gray-200 relative">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={getContent('contact_map_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.6888769351003!2d29.42859497645086!3d40.80066297138012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb208855427131%3A0x67175440ed3c6130!2sBili%C5%9Fim%20Vadisi!5e0!3m2!1str!2str!4v1710500000000!5m2!1str!2str')}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center">
            <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
              <span className="material-symbols-outlined">apartment</span>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-gray-900 text-sm">{getContent('contact_map_title', 'Bilişim Vadisi')}</h4>
              <p className="text-xs text-gray-500">{getContent('contact_map_desc', 'I/ONET Merkez')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;