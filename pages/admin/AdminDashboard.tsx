import React, { useState } from 'react';
import { useData, BlogPost, Job, Project } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { 
    blogPosts, addBlogPost, deleteBlogPost,
    jobs, addJob, deleteJob,
    projects, addProject, deleteProject
  } = useData();

  const [activeTab, setActiveTab] = useState<'blog' | 'careers' | 'references'>('blog');
  
  // Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (activeTab === 'blog') {
      if (!formData.title?.trim()) errors.title = 'Başlık alanı zorunludur.';
      if (!formData.category?.trim()) errors.category = 'Kategori alanı zorunludur.';
      if (!formData.summary?.trim()) errors.summary = 'Özet alanı zorunludur.';
      
      // Image validation: allow URL or Data URI (Base64)
      if (!formData.image?.trim()) {
        errors.image = 'Görsel alanı zorunludur.';
      } else if (!formData.image.startsWith('data:') && !formData.image.match(/^https?:\/\/.+/)) {
        errors.image = 'Geçerli bir URL giriniz veya dosya yükleyiniz.';
      }

      if (!formData.content?.trim()) errors.content = 'İçerik alanı zorunludur.';
    } else if (activeTab === 'careers') {
      if (!formData.title?.trim()) errors.title = 'Pozisyon adı zorunludur.';
      if (!formData.department) errors.department = 'Lütfen bir departman seçiniz.';
      if (!formData.location?.trim()) errors.location = 'Konum bilgisi zorunludur.';
      if (!formData.type?.trim()) errors.type = 'Çalışma tipi zorunludur.';
      if (!formData.exp?.trim()) errors.exp = 'Deneyim bilgisi zorunludur.';
    } else {
      // References
      if (!formData.title?.trim()) errors.title = 'Proje adı zorunludur.';
      if (!formData.category?.trim()) errors.category = 'Sektör/Kategori zorunludur.';
      if (!formData.description?.trim()) errors.description = 'Açıklama alanı zorunludur.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm()) return;

    const id = Date.now().toString();
    if (activeTab === 'blog') {
      addBlogPost({ ...formData, id, date: new Date().toLocaleDateString('tr-TR') } as BlogPost);
    } else if (activeTab === 'careers') {
      addJob({ ...formData, id } as Job);
    } else {
      addProject({ ...formData, id } as Project);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setFormErrors({});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({ ...prev, image: reader.result as string }));
        setFormErrors((prev) => {
             const newErrors = { ...prev };
             delete newErrors.image;
             return newErrors;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to render input with error styling
  const InputField = ({ name, placeholder, value, onChange, type = "text" }: any) => (
    <div className="mb-3">
      <input 
        className={`w-full p-3 border rounded transition-colors outline-none focus:ring-2 ${
          formErrors[name] 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-primary focus:ring-blue-100'
        }`}
        placeholder={placeholder} 
        value={value || ''} 
        onChange={onChange}
        type={type}
      />
      {formErrors[name] && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors[name]}</p>}
    </div>
  );

  const TextAreaField = ({ name, placeholder, value, onChange, height = "h-auto" }: any) => (
    <div className="mb-3">
      <textarea 
        className={`w-full p-3 border rounded transition-colors outline-none focus:ring-2 ${height} ${
          formErrors[name] 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-primary focus:ring-blue-100'
        }`}
        placeholder={placeholder} 
        value={value || ''} 
        onChange={onChange}
      />
      {formErrors[name] && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors[name]}</p>}
    </div>
  );

  const renderForm = () => {
    if (activeTab === 'blog') {
      return (
        <>
          <InputField name="title" placeholder="Başlık" value={formData.title} onChange={(e: any) => setFormData({...formData, title: e.target.value})} />
          <InputField name="category" placeholder="Kategori" value={formData.category} onChange={(e: any) => setFormData({...formData, category: e.target.value})} />
          <TextAreaField name="summary" placeholder="Özet" value={formData.summary} onChange={(e: any) => setFormData({...formData, summary: e.target.value})} />
          
          {/* Image Upload Section */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Görsel</label>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                {formData.image && (
                    <div className="mb-4 relative group">
                        <img src={formData.image} alt="Önizleme" className="w-full h-48 object-cover rounded-lg border border-gray-300 shadow-sm" />
                        <button 
                            onClick={() => setFormData({...formData, image: ''})}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-all"
                            title="Görseli Kaldır"
                        >
                            <span className="material-symbols-outlined text-sm block">close</span>
                        </button>
                    </div>
                )}
                
                <div className="flex flex-col gap-3">
                    <label className="cursor-pointer block">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer shadow-sm"
                        />
                    </label>
                    <div className="text-center text-xs text-gray-400 font-bold tracking-wider">- VEYA URL KULLANIN -</div>
                    <input 
                        className={`w-full p-3 border rounded transition-colors outline-none focus:ring-2 ${
                        formErrors.image 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-primary focus:ring-blue-100'
                        }`}
                        placeholder="https://example.com/image.jpg" 
                        value={formData.image || ''} 
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                </div>
            </div>
            {formErrors.image && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.image}</p>}
          </div>

          <TextAreaField name="content" placeholder="İçerik (HTML veya Text)" value={formData.content} onChange={(e: any) => setFormData({...formData, content: e.target.value})} height="h-32" />
        </>
      );
    } else if (activeTab === 'careers') {
      return (
        <>
          <InputField name="title" placeholder="Pozisyon Adı" value={formData.title} onChange={(e: any) => setFormData({...formData, title: e.target.value})} />
          <div className="mb-3">
            <select 
              className={`w-full p-3 border rounded transition-colors outline-none focus:ring-2 ${
                formErrors.department 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-primary focus:ring-blue-100'
              }`}
              value={formData.department || ''} 
              onChange={e => setFormData({...formData, department: e.target.value})}
            >
               <option value="">Departman Seçiniz</option>
               <option value="Yazılım">Yazılım</option>
               <option value="Altyapı">Altyapı</option>
               <option value="Tasarım">Tasarım</option>
            </select>
            {formErrors.department && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.department}</p>}
          </div>
          <InputField name="location" placeholder="Konum (örn: İstanbul)" value={formData.location} onChange={(e: any) => setFormData({...formData, location: e.target.value})} />
          <InputField name="type" placeholder="Çalışma Tipi (örn: Uzaktan)" value={formData.type} onChange={(e: any) => setFormData({...formData, type: e.target.value})} />
          <InputField name="exp" placeholder="Deneyim (örn: 3+ Yıl)" value={formData.exp} onChange={(e: any) => setFormData({...formData, exp: e.target.value})} />
        </>
      );
    } else {
      return (
        <>
          <InputField name="title" placeholder="Proje Adı" value={formData.title} onChange={(e: any) => setFormData({...formData, title: e.target.value})} />
          <InputField name="category" placeholder="Sektör" value={formData.category} onChange={(e: any) => setFormData({...formData, category: e.target.value})} />
          <TextAreaField name="description" placeholder="Proje Açıklaması" value={formData.description} onChange={(e: any) => setFormData({...formData, description: e.target.value})} />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">admin_panel_settings</span>
          <span className="font-bold text-lg">Yönetim Paneli</span>
        </div>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 text-sm font-medium flex items-center gap-1">
          <span className="material-symbols-outlined">logout</span> Çıkış
        </button>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
            <button 
                onClick={() => setActiveTab('blog')} 
                className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 ${activeTab === 'blog' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <span className="material-symbols-outlined text-[20px]">article</span>
                Blog Yazıları
            </button>
            <button 
                onClick={() => setActiveTab('careers')} 
                className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 ${activeTab === 'careers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <span className="material-symbols-outlined text-[20px]">work</span>
                Kariyer / İK
            </button>
            <button 
                onClick={() => setActiveTab('references')} 
                className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 ${activeTab === 'references' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <span className="material-symbols-outlined text-[20px]">business</span>
                Referanslar
            </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    {activeTab === 'blog' ? 'Blog Yazıları' : activeTab === 'careers' ? 'Açık Pozisyonlar' : 'Projeler'}
                </h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span> Yeni Ekle
                </button>
            </div>

            {/* Lists */}
            <div className="space-y-4">
                {activeTab === 'blog' && blogPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <img src={post.image} className="w-12 h-12 rounded object-cover" alt="" />
                            <div>
                                <h3 className="font-bold text-gray-900">{post.title}</h3>
                                <p className="text-xs text-gray-500">{post.category} • {post.date}</p>
                            </div>
                        </div>
                        <button onClick={() => deleteBlogPost(post.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                ))}
                {activeTab === 'careers' && jobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div>
                            <h3 className="font-bold text-gray-900">{job.title}</h3>
                            <p className="text-xs text-gray-500">{job.department} • {job.location}</p>
                        </div>
                        <button onClick={() => deleteJob(job.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                ))}
                {activeTab === 'references' && projects.map(proj => (
                    <div key={proj.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div>
                            <h3 className="font-bold text-gray-900">{proj.title}</h3>
                            <p className="text-xs text-gray-500">{proj.category}</p>
                        </div>
                        <button onClick={() => deleteProject(proj.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                ))}
                {((activeTab === 'blog' && blogPosts.length === 0) || (activeTab === 'careers' && jobs.length === 0) || (activeTab === 'references' && projects.length === 0)) && (
                    <div className="text-center py-10 text-gray-400">Kayıt bulunamadı.</div>
                )}
            </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold mb-4">Yeni Kayıt Ekle</h3>
                  {renderForm()}
                  <div className="flex justify-end gap-3 mt-4">
                      <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button>
                      <button onClick={handleCreate} className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-dark">Kaydet</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;