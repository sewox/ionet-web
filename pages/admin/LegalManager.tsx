import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import TextEditor from '../../components/TextEditor';
import ConfirmModal from '../../components/ConfirmModal';

const LegalManager: React.FC = () => {
    const { legalSections, addLegalSection, updateLegalSection, deleteLegalSection } = useData() as any;

    // States
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [anchor, setAnchor] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const maxOrder = legalSections.reduce((max: number, i: any) => i.order_index > max ? i.order_index : max, 0);

        if (editingId) {
            const existingSection = legalSections.find((section: any) => section.id === editingId);
            const orderIndex = existingSection && typeof existingSection.order_index === 'number'
                ? existingSection.order_index
                : maxOrder + 1;

            await updateLegalSection({
                id: editingId,
                title,
                content,
                anchor,
                order_index: orderIndex
            });
            setEditingId(null);
        } else {
            await addLegalSection({
                id: Date.now().toString(),
                title,
                content,
                anchor,
                order_index: maxOrder + 1
            });
        }

        setTitle('');
        setContent('');
        setAnchor('');
        
        // Data will auto-refresh via context
    };

    const handleEdit = (section: any) => {
        setTitle(section.title);
        setContent(section.content);
        setAnchor(section.anchor);
        setEditingId(section.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setAnchor('');
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await deleteLegalSection(deleteId);
            setShowDeleteModal(false);
            setDeleteId(null);
            // Data will auto-refresh via context
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <div className="space-y-8">
            {/* Add New Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">{editingId ? 'Bölümü Düzenle' : 'Yeni Bölüm Ekle'}</h3>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">Legal Sayfası</span>
                </div>
                <div className="p-6">
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Örn: 1. Giriş"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Anchor (URL Linki)</label>
                                <input
                                    type="text"
                                    required
                                    value={anchor}
                                    onChange={e => setAnchor(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="Örn: giris (Türkçe karakter kullanmayın)"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
                            <TextEditor
                                value={content}
                                onChange={setContent}
                                placeholder="Bölüm içeriği..."
                                height="300px"
                            />
                        </div>
                        <div className="flex justify-end">
                            <div className="flex gap-2">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        İptal
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    {editingId ? 'Güncelle' : 'Ekle'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* List Sections */}
            <div className="grid gap-6">
                {legalSections.map((sec: any) => (
                    <div key={sec.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-500 text-xs shadow-sm">
                                    {sec.order_index}
                                </span>
                                <div>
                                    <h4 className="font-bold text-gray-900">{sec.title}</h4>
                                    <span className="text-xs text-blue-500 font-mono">#{sec.anchor}</span>
                                </div>
                            </div>
                            <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                                <button
                                    onClick={() => handleEdit(sec)}
                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
                                    title="Düzenle"
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <div className="w-[1px] bg-gray-200 my-1"></div>
                                <button
                                    onClick={() => handleDelete(sec.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Sil"
                                >
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50/30">
                            <div
                                className="prose prose-sm max-w-none text-gray-600 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: sec.content }}
                            />
                        </div>
                    </div>
                ))}

                {legalSections.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">gavel</span>
                        <p className="text-gray-500">Henüz yasal bölüm eklenmemiş.</p>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Bölümü Sil"
                message="Bu bölümü silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                confirmText="Sil"
                cancelText="İptal"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                variant="danger"
            />
        </div>
    );
};

export default LegalManager;
