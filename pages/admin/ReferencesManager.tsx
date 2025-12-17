import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const ReferencesManager: React.FC = () => {
    const {
        projects, addProject, deleteProject,
        testimonials, addTestimonial, deleteTestimonial
    } = useData();

    // Project States
    const [projTitle, setProjTitle] = useState('');
    const [projCat, setProjCat] = useState('');
    const [projDesc, setProjDesc] = useState('');

    // Testimonial States
    const [testName, setTestName] = useState('');
    const [testTitle, setTestTitle] = useState('');
    const [testQuote, setTestQuote] = useState('');
    const [testImg, setTestImg] = useState('');

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projTitle) return;
        await addProject({
            id: Date.now().toString(),
            title: projTitle,
            category: projCat,
            description: projDesc,
            image: '' // Not used in UI essentially, but required by type
        });
        setProjTitle('');
        setProjCat('');
        setProjDesc('');
    };

    const handleAddTestimonial = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!testName) return;
        await addTestimonial({
            id: Date.now().toString(),
            name: testName,
            title: testTitle,
            quote: testQuote,
            image: testImg,
            order_index: testimonials.length + 1
        });
        setTestName('');
        setTestTitle('');
        setTestQuote('');
        setTestImg('');
    };

    return (
        <div className="space-y-8">
            {/* Projects Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Referans Projeler</h3>
                    <p className="text-gray-500 text-sm">Gurur duyduğumuz işlerin listesi.</p>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projects.map((item) => (
                                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">{item.category}</span>
                                    </div>
                                    <h5 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h5>
                                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>

                                    <button
                                        onClick={() => deleteProject(item.id)}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                    >
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Form */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                        <h4 className="font-semibold text-gray-800 mb-4">Yeni Proje Ekle</h4>
                        <form onSubmit={handleAddProject} className="space-y-3">
                            <input
                                type="text" placeholder="Proje Adı" value={projTitle} onChange={e => setProjTitle(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <input
                                type="text" placeholder="Kategori (örn: Finans)" value={projCat} onChange={e => setProjCat(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <textarea
                                rows={3} placeholder="Kısa Açıklama" value={projDesc} onChange={e => setProjDesc(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded shadow-sm hover:bg-primary-dark text-sm">Ekle</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Testimonials Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Müşteri Yorumları</h3>
                    <p className="text-gray-500 text-sm">Mutlu müşterilerimizden gelen geri bildirimler.</p>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid grid-cols-1 gap-4">
                        {testimonials.map(t => (
                            <div key={t.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-white">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-sm">{t.name}</h5>
                                    <p className="text-xs text-primary font-medium mb-1">{t.title}</p>
                                    <p className="text-xs text-gray-500 italic">"{t.quote}"</p>
                                </div>
                                <button
                                    onClick={() => deleteTestimonial(t.id)}
                                    className="absolute right-2 top-2 text-gray-300 hover:text-red-500"
                                >
                                    <span className="material-symbols-outlined text-lg">cancel</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                        <h4 className="font-semibold text-gray-800 mb-4">Yeni Yorum Ekle</h4>
                        <form onSubmit={handleAddTestimonial} className="space-y-3">
                            <input
                                type="text" placeholder="İsim Soyisim" value={testName} onChange={e => setTestName(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <input
                                type="text" placeholder="Ünvan (örn: CTO)" value={testTitle} onChange={e => setTestTitle(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <textarea
                                rows={3} placeholder="Yorum Metni" value={testQuote} onChange={e => setTestQuote(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <input
                                type="text" placeholder="Profil Resmi URL" value={testImg} onChange={e => setTestImg(e.target.value)}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                            />
                            <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded shadow-sm hover:bg-primary-dark text-sm">Ekle</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferencesManager;
