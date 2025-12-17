import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const CareersManager: React.FC = () => {
    const {
        jobs, addJob, deleteJob,
        careerValues, addCareerValue, deleteCareerValue,
        careerTechStack, addCareerTech, deleteCareerTech
    } = useData();

    // Job States
    const [jobTitle, setJobTitle] = useState('');
    const [jobDept, setJobDept] = useState('');
    const [jobLoc, setJobLoc] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobExp, setJobExp] = useState('');

    // Value States
    const [valTitle, setValTitle] = useState('');
    const [valDesc, setValDesc] = useState('');
    const [valIcon, setValIcon] = useState('school');

    // Tech States
    const [techName, setTechName] = useState('');
    const [techIcon, setTechIcon] = useState('code');

    const handleAddJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!jobTitle) return;
        await addJob({
            id: Date.now().toString(),
            title: jobTitle,
            department: jobDept,
            location: jobLoc,
            time: jobType,
            exp: jobExp
        });
        setJobTitle(''); setJobDept(''); setJobLoc(''); setJobType(''); setJobExp('');
    };

    const handleAddValue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!valTitle) return;
        await addCareerValue({
            id: Date.now().toString(),
            title: valTitle,
            description: valDesc,
            icon: valIcon,
            order_index: careerValues.length + 1
        });
        setValTitle(''); setValDesc('');
    };

    const handleAddTech = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!techName) return;
        await addCareerTech({
            id: Date.now().toString(),
            name: techName,
            icon: techIcon,
            order_index: careerTechStack.length + 1
        });
        setTechName('');
    };

    return (
        <div className="space-y-8">
            {/* Jobs Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Açık Pozisyonlar</h3>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid gap-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center group relative">
                                <div>
                                    <h4 className="font-bold text-gray-900">{job.title}</h4>
                                    <p className="text-xs text-gray-500">{job.department} • {job.location}</p>
                                </div>
                                <button onClick={() => deleteJob(job.id)} className="text-gray-400 hover:text-red-500">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                        <h4 className="font-semibold text-gray-800 mb-4">Yeni İlan Ekle</h4>
                        <form onSubmit={handleAddJob} className="space-y-3">
                            <input type="text" placeholder="Pozisyon Adı" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" />
                            <select value={jobDept} onChange={e => setJobDept(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm">
                                <option value="">Departman Seçiniz</option>
                                <option value="Yazılım">Yazılım</option>
                                <option value="Tasarım">Tasarım</option>
                                <option value="Altyapı">Altyapı</option>
                            </select>
                            <input type="text" placeholder="Konum" value={jobLoc} onChange={e => setJobLoc(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" />
                            <input type="text" placeholder="Çalışma Tipi (örn: Uzaktan)" value={jobType} onChange={e => setJobType(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" />
                            <input type="text" placeholder="Deneyim (örn: 3+ Yıl)" value={jobExp} onChange={e => setJobExp(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" />
                            <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded shadow-sm hover:bg-primary-dark text-sm">Ekle</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Values Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Kültür & Değerler</h3>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid gap-4">
                        {careerValues.map((val) => (
                            <div key={val.id} className="p-4 bg-gray-50 rounded-lg flex items-start gap-4 relative">
                                <span className="material-symbols-outlined text-primary">{val.icon}</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{val.title}</h4>
                                    <p className="text-xs text-gray-500">{val.description}</p>
                                </div>
                                <button onClick={() => deleteCareerValue(val.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                        <h4 className="font-semibold text-gray-800 mb-4">Yeni Değer Ekle</h4>
                        <form onSubmit={handleAddValue} className="space-y-3">
                            <input type="text" placeholder="Başlık" value={valTitle} onChange={e => setValTitle(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" />
                            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-2">
                                <span className="material-symbols-outlined text-gray-500">{valIcon}</span>
                                <input type="text" placeholder="İkon Adı (material)" value={valIcon} onChange={e => setValIcon(e.target.value)} className="w-full py-2 outline-none text-sm" />
                            </div>
                            <textarea rows={3} placeholder="Açıklama" value={valDesc} onChange={e => setValDesc(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" />
                            <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded shadow-sm hover:bg-primary-dark text-sm">Ekle</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Tech Stack Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Teknoloji İkonları</h3>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-wrap gap-4">
                        {careerTechStack.map((tech) => (
                            <div key={tech.id} className="p-3 bg-gray-50 rounded-lg flex items-center gap-2 border border-gray-200 relative group pr-8">
                                <span className="material-symbols-outlined text-gray-600">{tech.icon}</span>
                                <span className="font-bold text-gray-700 text-sm">{tech.name}</span>
                                <button onClick={() => deleteCareerTech(tech.id)} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit">
                        <h4 className="font-semibold text-gray-800 mb-4">Yeni Teknoloji Ekle</h4>
                        <form onSubmit={handleAddTech} className="space-y-3">
                            <input type="text" placeholder="İsim (örn: React)" value={techName} onChange={e => setTechName(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" />
                            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-2">
                                <span className="material-symbols-outlined text-gray-500">{techIcon}</span>
                                <input type="text" placeholder="İkon Adı" value={techIcon} onChange={e => setTechIcon(e.target.value)} className="w-full py-2 outline-none text-sm" />
                            </div>
                            <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded shadow-sm hover:bg-primary-dark text-sm">Ekle</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareersManager;
