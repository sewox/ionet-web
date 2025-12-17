import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const FeaturesManager: React.FC = () => {
    const { homeFeatures, addFeature, deleteFeature } = useData();
    const [newItem, setNewItem] = useState({ title: '', description: '', icon: 'star', order_index: 0 });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.title || !newItem.description) return;

        await addFeature({
            id: Date.now().toString(),
            title: newItem.title,
            description: newItem.description,
            icon: newItem.icon,
            order_index: homeFeatures.length + 1
        });
        setNewItem({ title: '', description: '', icon: 'star', order_index: 0 });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Özellik Kartları Yönetimi</h3>
                <p className="text-gray-500 text-sm">Anasayfadaki 'Why Us' bölümündeki kartları yönetin.</p>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Liste */}
                <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-4">Mevcut Kartlar</h4>
                    {homeFeatures.length === 0 ? (
                        <p className="text-gray-400 italic">Henüz kart eklenmemiş.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {homeFeatures.map((item) => (
                                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-gray-300 transition-colors relative">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h5>
                                            <p className="text-xs text-gray-500 line-clamp-3">{item.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteFeature(item.id)}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                    >
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Ekleme Formu */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                    <h4 className="font-semibold text-gray-800 mb-4">Yeni Kart Ekle</h4>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                            <input
                                type="text"
                                placeholder="Örn: Stratejik Planlama"
                                value={newItem.title}
                                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">İkon (Material Symbol)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Örn: hub, security, speed"
                                    value={newItem.icon}
                                    onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                                />
                                <div className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-gray-600">{newItem.icon || 'star'}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer" className="underline hover:text-primary">Google Icons</a>'dan ikon ismi seçin.
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                            <textarea
                                rows={3}
                                placeholder="Kart açıklaması..."
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                        >
                            Ekle
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeaturesManager;
