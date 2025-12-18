import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const InfrastructureManager: React.FC = () => {
    const { infraFeatures, addInfraFeature, updateInfraFeature, deleteInfraFeature, techPartners, addTechPartner, updateTechPartner, deleteTechPartner } = useData();
    const [editingFeatId, setEditingFeatId] = useState<string | null>(null);
    const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);

    // Feature States
    const [featTitle, setFeatTitle] = useState('');
    const [featDesc, setFeatDesc] = useState('');
    const [featIcon, setFeatIcon] = useState('dns');
    const [featPoints, setFeatPoints] = useState(''); // Newline separated

    // Partner States
    const [partnerName, setPartnerName] = useState('');
    const [partnerIcon, setPartnerIcon] = useState('business');

    const handleAddFeature = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!featTitle) return;

        if (editingFeatId) {
            await updateInfraFeature({
                id: editingFeatId,
                title: featTitle,
                description: featDesc,
                icon: featIcon,
                points: featPoints,
                order_index: 0 // Keep existing or fix generic update to ignore unset
            } as any);
            setEditingFeatId(null);
        } else {
            await addInfraFeature({
                id: Date.now().toString(),
                title: featTitle,
                description: featDesc,
                icon: featIcon,
                points: featPoints,
                order_index: infraFeatures.length + 1
            });
        }
        setFeatTitle('');
        setFeatDesc('');
        setFeatIcon('dns');
        setFeatPoints('');
    };

    const handleEditFeature = (item: any) => {
        setFeatTitle(item.title);
        setFeatDesc(item.description);
        setFeatIcon(item.icon);
        setFeatPoints(item.points || '');
        setEditingFeatId(item.id);
    };

    const handleCancelFeature = () => {
        setFeatTitle('');
        setFeatDesc('');
        setFeatIcon('dns');
        setFeatPoints('');
        setEditingFeatId(null);
    };

    const handleAddPartner = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!partnerName) return;

        if (editingPartnerId) {
            await updateTechPartner({
                id: editingPartnerId,
                name: partnerName,
                icon: partnerIcon,
                order_index: 0
            } as any);
            setEditingPartnerId(null);
        } else {
            await addTechPartner({
                id: Date.now().toString(),
                name: partnerName,
                icon: partnerIcon,
                order_index: techPartners.length + 1
            });
        }
        setPartnerName('');
        setPartnerIcon('business');
    };

    const handleEditPartner = (item: any) => {
        setPartnerName(item.name);
        setPartnerIcon(item.icon);
        setEditingPartnerId(item.id);
    };

    const handleCancelPartner = () => {
        setPartnerName('');
        setPartnerIcon('business');
        setEditingPartnerId(null);
    };

    return (
        <div className="space-y-8">
            {/* Features Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Altyapı Hizmet Kartları</h3>
                    <p className="text-gray-500 text-sm">Altyapı sayfasındaki hizmet detay kartlarını yönetin.</p>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {infraFeatures.map((item) => (
                                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h5>
                                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                                            <ul className="text-xs text-gray-400 list-disc list-inside">
                                                {item.points && item.points.split('\n').slice(0, 2).map((p, i) => (
                                                    <li key={i}>{p}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button
                                            onClick={() => handleEditFeature(item)}
                                            className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                                        >
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                        <button
                                            onClick={() => deleteInfraFeature(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Form */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                        <h4 className="font-semibold text-gray-800 mb-4">{editingFeatId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}</h4>
                        <form onSubmit={handleAddFeature} className="space-y-3">
                            <input
                                type="text" placeholder="Başlık" value={featTitle} onChange={e => setFeatTitle(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text" placeholder="İkon (Material)" value={featIcon} onChange={e => setFeatIcon(e.target.value)}
                                    className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                                />
                                <div className="w-9 h-9 flex items-center justify-center bg-white border rounded">
                                    <span className="material-symbols-outlined text-gray-600">{featIcon}</span>
                                </div>
                            </div>
                            <textarea
                                rows={2} placeholder="Açıklama" value={featDesc} onChange={e => setFeatDesc(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <textarea
                                rows={3} placeholder="Maddeler (Her satıra bir tane)" value={featPoints} onChange={e => setFeatPoints(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <div className="flex gap-2">
                                {editingFeatId && <button type="button" onClick={handleCancelFeature} className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded shadow-sm hover:bg-gray-300 text-sm">İptal</button>}
                                <button type="submit" className="flex-1 bg-primary text-white font-bold py-2 rounded shadow-sm hover:bg-primary-dark text-sm">{editingFeatId ? 'Güncelle' : 'Ekle'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Partners Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Teknoloji İş Ortakları</h3>
                    <p className="text-gray-500 text-sm">Sayfanın altındaki ikon bantı.</p>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-wrap gap-4">
                        {techPartners.map(partner => (
                            <div key={partner.id} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 relative group pr-16 bg-white hover:border-gray-300 transition-all">
                                <span className="material-symbols-outlined text-gray-500">{partner.icon}</span>
                                <span className="font-bold text-gray-700">{partner.name}</span>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                    <button onClick={() => handleEditPartner(partner)} className="text-gray-300 hover:text-blue-500"><span className="material-symbols-outlined text-lg">edit</span></button>
                                    <button onClick={() => deleteTechPartner(partner.id)} className="text-gray-300 hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                        <h4 className="font-semibold text-gray-800 mb-4">{editingPartnerId ? 'Ortak Düzenle' : 'Yeni Ortak Ekle'}</h4>
                        <form onSubmit={handleAddPartner} className="space-y-3">
                            <input
                                type="text" placeholder="İsim (Örn: Microsoft)" value={partnerName} onChange={e => setPartnerName(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text" placeholder="İkon (örn: grid_view)" value={partnerIcon} onChange={e => setPartnerIcon(e.target.value)}
                                    className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                                />
                                <div className="w-9 h-9 flex items-center justify-center bg-white border rounded">
                                    <span className="material-symbols-outlined text-gray-600">{partnerIcon}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {editingPartnerId && <button type="button" onClick={handleCancelPartner} className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded shadow-sm hover:bg-gray-300 text-sm">İptal</button>}
                                <button type="submit" className="flex-1 bg-primary text-white font-bold py-2 rounded shadow-sm hover:bg-primary-dark text-sm">{editingPartnerId ? 'Güncelle' : 'Ekle'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfrastructureManager;
