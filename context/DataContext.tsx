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
  addBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addJob: (job: Job) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addPage: (page: Page) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  sendMessage: (msg: Message) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  updateSetting: (key: string, value: string, group?: string, type?: 'text' | 'long_text' | 'image') => Promise<void>;
  addMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addFeature: (feature: Feature) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
  addService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addInfraFeature: (feature: InfraFeature) => Promise<void>;
  deleteInfraFeature: (id: string) => Promise<void>;
  addTechPartner: (partner: TechPartner) => Promise<void>;
  deleteTechPartner: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addCareerValue: (val: CareerValue) => Promise<void>;
  deleteCareerValue: (id: string) => Promise<void>;
  addCareerTech: (tech: CareerTech) => Promise<void>;
  deleteCareerTech: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Data...

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

  const fetchData = async () => {
    try {
      const [postsRes, jobsRes, projRes, pagesRes, msgRes, settingsRes, menuRes, featureRes, serviceRes, infraRes, partnerRes, testimonialsRes, cValuesRes, cTechRes, legalRes] = await Promise.all([
        fetch('/api/blog_posts').then(r => r.json()),
        fetch('/api/jobs').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/pages').then(r => r.json()),
        fetch('/api/messages').then(r => r.json()),
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/menu_items').then(r => r.json()),
        fetch('/api/home_features').then(r => r.json()),
        fetch('/api/home_services').then(r => r.json()),
        fetch('/api/infrastructure_features').then(r => r.json()),
        fetch('/api/tech_partners').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/career_values').then(r => r.json()),
        fetch('/api/career_tech_stack').then(r => r.json()),
        fetch('/api/legal_sections').then(r => r.json())
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
  const postData = async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'İşlem başarısız oldu');
    }
    fetchData();
  };

  const deleteData = async (url: string) => {
    await fetch(url, { method: 'DELETE' });
    fetchData();
  };

  // Actions
  const addBlogPost = async (post: BlogPost) => postData('/api/blog_posts', post);
  const deleteBlogPost = async (id: string) => deleteData(`/api/blog_posts/${id}`);

  // ... other actions
  const addJob = async (job: Job) => postData('/api/jobs', job);
  const deleteJob = async (id: string) => deleteData(`/api/jobs/${id}`);

  const addProject = async (project: Project) => postData('/api/projects', project);
  const deleteProject = async (id: string) => deleteData(`/api/projects/${id}`);

  const addPage = async (page: Page) => postData('/api/pages', page);
  const deletePage = async (id: string) => deleteData(`/api/pages/${id}`);

  const sendMessage = async (msg: Message) => postData('/api/messages', msg);
  const deleteMessage = async (id: string) => deleteData(`/api/messages/${id}`);

  const updateSetting = async (ckey: string, value: string, group_name: string = 'general', type: 'text' | 'long_text' | 'image' = 'text') => {
    await postData('/api/settings', { ckey, value, group_name, type });
  };

  const addMenuItem = async (item: MenuItem) => postData('/api/menu_items', item);
  const deleteMenuItem = async (id: string) => deleteData(`/api/menu_items/${id}`);

  const addFeature = async (feature: Feature) => postData('/api/home_features', feature);
  const deleteFeature = async (id: string) => deleteData(`/api/home_features/${id}`);

  const addService = async (service: ServiceItem) => postData('/api/home_services', service);
  const deleteService = async (id: string) => deleteData(`/api/home_services/${id}`);

  const addInfraFeature = async (feature: InfraFeature) => postData('/api/infrastructure_features', feature);
  const deleteInfraFeature = async (id: string) => deleteData(`/api/infrastructure_features/${id}`);

  const addTechPartner = async (partner: TechPartner) => postData('/api/tech_partners', partner);
  const deleteTechPartner = async (id: string) => deleteData(`/api/tech_partners/${id}`);

  const addTestimonial = async (testimonial: Testimonial) => postData('/api/testimonials', testimonial);
  const deleteTestimonial = async (id: string) => deleteData(`/api/testimonials/${id}`);

  const addCareerValue = async (val: CareerValue) => postData('/api/career_values', val);
  const deleteCareerValue = async (id: string) => deleteData(`/api/career_values/${id}`);

  const addCareerTech = async (tech: CareerTech) => postData('/api/career_tech_stack', tech);
  const deleteCareerTech = async (id: string) => deleteData(`/api/career_tech_stack/${id}`);

  const addLegalSection = async (sec: LegalSection) => postData('/api/legal_sections', sec);
  const deleteLegalSection = async (id: string) => deleteData(`/api/legal_sections/${id}`);

  return (
    <DataContext.Provider value={{
      blogPosts, jobs, projects, pages, messages, siteSettings, menuItems, homeFeatures, homeServices, infraFeatures, techPartners, testimonials, careerValues, careerTechStack, legalSections,
      addBlogPost, deleteBlogPost,
      addJob, deleteJob,
      addProject, deleteProject,
      addPage, deletePage,
      sendMessage, deleteMessage,
      updateSetting,
      addMenuItem, deleteMenuItem,
      addFeature, deleteFeature,
      addService, deleteService,
      addInfraFeature, deleteInfraFeature,
      addTechPartner, deleteTechPartner,
      addTestimonial, deleteTestimonial,
      addCareerValue, deleteCareerValue,
      addCareerTech, deleteCareerTech,
      addLegalSection, deleteLegalSection
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