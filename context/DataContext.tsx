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

interface DataContextType {
  blogPosts: BlogPost[];
  jobs: Job[];
  projects: Project[];
  pages: Page[];
  messages: Message[];
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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Data
const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    category: 'Yapay Zeka',
    date: '2 Kasım 2023',
    title: 'Generative AI: İş Dünyasında Yeni Bir Dönem',
    summary: 'Üretken yapay zekanın otomasyon ve yaratıcı süreçlerdeki devrimsel etkilerini inceliyoruz.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv9y8yk-6nS83U92rNrN33NrOCuD9QXx0R3hAy0Sm26aFEV7OBnSWqscGPX2KWEF8V95YssQvz3QBdyUL4F4pSeBD933om82oXEFambnZwZREDqL_4MgLCTjSwJ99AnmRsxhh7CqyF71Y0SHXPSyXsj-xCJZgk_vE15DKmRjca1jkAH-2uCUe5jSQ0sikwhY6Hb_gBao9BW4CgmGwwGllh1-PNkrwu-A8pYXuAcoutBrlxrZwB0vIIj7qQcVmFrSg5AnAr9bwa3_ak',
    content: 'Generative AI içeriği buraya gelecek...'
  },
  {
    id: '2',
    category: 'Siber Güvenlik',
    date: '28 Ekim 2023',
    title: 'Sıfır Güven (Zero Trust) Mimarisine Geçiş',
    summary: 'Geleneksel ağ güvenliği modellerinin yerini alan Zero Trust yaklaşımının temel prensipleri.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA36eoYAQIvBio9r_aIUu7CATagqffdaSfWY6i0IvSvW3GL1_4YoFDgQnc5JzqZMKfy4jbkQkDxXRG4yuEQbHGFQ8Z4g_xgj_tO5J-dYHz0RBeEA3Wo6OLRlP2tVbhV6xAcItw4CggAOu6HqV9-0TRCluN9Ka70-S_klANa4OWLh6PdBIjDJ2rMrU-XgzXbTdllnHwaxLUqUZd_vJFgylKrZMTo-1TkXdQPXBEobZqG-G8OK-4xXA0pgfAFHGeBDxcdI_3uiYD0310b',
    content: 'Zero Trust detayları...'
  },
  {
    id: '3',
    category: 'Altyapı',
    date: '24 Ekim 2023',
    title: 'Kurumsal Veri Mimarisi ve Geleceğin Altyapıları',
    summary: 'Modern işletmeler için veri mimarisi stratejileri.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjcya9GokW1VO3X49deC0WhxinBkE4BsTeBiIDO-ouukrtCnZvVR7NAjTOVcLnAGllI-qieD_PaCwawjujpqo--OkDPBMhe6_nap-rAEkh1VPO36h_Ce93RK_fzsTDRF3oxdIqURBR0w7-7D9hN5Jt9hUNBe34zaIM2l7mHFveJEpcv1i8R9S4c-yiajqaSoWhlEjE68p4_C8-wrigZPym_rp4ULogW2hfvJaI_Js2ROKKD_6Z0qWTeUN4ZQcGxypjD2xK2GSnPPh6',
    content: `Modern işletmeler için veri mimarisi, sadece bir depolama stratejisi değil...`
  }
];

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Backend Developer (Java/Spring)',
    department: 'Yazılım',
    location: 'İstanbul (Bilişim Vadisi)',
    time: 'Tam Zamanlı',
    type: 'Uzaktan',
    exp: '5+ Yıl Deneyim'
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    department: 'Altyapı',
    location: 'Uzaktan',
    time: 'Tam Zamanlı',
    type: 'Uzaktan',
    exp: '3+ Yıl Deneyim'
  },
  {
    id: '3',
    title: 'Frontend Architect (React/Vue)',
    department: 'Yazılım',
    location: 'İstanbul (Bilişim Vadisi)',
    time: 'Tam Zamanlı',
    type: 'Hibrit',
    exp: '6+ Yıl Deneyim'
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'MegaMarket Zincirleri',
    category: 'Perakende',
    description: '500 mağazanın stok yönetim sisteminin bulut tabanlı merkezi bir yapıya taşınması.'
  },
  {
    id: '2',
    title: 'Global Lojistik A.Ş.',
    category: 'Lojistik',
    description: 'IoT sensörleri ile filo takibi ve yapay zeka destekli rota optimizasyonu projesi.'
  },
  {
    id: '3',
    title: 'Anadolu Enerji Dağıtım',
    category: 'Enerji',
    description: 'Akıllı şebeke (Smart Grid) yönetimi için SCADA sistemlerinin modernizasyonu.'
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchData = async () => {
    try {
      const [postsRes, jobsRes, projRes, pagesRes, msgRes] = await Promise.all([
        fetch('/api/blog_posts').then(r => r.json()),
        fetch('/api/jobs').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/pages').then(r => r.json()),
        fetch('/api/messages').then(r => r.json())
      ]);
      setBlogPosts(postsRes || []);
      setJobs(jobsRes || []);
      setProjects(projRes || []);
      setPages(pagesRes || []);
      setMessages(msgRes || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // API Helpers
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

  const addJob = async (job: Job) => postData('/api/jobs', job);
  const deleteJob = async (id: string) => deleteData(`/api/jobs/${id}`);

  const addProject = async (project: Project) => postData('/api/projects', project);
  const deleteProject = async (id: string) => deleteData(`/api/projects/${id}`);

  const addPage = async (page: Page) => postData('/api/pages', page);
  const deletePage = async (id: string) => deleteData(`/api/pages/${id}`);

  const sendMessage = async (msg: Message) => postData('/api/messages', msg);
  const deleteMessage = async (id: string) => deleteData(`/api/messages/${id}`);

  return (
    <DataContext.Provider value={{
      blogPosts, jobs, projects, pages, messages,
      addBlogPost, deleteBlogPost,
      addJob, deleteJob,
      addProject, deleteProject,
      addPage, deletePage,
      sendMessage, deleteMessage
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