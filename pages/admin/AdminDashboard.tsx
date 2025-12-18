import React, { useState } from 'react';
import { useData, BlogPost, Job, Project } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ContentManager from './ContentManager';
import MenuManager from './MenuManager';
import FeaturesManager from './FeaturesManager';
import ServicesManager from './ServicesManager';
import InfrastructureManager from './InfrastructureManager';
import ReferencesManager from './ReferencesManager';
import CareersManager from './CareersManager';
import LegalManager from './LegalManager';
import SiteSettingsManager from './SiteSettingsManager';
import TextEditor from '../../components/TextEditor';

const InputField = ({ name, placeholder, value, onChange, type = "text", error }: any) => (
  <div className="mb-3">
    <input
      className={`w-full p-3 border rounded transition-colors outline-none focus:ring-2 ${error
        ? 'border-red-500 focus:ring-red-200'
        : 'border-gray-300 focus:border-primary focus:ring-blue-100'
        }`}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      type={type}
    />
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
    jobs, addJob, updateJob,
    addProject, updateProject,
    pages, addPage, updatePage, deletePage
  } = useData();

  const [activeTab, setActiveTab] = useState<'blog' | 'careers' | 'references' | 'pages' | 'content' | 'menu' | 'features' | 'services' | 'infrastructure' | 'legal' | 'settings'>('blog');

  // Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (activeTab === 'blog') {
      if (!formData.title?.trim()) errors.title = 'Başlık alanı zorunludur.';
      if (!formData.category?.trim()) errors.category = 'Kategori alanı zorunludur.';
      if (!formData.summary?.trim()) errors.summary = 'Özet alanı zorunludur.';

      // Image validation
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
    } else if (activeTab === 'pages') {
      if (!formData.title?.trim()) errors.title = 'Sayfa başlığı zorunludur.';
      if (!formData.slug?.trim()) errors.slug = 'URL (Slug) zorunludur.';
      if (!formData.content?.trim()) errors.content = 'İçerik zorunludur.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
    setFormErrors({});
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      if (editingId) {
        // Update Logic
        if (activeTab === 'blog') await updateBlogPost({ ...formData, id: editingId } as BlogPost);
        else if (activeTab === 'careers') await updateJob({ ...formData, id: editingId } as Job);
        else if (activeTab === 'pages') await updatePage({ ...formData, id: editingId } as any);
        else await updateProject({ ...formData, id: editingId } as Project);
        alert('Kayıt güncellendi!');
      } else {
        // Create Logic
        const id = Date.now().toString();
        if (activeTab === 'blog') {
          await addBlogPost({ ...formData, id, date: new Date().toLocaleDateString('tr-TR') } as BlogPost);
        } else if (activeTab === 'careers') {
          await addJob({ ...formData, id } as Job);
        } else if (activeTab === 'pages') {
          await addPage({ ...formData, id } as any);
        } else {
          await addProject({ ...formData, id } as Project);
        }
        alert('Kayıt başarıyla eklendi.');
      }
      closeModal();
    } catch (error: any) {
      console.error(error);
      alert('Hata oluştu: ' + error.message);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
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

  const renderForm = () => {
    if (activeTab === 'blog') {
      return (
        <>
          <InputField name="title" placeholder="Başlık" value={formData.title} onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} error={formErrors.title} />
          <InputField name="category" placeholder="Kategori" value={formData.category} onChange={(e: any) => setFormData({ ...formData, category: e.target.value })} error={formErrors.category} />

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Özet</label>
            <TextEditor value={formData.summary} onChange={(val) => setFormData({ ...formData, summary: val })} height="100px" />
            {formErrors.summary && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.summary}</p>}
          </div>

          {/* Image Upload Section */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Görsel</label>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              {formData.image && (
                <div className="mb-4 relative group">
                  <img src={formData.image} alt="Önizleme" className="w-full h-48 object-cover rounded-lg border border-gray-300 shadow-sm" />
                  <button
                    onClick={() => setFormData({ ...formData, image: '' })}
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
                  className={`w-full p-3 border rounded transition-colors outline-none focus:ring-2 ${formErrors.image
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-primary focus:ring-blue-100'
                    }`}
                  placeholder="https://example.com/image.jpg"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
            {formErrors.image && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.image}</p>}
          </div>


          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
            <TextEditor value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} height="300px" />
            {formErrors.content && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.content}</p>}
          </div>
        </>
      );
    } else if (activeTab === 'careers') {
      return (
        <>
          <InputField name="title" placeholder="Pozisyon Adı" value={formData.title} onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} error={formErrors.title} />
          <div className="mb-3">
            <select
              className={`w-full p-3 border rounded transition-colors outline-none focus:ring-2 ${formErrors.department
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-primary focus:ring-blue-100'
                }`}
              value={formData.department || ''}
              onChange={e => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="">Departman Seçiniz</option>
              <option value="Yazılım">Yazılım</option>
              <option value="Altyapı">Altyapı</option>
              <option value="Tasarım">Tasarım</option>
            </select>
            {formErrors.department && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.department}</p>}
          </div>
          <InputField name="location" placeholder="Konum (örn: İstanbul)" value={formData.location} onChange={(e: any) => setFormData({ ...formData, location: e.target.value })} error={formErrors.location} />
          <InputField name="type" placeholder="Çalışma Tipi (örn: Uzaktan)" value={formData.type} onChange={(e: any) => setFormData({ ...formData, type: e.target.value })} error={formErrors.type} />
          <InputField name="exp" placeholder="Deneyim (örn: 3+ Yıl)" value={formData.exp} onChange={(e: any) => setFormData({ ...formData, exp: e.target.value })} error={formErrors.exp} />
        </>
      );
    } else if (activeTab === 'pages') {
      return (
        <>
          <InputField name="title" placeholder="Sayfa Başlığı" value={formData.title} onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} error={formErrors.title} />
          <InputField name="slug" placeholder="URL (Slug) - örn: hakkimizda" value={formData.slug} onChange={(e: any) => setFormData({ ...formData, slug: e.target.value })} error={formErrors.slug} />
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa İçeriği</label>
            <TextEditor value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} height="400px" />
            {formErrors.content && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.content}</p>}
          </div>
        </>
      );
    } else {
      return (
        <>
          <InputField name="title" placeholder="Proje Adı" value={formData.title} onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} error={formErrors.title} />
          <InputField name="category" placeholder="Sektör" value={formData.category} onChange={(e: any) => setFormData({ ...formData, category: e.target.value })} error={formErrors.category} />
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Proje Açıklaması</label>
            <TextEditor value={formData.description} onChange={(val) => setFormData({ ...formData, description: val })} height="150px" />
            {formErrors.description && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.description}</p>}
          </div>
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
        <div className="flex gap-4 border-b border-gray-200 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('blog')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'blog' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">article</span>
            Blog Yazıları
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'careers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">work</span>
            Kariyer / İK
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'legal' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">gavel</span>
            Yasal (Legal)
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'pages' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">web</span>
            Sayfalar (CMS)
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'content' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">edit_document</span>
            Site İçeriği
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'menu' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            Menü Yönetimi
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'features' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">widgets</span>
            Özellikler
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'services' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            Hizmetler
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'infrastructure' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">dns</span>
            Altyapı Yönetimi
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'references' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
            Referanslar
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-2 font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'settings' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Site Ayarları
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'content' ? (
          <ContentManager />
        ) : activeTab === 'menu' ? (
          <MenuManager />
        ) : activeTab === 'careers' ? (
          <CareersManager />
        ) : activeTab === 'legal' ? (
          <LegalManager />
        ) : activeTab === 'features' ? (
          <FeaturesManager />
        ) : activeTab === 'services' ? (
          <ServicesManager />
        ) : activeTab === 'infrastructure' ? (
          <InfrastructureManager />
        ) : activeTab === 'references' ? (
          <ReferencesManager />
        ) : activeTab === 'settings' ? (
          <SiteSettingsManager />
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'blog' ? 'Blog Yazıları' : activeTab === 'pages' ? 'Sayfalar' : 'Projeler'}
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

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(post)} className="text-gray-400 hover:text-blue-500"><span className="material-symbols-outlined">edit</span></button>
                    <button onClick={() => deleteBlogPost(post.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </div>
              ))}
              {activeTab === 'pages' && pages.map(page => (
                <div key={page.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-bold text-gray-900">{page.title}</h3>
                    <p className="text-xs text-gray-500">/{page.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`/#/${page.slug}`} target="_blank" className="text-gray-400 hover:text-primary"><span className="material-symbols-outlined">visibility</span></a>
                    <button onClick={() => handleEdit(page)} className="text-gray-400 hover:text-blue-500"><span className="material-symbols-outlined">edit</span></button>
                    <button onClick={() => deletePage(page.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </div>
              ))}
              {((activeTab === 'blog' && blogPosts.length === 0) || (activeTab === 'careers' && jobs.length === 0) || (activeTab === 'pages' && pages.length === 0)) && (
                <div className="text-center py-10 text-gray-400">Kayıt bulunamadı.</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">{editingId ? 'Kaydı Düzenle' : 'Yeni Kayıt Ekle'}</h3>
              {renderForm()}
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button>
                <button onClick={handleCreate} className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-dark">{editingId ? 'Güncelle' : 'Kaydet'}</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default AdminDashboard;