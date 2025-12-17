import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const MenuManager: React.FC = () => {
    const { menuItems, addMenuItem, deleteMenuItem } = useData();
    const [newItem, setNewItem] = useState({ label: '', url: '', order_index: 0 });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.label || !newItem.url) return;

        await addMenuItem({
            id: Date.now().toString(),
            label: newItem.label,
            url: newItem.url,
            order_index: menuItems.length + 1
        });
        setNewItem({ label: '', url: '', order_index: 0 });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Menü Yönetimi</h3>
                <p className="text-gray-500 text-sm">Web sitesinin üst kısmındaki menü linklerini düzenleyin.</p>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Liste */}
                <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-4">Mevcut Menüler</h4>
                    {menuItems.length === 0 ? (
                        <p className="text-gray-400 italic">Henüz menü eklenmemiş.</p>
                    ) : (
                        <div className="space-y-2">
                            {menuItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 group hover:border-gray-300 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold text-gray-600">
                                            {item.order_index}
                                        </span>
                                        <div>
                                            <p className="font-bold text-gray-800">{item.label}</p>
                                            <p className="text-xs text-gray-500">{item.url}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteMenuItem(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Ekleme Formu */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                    <h4 className="font-semibold text-gray-800 mb-4">Yeni Menü Ekle</h4>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Menü Adı</label>
                            <input
                                type="text"
                                placeholder="Örn: Hizmetler"
                                value={newItem.label}
                                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL (Link)</label>
                            <input
                                type="text"
                                placeholder="Örn: /services veya https://..."
                                value={newItem.url}
                                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
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

export default MenuManager;
