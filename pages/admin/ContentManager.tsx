import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import TextEditor from '../../components/TextEditor';

const GROUPS = [
    { id: 'general', label: 'Genel & SEO' },
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'careers', label: 'Kariyer Sayfası' },
    { id: 'contact', label: 'İletişim' },
    { id: 'infrastructure', label: 'Altyapı Sayfası' },
    { id: 'references', label: 'Referanslar Sayfası' },
    { id: 'mail', label: 'E-posta Ayarları' },
    { id: 'header_footer', label: 'Header & Footer' },
    { id: 'social', label: 'Sosyal Medya' }
];

const SETTING_DEFINITIONS = [
    // General
    { group: 'general', key: 'site_title', label: 'Site Başlığı', type: 'text' },

    // Header & Footer
    { group: 'header_footer', key: 'header_logo_text', label: 'Logo Metni', type: 'text' },
    { group: 'header_footer', key: 'header_logo_image', label: 'Logo Görseli (Varsa metin yerine bu kullanılır)', type: 'image' },
    { group: 'header_footer', key: 'header_logo_height', label: 'Logo Yüksekliği (px)', type: 'text' },
    { group: 'header_footer', key: 'footer_desc', label: 'Footer Açıklama (1. Sütun)', type: 'long_text' },

    { group: 'header_footer', key: 'footer_col2_title', label: 'Footer 2. Sütun Başlığı', type: 'text' },
    { group: 'header_footer', key: 'footer_col2_content', label: 'Footer 2. Sütun İçeriği (Liste)', type: 'long_text' },

    { group: 'header_footer', key: 'footer_col3_title', label: 'Footer 3. Sütun Başlığı', type: 'text' },
    { group: 'header_footer', key: 'footer_col3_content', label: 'Footer 3. Sütun İçeriği (Liste)', type: 'long_text' },

    { group: 'header_footer', key: 'footer_col4_title', label: 'Footer 4. Sütun Başlığı (İletişim)', type: 'text' },

    // Social
    { group: 'social', key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
    { group: 'social', key: 'social_twitter', label: 'Twitter URL', type: 'text' },
    { group: 'social', key: 'social_facebook', label: 'Facebook URL', type: 'text' },

    // Contact
    { group: 'contact', key: 'contact_hero_title', label: 'Sayfa Başlığı', type: 'text' },
    { group: 'contact', key: 'contact_hero_desc', label: 'Sayfa Açıklaması', type: 'long_text' },

    { group: 'contact', key: 'contact_address', label: 'Açık Adres', type: 'long_text' },
    { group: 'contact', key: 'contact_phone', label: 'Telefon Numarası', type: 'text' },
    { group: 'contact', key: 'contact_phone_note', label: 'Telefon Alt Notu', type: 'text' },
    { group: 'contact', key: 'contact_email', label: 'E-posta Adresi', type: 'text' },
    { group: 'contact', key: 'contact_email_note', label: 'E-posta Alt Notu', type: 'text' },

    { group: 'contact', key: 'contact_map_embed_url', label: 'Harita Embed URL (src linki)', type: 'long_text' },
    { group: 'contact', key: 'contact_map_title', label: 'Harita Rozet Başlığı', type: 'text' },
    { group: 'contact', key: 'contact_map_desc', label: 'Harita Rozet Alt Metni', type: 'text' },
    // Home
    { group: 'home', key: 'home_hero_badge', label: 'Hero Üst Rozet (Badge)', type: 'text' },
    { group: 'home', key: 'home_hero_title', label: 'Hero Başlık', type: 'long_text' },
    { group: 'home', key: 'home_hero_desc', label: 'Hero Açıklama', type: 'long_text' },
    { group: 'home', key: 'home_hero_image', label: 'Hero Görsel URL', type: 'image' },
    { group: 'home', key: 'home_hero_btn1_text', label: 'Buton 1 Metni', type: 'text' },
    { group: 'home', key: 'home_hero_btn1_url', label: 'Buton 1 Linki', type: 'text' },
    { group: 'home', key: 'home_hero_btn2_text', label: 'Buton 2 Metni', type: 'text' },
    { group: 'home', key: 'home_hero_btn2_url', label: 'Buton 2 Linki', type: 'text' },
    { group: 'home', key: 'home_motto_title', label: 'Motto Başlık', type: 'long_text' },
    { group: 'home', key: 'home_motto_desc', label: 'Motto Açıklama', type: 'long_text' },
    { group: 'home', key: 'home_services_title', label: 'Hizmetler Başlık', type: 'text' },
    { group: 'home', key: 'home_services_desc', label: 'Hizmetler Alt Açıklama', type: 'long_text' },
    { group: 'home', key: 'home_cta_title', label: 'Alt CTA Başlık', type: 'text' },
    { group: 'home', key: 'home_cta_desc', label: 'Alt CTA Açıklama', type: 'long_text' },
    { group: 'home', key: 'home_cta_btn_text', label: 'Alt CTA Buton Metni', type: 'text' },
    { group: 'home', key: 'home_cta_btn_url', label: 'Alt CTA Buton Linki', type: 'text' },

    // Infrastructure Page
    { group: 'infrastructure', key: 'infra_hero_title', label: 'Hero Başlık', type: 'long_text' },
    { group: 'infrastructure', key: 'infra_hero_desc', label: 'Hero Açıklama', type: 'long_text' },
    { group: 'infrastructure', key: 'infra_hero_img', label: 'Hero Görsel URL', type: 'image' },
    { group: 'infrastructure', key: 'infra_hero_badge_title', label: 'Hero Rozet Başlığı', type: 'text' },
    { group: 'infrastructure', key: 'infra_hero_badge_desc', label: 'Hero Rozet Açıklama', type: 'text' },

    { group: 'infrastructure', key: 'infra_features_title', label: 'Hizmetler Başlık', type: 'text' },
    { group: 'infrastructure', key: 'infra_features_desc', label: 'Hizmetler Açıklama', type: 'long_text' },

    { group: 'infrastructure', key: 'infra_partners_title', label: 'İş Ortakları Başlığı', type: 'text' },

    { group: 'infrastructure', key: 'infra_cta_title', label: 'Alt CTA Başlık', type: 'long_text' },
    { group: 'infrastructure', key: 'infra_cta_desc', label: 'Alt CTA Açıklama', type: 'long_text' },
    { group: 'infrastructure', key: 'infra_cta_badge', label: 'Alt CTA Rozet Metni', type: 'text' },
    { group: 'infrastructure', key: 'infra_cta_btn1_text', label: 'Buton 1 Metni', type: 'text' },
    { group: 'infrastructure', key: 'infra_cta_btn2_text', label: 'Buton 2 Metni', type: 'text' },

    // References Page
    { group: 'references', key: 'ref_hero_title', label: 'Hero Başlık', type: 'long_text' },
    { group: 'references', key: 'ref_hero_desc', label: 'Hero Açıklama', type: 'long_text' },

    { group: 'references', key: 'ref_stat1_val', label: 'İstatistik 1 Değer', type: 'text' },
    { group: 'references', key: 'ref_stat1_label', label: 'İstatistik 1 Etiket', type: 'text' },
    { group: 'references', key: 'ref_stat2_val', label: 'İstatistik 2 Değer', type: 'text' },
    { group: 'references', key: 'ref_stat2_label', label: 'İstatistik 2 Etiket', type: 'text' },
    { group: 'references', key: 'ref_stat3_val', label: 'İstatistik 3 Değer', type: 'text' },
    { group: 'references', key: 'ref_stat3_label', label: 'İstatistik 3 Etiket', type: 'text' },
    { group: 'references', key: 'ref_stat4_val', label: 'İstatistik 4 Değer', type: 'text' },
    { group: 'references', key: 'ref_stat4_label', label: 'İstatistik 4 Etiket', type: 'text' },

    { group: 'references', key: 'ref_case_title', label: 'Case Study Başlık', type: 'text' },
    { group: 'references', key: 'ref_case_desc', label: 'Case Study Açıklama', type: 'long_text' },
    { group: 'references', key: 'ref_case_client', label: 'Case Study Müşteri', type: 'text' },
    { group: 'references', key: 'ref_case_img', label: 'Case Study Görsel', type: 'image' },
    { group: 'references', key: 'ref_case_tags', label: 'Case Study Etiketler (Virgül ile ayırın)', type: 'text' },
    { group: 'references', key: 'ref_case_stat1_val', label: 'Case Stat 1 Değer', type: 'text' },
    { group: 'references', key: 'ref_case_stat1_label', label: 'Case Stat 1 Etiket', type: 'text' },
    { group: 'references', key: 'ref_case_stat2_val', label: 'Case Stat 2 Değer', type: 'text' },
    { group: 'references', key: 'ref_case_stat2_label', label: 'Case Stat 2 Etiket', type: 'text' },

    { group: 'references', key: 'ref_projects_title', label: 'Projeler Başlık', type: 'text' },
    { group: 'references', key: 'ref_projects_desc', label: 'Projeler Açıklama', type: 'long_text' },

    { group: 'references', key: 'ref_cta_title', label: 'Alt CTA Başlık', type: 'text' },
    { group: 'references', key: 'ref_cta_desc', label: 'Alt CTA Açıklama', type: 'long_text' },
    { group: 'references', key: 'ref_cta_btn1_text', label: 'Buton 1 Metni', type: 'text' },
    { group: 'references', key: 'ref_cta_btn2_text', label: 'Buton 2 Metni', type: 'text' },

    // Careers Page
    { group: 'careers', key: 'career_hero_badge', label: 'Hero Rozet', type: 'text' },
    { group: 'careers', key: 'career_hero_title', label: 'Hero Başlık', type: 'long_text' },
    { group: 'careers', key: 'career_hero_desc', label: 'Hero Açıklama', type: 'long_text' },
    { group: 'careers', key: 'career_hero_btn1_text', label: 'Buton 1 Metni', type: 'text' },
    { group: 'careers', key: 'career_hero_btn2_text', label: 'Buton 2 Metni', type: 'text' },

    { group: 'careers', key: 'career_quote_text', label: 'Alıntı (Quote) Metni', type: 'long_text' },
    { group: 'careers', key: 'career_quote_author', label: 'Alıntı Sahibi', type: 'text' },
    { group: 'careers', key: 'career_quote_role', label: 'Alıntı Sahibi Ünvan', type: 'text' },

    { group: 'careers', key: 'career_stat1_val', label: 'İstatistik 1 Değer', type: 'text' },
    { group: 'careers', key: 'career_stat1_label', label: 'İstatistik 1 Etiket', type: 'text' },
    { group: 'careers', key: 'career_stat2_val', label: 'İstatistik 2 Değer', type: 'text' },
    { group: 'careers', key: 'career_stat2_label', label: 'İstatistik 2 Etiket', type: 'text' },
    { group: 'careers', key: 'career_stat3_val', label: 'İstatistik 3 Değer', type: 'text' },
    { group: 'careers', key: 'career_stat3_label', label: 'İstatistik 3 Etiket', type: 'text' },
    { group: 'careers', key: 'career_stat4_val', label: 'İstatistik 4 Değer', type: 'text' },
    { group: 'careers', key: 'career_stat4_label', label: 'İstatistik 4 Etiket', type: 'text' },

    { group: 'careers', key: 'career_values_title', label: 'Değerler Başlığı', type: 'text' },
    { group: 'careers', key: 'career_jobs_title', label: 'İlanlar Başlığı', type: 'text' },
    { group: 'careers', key: 'career_jobs_desc', label: 'İlanlar Açıklama', type: 'long_text' },
    { group: 'careers', key: 'career_tech_title', label: 'Teknolojiler Başlık', type: 'text' },

    // Mail Settings
    { group: 'mail', key: 'smtp_host', label: 'SMTP Sunucu (Host)', type: 'text' },
    { group: 'mail', key: 'smtp_port', label: 'SMTP Port', type: 'text' },
    { group: 'mail', key: 'smtp_user', label: 'SMTP Kullanıcı Adı', type: 'text' },
    { group: 'mail', key: 'smtp_pass', label: 'SMTP Şifre', type: 'text' }, // TODO: Mask this input in UI ideally
    { group: 'mail', key: 'smtp_secure', label: 'SMTP Güvenli (true/false)', type: 'text' },
    { group: 'mail', key: 'mail_to', label: 'Alıcı E-posta Adresi', type: 'text' },

    { group: 'mail', key: 'mail_subject_template', label: 'Konu Şablonu', type: 'text' },
    { group: 'mail', key: 'mail_body_template', label: 'Mail İçerik Şablonu (HTML)', type: 'long_text' },
];

const ContentManager: React.FC = () => {
    const { siteSettings, updateSetting } = useData();
    const [activeGroup, setActiveGroup] = useState('general');
    const [saving, setSaving] = useState<string | null>(null);

    const getSettingValue = (key: string) => {
        return siteSettings.find(s => s.ckey === key)?.value || '';
    };

    const handleSave = async (key: string, value: string, group: string, type: any) => {
        setSaving(key);
        try {
            await updateSetting(key, value, group, type);
        } catch (e) {
            alert('Kaydedilemedi');
        } finally {
            setSaving(null);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, group: string, type: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setSaving(key);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.url) {
                await updateSetting(key, data.url, group, type);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Yükleme başarısız');
        } finally {
            setSaving(null);
        }
    };

    const getPlaceholder = (key: string) => {
        if (key === 'mail_subject_template') {
            return 'Örnek: Web Sitesinden Mesaj: {{name}}';
        }
        if (key === 'mail_body_template') {
            return 'Örnek:\n<h3>Yeni Mesaj</h3>\n<p><strong>Ad:</strong> {{name}}</p>\n<p><strong>Mesaj:</strong> {{message}}</p>';
        }
        if (key.includes('footer_col') && key.includes('content')) {
            return '<ul>\n  <li><a href="/link">Link Metni</a></li>\n  <li><a href="/link2">Link Metni 2</a></li>\n</ul>';
        }
        return 'İçerik giriniz...';
    };

    const filteredDefinitions = SETTING_DEFINITIONS.filter(d => d.group === activeGroup);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                    {GROUPS.map(group => (
                        <button
                            key={group.id}
                            onClick={() => setActiveGroup(group.id)}
                            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeGroup === group.id
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {group.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-6 space-y-6">
                {filteredDefinitions.map(def => {
                    const currentValue = getSettingValue(def.key);

                    return (
                        <div key={def.key} className="max-w-3xl">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                {def.label}
                                <span className="text-gray-400 font-normal ml-2 text-xs">({def.key})</span>
                            </label>

                            <div className="flex gap-4 items-start">
                                <div className="flex-grow">
                                    {def.type === 'long_text' ? (
                                        <TextEditor
                                            value={currentValue}
                                            onChange={(val) => handleSave(def.key, val, def.group, def.type)}
                                            placeholder={getPlaceholder(def.key)}
                                            height="200px"
                                        />
                                    ) : def.type === 'image' ? (
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    defaultValue={currentValue}
                                                    onBlur={(e) => handleSave(def.key, e.target.value, def.group, def.type)}
                                                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                                    placeholder="Görsel URL'si yapıştırın veya yükleyin..."
                                                />
                                                <label className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 whitespace-nowrap">
                                                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                                                    <span>Yükle</span>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleUpload(e, def.key, def.group, def.type)}
                                                    />
                                                </label>
                                            </div>
                                            {currentValue && (
                                                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 inline-block">
                                                    <img src={currentValue} alt="Preview" className="h-40 object-contain rounded" />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            defaultValue={currentValue}
                                            onBlur={(e) => handleSave(def.key, e.target.value, def.group, def.type)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                            placeholder={getPlaceholder(def.key)}
                                        />
                                    )}
                                </div>
                                {saving === def.key && (
                                    <div className="flex items-center text-green-600 text-sm mt-2 animate-pulse">
                                        <span className="material-symbols-outlined text-lg mr-1">check_circle</span>
                                        Kaydediliyor...
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {filteredDefinitions.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        Bu grupta henüz ayar tanımlanmamış.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManager;
