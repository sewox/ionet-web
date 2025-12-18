import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const SiteSettingsManager: React.FC = () => {
    const { siteSettings, updateSetting, deleteSetting } = useData() as any;
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [isAdding, setIsAdding] = useState(false);
    const [newSetting, setNewSetting] = useState<any>({ ckey: '', value: '', group_name: 'Genel', type: 'text' });

    const handleEdit = (setting: any) => {
        setEditingId(setting.id || setting.ckey);
        setFormData({ ...setting });
    };

    const handleDelete = async (ckey: string) => {
        if (window.confirm(`${ckey} ayarını silmek istediğinize emin misiniz?`)) {
            try {
                await deleteSetting(ckey);
                alert('Ayar silindi.');
            } catch (error: any) {
                console.error(error);
                alert('Silme başarısız: ' + error.message);
            }
        }
    };

    const handleSave = async () => {
        if (!formData.ckey || !formData.value) return alert('Anahtar ve Değer zorunludur.');
        try {
            // Correctly passing arguments: ckey, value, group_name, type
            await updateSetting(formData.ckey, formData.value, formData.group_name, formData.type);
            setEditingId(null);
            setFormData({});
            alert('Ayar güncellendi!');
        } catch (error: any) {
            console.error(error);
            alert('Hata: ' + error.message);
        }
    };

    const handleAdd = async () => {
        if (!newSetting.ckey || !newSetting.value) return alert('Anahtar ve Değer zorunludur.');
        try {
            await updateSetting(newSetting.ckey, newSetting.value, newSetting.group_name, newSetting.type);
            setNewSetting({ ckey: '', value: '', group_name: 'Genel', type: 'text' });
            setIsAdding(false);
            alert('Ayar eklendi!');
        } catch (error: any) {
            console.error(error);
            alert('Hata: ' + error.message);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({});
    };

    // Pre-defined known keys for easy adding if they don't exist? 
    // For now just list existing and allow edit.

    const groupedSettings = siteSettings?.reduce((acc: any, curr: any) => {
        const group = curr.group_name || 'Genel';
        if (!acc[group]) acc[group] = [];
        acc[group].push(curr);
        return acc;
    }, {}) || {};

    const hasSiteUrl = siteSettings?.some((s: any) => s.ckey === 'site_url');

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Site Ayarları</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm"
                >
                    <span className="material-symbols-outlined text-[20px]">{isAdding ? 'close' : 'add'}</span>
                    {isAdding ? 'İptal' : 'Yeni Ayar Ekle'}
                </button>
            </div>

            {!hasSiteUrl && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-yellow-600">warning</span>
                        <div>
                            <p className="font-bold text-yellow-800 text-sm">site_url ayarı eksik!</p>
                            <p className="text-xs text-yellow-700">SEO (sitemap/robots.txt) için bu ayarı eklemelisiniz.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { setIsAdding(true); setNewSetting({ ckey: 'site_url', value: 'https://www.ionetteknoloji.com.tr', group_name: 'Genel', type: 'text' }) }}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-200 transition-colors"
                    >
                        Hızlı Ekle
                    </button>
                </div>
            )}

            {isAdding && (
                <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">add_circle</span>
                        Yeni Ayar Oluştur
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Anahtar (Key)</label>
                            <input
                                className="w-full p-2.5 border rounded-lg text-sm bg-white"
                                placeholder="örn: site_url"
                                value={newSetting.ckey}
                                onChange={e => setNewSetting({ ...newSetting, ckey: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Grup</label>
                            <input
                                className="w-full p-2.5 border rounded-lg text-sm bg-white"
                                placeholder="örn: Genel"
                                value={newSetting.group_name}
                                onChange={e => setNewSetting({ ...newSetting, group_name: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Değer</label>
                            <input
                                className="w-full p-2.5 border rounded-lg text-sm bg-white"
                                placeholder="Değer giriniz..."
                                value={newSetting.value}
                                onChange={e => setNewSetting({ ...newSetting, value: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Veri Tipi</label>
                            <select
                                className="w-full p-2.5 border rounded-lg text-sm bg-white"
                                value={newSetting.type}
                                onChange={e => setNewSetting({ ...newSetting, type: e.target.value })}
                            >
                                <option value="text">Metin (Text)</option>
                                <option value="long_text">Uzun Metin (Long Text)</option>
                                <option value="image">Görsel (Image)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium">İptal</button>
                        <button onClick={handleAdd} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-all">Kaydet</button>
                    </div>
                </div>
            )}

            {Object.keys(groupedSettings).map(group => (
                <div key={group} className="mb-8">
                    <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">folder</span> {group}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {groupedSettings[group].map((setting: any) => (
                            <div key={setting.ckey} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md bg-white">
                                <div className="md:w-1/3">
                                    <span className="font-bold text-gray-800 block text-sm">{setting.ckey}</span>
                                    <span className="text-[10px] text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{setting.type || 'text'}</span>
                                </div>
                                <div className="md:w-2/3 flex gap-2 w-full">
                                    {editingId === (setting.id || setting.ckey) ? (
                                        <div className="flex-1 flex gap-2 items-start">
                                            {setting.type === 'image' ? (
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <input
                                                        className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                                        value={formData.value}
                                                        onChange={e => setFormData({ ...formData, value: e.target.value })}
                                                        placeholder="Image URL"
                                                    />
                                                </div>
                                            ) : (
                                                <input
                                                    className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                                    value={formData.value}
                                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                                />
                                            )}
                                            <button onClick={handleSave} className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors" title="Kaydet"><span className="material-symbols-outlined text-[20px]">check</span></button>
                                            <button onClick={handleCancel} className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors" title="İptal"><span className="material-symbols-outlined text-[20px]">close</span></button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex-1 text-sm text-gray-600 truncate py-2" title={setting.value}>
                                                {setting.type === 'image' ? (
                                                    <img src={setting.value} alt="preview" className="h-8 object-contain rounded border border-gray-200 bg-white" />
                                                ) : (
                                                    setting.value
                                                )}
                                            </div>
                                            <button onClick={() => handleEdit(setting)} className="text-gray-400 hover:text-primary p-2 rounded-lg hover:bg-primary/5 transition-all" title="Düzenle"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                            <button onClick={() => handleDelete(setting.ckey)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all" title="Sil"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {(!siteSettings || siteSettings.length === 0) && !isAdding && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">settings_suggest</span>
                    <p className="text-gray-500">Henüz yapılandırılmış ayar bulunamadı.</p>
                    <button onClick={() => setIsAdding(true)} className="text-primary font-bold text-sm mt-2 hover:underline">İlk ayarı ekle</button>
                </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 text-blue-900 rounded-xl text-sm border border-blue-100 flex gap-3">
                <span className="material-symbols-outlined text-blue-600">info</span>
                <p>
                    <strong>Bilgi:</strong> 'site_url' ayarı robots.txt ve sitemap.xml oluşumunu etkiler. Lütfen tam URL giriniz (örn: https://www.ionetteknoloji.com.tr).
                </p>
            </div>
        </div>
    );
};

export default SiteSettingsManager;
