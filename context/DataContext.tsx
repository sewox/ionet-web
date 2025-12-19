import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Types
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  image: string;
  content?: string;
}

export interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  time: string;
  exp: string;
  department: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  created_at?: string;
}

export interface Message {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface SiteSetting {
  id: string;
  ckey: string;
  value: string;
  group_name: string;
  type: 'text' | 'long_text' | 'image';
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  order_index: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  order_index: number;
}

export interface InfraFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: string; // newline separated
  order_index: number;
}

export interface TechPartner {
  id: string;
  name: string;
  icon: string;
  order_index: number;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  order_index: number;
}

export interface CareerValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}

export interface CareerTech {
  id: string;
  name: string;
  icon: string;
  order_index: number;
}

export interface LegalSection {
  id: string;
  title: string;
  content: string;
  anchor: string;
  order_index: number;
}

interface DataContextType {
  blogPosts: BlogPost[];
  jobs: Job[];
  projects: Project[];
  pages: Page[];
  messages: Message[];
  siteSettings: SiteSetting[];
  menuItems: MenuItem[];
  homeFeatures: Feature[];
  homeServices: ServiceItem[];
  infraFeatures: InfraFeature[];
  techPartners: TechPartner[];
  testimonials: Testimonial[];
  careerValues: CareerValue[];
  careerTechStack: CareerTech[];
  legalSections: LegalSection[];
  addBlogPost: (post: BlogPost) => Promise<void>;
  updateBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addJob: (job: Job) => Promise<void>;
  updateJob: (job: Job) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addPage: (page: Page) => Promise<void>;
  updatePage: (page: Page) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  sendMessage: (msg: Message) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  updateSetting: (key: string, value: string, group?: string, type?: 'text' | 'long_text' | 'image') => Promise<void>;
  deleteSetting: (key: string) => Promise<void>;
  addMenuItem: (item: MenuItem) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addFeature: (feature: Feature) => Promise<void>;
  updateFeature: (feature: Feature) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
  addService: (service: ServiceItem) => Promise<void>;
  updateService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addInfraFeature: (feature: InfraFeature) => Promise<void>;
  updateInfraFeature: (feature: InfraFeature) => Promise<void>;
  deleteInfraFeature: (id: string) => Promise<void>;
  addTechPartner: (partner: TechPartner) => Promise<void>;
  updateTechPartner: (partner: TechPartner) => Promise<void>;
  deleteTechPartner: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Testimonial) => Promise<void>;
  updateTestimonial: (testimonial: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addCareerValue: (val: CareerValue) => Promise<void>;
  updateCareerValue: (val: CareerValue) => Promise<void>;
  deleteCareerValue: (id: string) => Promise<void>;
  addCareerTech: (tech: CareerTech) => Promise<void>;
  updateCareerTech: (tech: CareerTech) => Promise<void>;
  deleteCareerTech: (id: string) => Promise<void>;
  addLegalSection: (sec: LegalSection) => Promise<void>;
  updateLegalSection: (sec: LegalSection) => Promise<void>;
  deleteLegalSection: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [homeFeatures, setHomeFeatures] = useState<Feature[]>([]);
  const [homeServices, setHomeServices] = useState<ServiceItem[]>([]);
  const [infraFeatures, setInfraFeatures] = useState<InfraFeature[]>([]);
  const [techPartners, setTechPartners] = useState<TechPartner[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [careerValues, setCareerValues] = useState<CareerValue[]>([]);
  const [careerTechStack, setCareerTechStack] = useState<CareerTech[]>([]);
  const [legalSections, setLegalSections] = useState<LegalSection[]>([]);

  // Dynamic API Base Path
  const API_BASE = ((import.meta as any).env.VITE_BASE_PATH || '/ionet-web').replace(/\/$/, '');

  const fetchData = async () => {
    try {
      const [postsRes, jobsRes, projRes, pagesRes, msgRes, settingsRes, menuRes, featureRes, serviceRes, infraRes, partnerRes, testimonialsRes, cValuesRes, cTechRes, legalRes] = await Promise.all([
        fetch(`${API_BASE}/api/blog_posts`).then(r => r.json()),
        fetch(`${API_BASE}/api/jobs`).then(r => r.json()),
        fetch(`${API_BASE}/api/projects`).then(r => r.json()),
        fetch(`${API_BASE}/api/pages`).then(r => r.json()),
        fetch(`${API_BASE}/api/messages`).then(r => r.json()),
        fetch(`${API_BASE}/api/settings`).then(r => r.json()),
        fetch(`${API_BASE}/api/menu_items`).then(r => r.json()),
        fetch(`${API_BASE}/api/home_features`).then(r => r.json()),
        fetch(`${API_BASE}/api/home_services`).then(r => r.json()),
        fetch(`${API_BASE}/api/infrastructure_features`).then(r => r.json()),
        fetch(`${API_BASE}/api/tech_partners`).then(r => r.json()),
        fetch(`${API_BASE}/api/testimonials`).then(r => r.json()),
        fetch(`${API_BASE}/api/career_values`).then(r => r.json()),
        fetch(`${API_BASE}/api/career_tech_stack`).then(r => r.json()),
        fetch(`${API_BASE}/api/legal_sections`).then(r => r.json())
      ]);
      setBlogPosts(postsRes || []);
      setJobs(jobsRes || []);
      setProjects(projRes || []);
      setPages(pagesRes || []);
      setMessages(msgRes || []);
      setSiteSettings(settingsRes || []);
      setMenuItems((menuRes || []).sort((a: MenuItem, b: MenuItem) => a.order_index - b.order_index));
      setHomeFeatures((featureRes || []).sort((a: Feature, b: Feature) => a.order_index - b.order_index));
      setHomeServices((serviceRes || []).sort((a: ServiceItem, b: ServiceItem) => a.order_index - b.order_index));
      setInfraFeatures((infraRes || []).sort((a: InfraFeature, b: InfraFeature) => a.order_index - b.order_index));
      setTechPartners((partnerRes || []).sort((a: TechPartner, b: TechPartner) => a.order_index - b.order_index));
      setTestimonials((testimonialsRes || []).sort((a: Testimonial, b: Testimonial) => a.order_index - b.order_index));
      setCareerValues((cValuesRes || []).sort((a: CareerValue, b: CareerValue) => a.order_index - b.order_index));
      setCareerTechStack((cTechRes || []).sort((a: CareerTech, b: CareerTech) => a.order_index - b.order_index));
      setLegalSections((legalRes || []).sort((a: LegalSection, b: LegalSection) => a.order_index - b.order_index));
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // API Helpers...
  const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  const postData = async (url: string, data: any) => {
    // If URL is absolute/relative starting with /, prepend API_BASE if not already present?
    // Actually, callers pass full path '/api/...'
    // So we invoke callers with correct path OR we check here.
    // Callers are below. we will update callers.
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'İşlem başarısız oldu');
    }
    fetchData();
  };

  const updateData = async (url: string, data: any) => {
    const res = await fetch(url + '/' + data.id, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Update Failed');
    fetchData(); // Refresh data
  };

  const deleteData = async (url: string) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Delete Failed');
    fetchData();
  };

  // Actions
  const addBlogPost = async (post: BlogPost) => postData(`${API_BASE}/api/blog_posts`, post);
  const updateBlogPost = async (post: BlogPost) => updateData(`${API_BASE}/api/blog_posts`, post);
  const deleteBlogPost = async (id: string) => deleteData(`${API_BASE}/api/blog_posts/${id}`);

  const addJob = async (job: Job) => postData(`${API_BASE}/api/jobs`, job);
  const updateJob = async (job: Job) => updateData(`${API_BASE}/api/jobs`, job);
  const deleteJob = async (id: string) => deleteData(`${API_BASE}/api/jobs/${id}`);

  const addProject = async (project: Project) => postData(`${API_BASE}/api/projects`, project);
  const updateProject = async (project: Project) => updateData(`${API_BASE}/api/projects`, project);
  const deleteProject = async (id: string) => deleteData(`${API_BASE}/api/projects/${id}`);

  const addPage = async (page: Page) => postData(`${API_BASE}/api/pages`, page);
  const updatePage = async (page: Page) => updateData(`${API_BASE}/api/pages`, page);
  const deletePage = async (id: string) => deleteData(`${API_BASE}/api/pages/${id}`);

  const sendMessage = async (msg: Message) => postData(`${API_BASE}/api/messages`, msg);
  const deleteMessage = async (id: string) => deleteData(`${API_BASE}/api/messages/${id}`);

  const updateSetting = async (ckey: string, value: string, group_name: string = 'general', type: 'text' | 'long_text' | 'image' = 'text') => {
    await postData(`${API_BASE}/api/settings`, { ckey, value, group_name, type });
  };
  const deleteSetting = async (ckey: string) => deleteData(`${API_BASE}/api/settings/${ckey}`);

  const addMenuItem = async (item: MenuItem) => postData(`${API_BASE}/api/menu_items`, item);
  const updateMenuItem = async (item: MenuItem) => updateData(`${API_BASE}/api/menu_items`, item);
  const deleteMenuItem = async (id: string) => deleteData(`${API_BASE}/api/menu_items/${id}`);

  const addFeature = async (feature: Feature) => postData(`${API_BASE}/api/home_features`, feature);
  const updateFeature = async (feature: Feature) => updateData(`${API_BASE}/api/home_features`, feature);
  const deleteFeature = async (id: string) => deleteData(`${API_BASE}/api/home_features/${id}`);

  const addService = async (service: ServiceItem) => postData(`${API_BASE}/api/home_services`, service);
  const updateService = async (service: ServiceItem) => updateData(`${API_BASE}/api/home_services`, service);
  const deleteService = async (id: string) => deleteData(`${API_BASE}/api/home_services/${id}`);

  const addInfraFeature = async (feature: InfraFeature) => postData(`${API_BASE}/api/infrastructure_features`, feature);
  const updateInfraFeature = async (feature: InfraFeature) => updateData(`${API_BASE}/api/infrastructure_features`, feature);
  const deleteInfraFeature = async (id: string) => deleteData(`${API_BASE}/api/infrastructure_features/${id}`);

  const addTechPartner = async (partner: TechPartner) => postData(`${API_BASE}/api/tech_partners`, partner);
  const updateTechPartner = async (partner: TechPartner) => updateData(`${API_BASE}/api/tech_partners`, partner);
  const deleteTechPartner = async (id: string) => deleteData(`${API_BASE}/api/tech_partners/${id}`);

  const addTestimonial = async (testimonial: Testimonial) => postData(`${API_BASE}/api/testimonials`, testimonial);
  const updateTestimonial = async (testimonial: Testimonial) => updateData(`${API_BASE}/api/testimonials`, testimonial);
  const deleteTestimonial = async (id: string) => deleteData(`${API_BASE}/api/testimonials/${id}`);

  const addCareerValue = async (val: CareerValue) => postData(`${API_BASE}/api/career_values`, val);
  const updateCareerValue = async (val: CareerValue) => updateData(`${API_BASE}/api/career_values`, val);
  const deleteCareerValue = async (id: string) => deleteData(`${API_BASE}/api/career_values/${id}`);

  const addCareerTech = async (tech: CareerTech) => postData(`${API_BASE}/api/career_tech_stack`, tech);
  const updateCareerTech = async (tech: CareerTech) => updateData(`${API_BASE}/api/career_tech_stack`, tech);
  const deleteCareerTech = async (id: string) => deleteData(`${API_BASE}/api/career_tech_stack/${id}`);

  const addLegalSection = async (sec: LegalSection) => postData(`${API_BASE}/api/legal_sections`, sec);
  const updateLegalSection = async (sec: LegalSection) => updateData(`${API_BASE}/api/legal_sections`, sec);
  const deleteLegalSection = async (id: string) => deleteData(`${API_BASE}/api/legal_sections/${id}`);

  return (
    <DataContext.Provider value={{
      blogPosts, jobs, projects, pages, messages, siteSettings, menuItems, homeFeatures, homeServices, infraFeatures, techPartners, testimonials, careerValues, careerTechStack, legalSections,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addJob, updateJob, deleteJob,
      addProject, updateProject, deleteProject,
      addPage, updatePage, deletePage,
      sendMessage, deleteMessage,
      updateSetting, deleteSetting,
      addMenuItem, updateMenuItem, deleteMenuItem,
      addFeature, updateFeature, deleteFeature,
      addService, updateService, deleteService,
      addInfraFeature, updateInfraFeature, deleteInfraFeature,
      addTechPartner, updateTechPartner, deleteTechPartner,
      addTestimonial, updateTestimonial, deleteTestimonial,
      addCareerValue, updateCareerValue, deleteCareerValue,
      addCareerTech, updateCareerTech, deleteCareerTech,
      addLegalSection, updateLegalSection, deleteLegalSection
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};