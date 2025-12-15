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

interface DataContextType {
  blogPosts: BlogPost[];
  jobs: Job[];
  projects: Project[];
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA36eoYAQIvBio9r_aIUu7CATagqffdaSfWY6i0IvSvW3GL1_4YoFDgQnc5JzqZMKfy4jbkQkDxQRG4yuEQbHGFQ8Z4g_xgj_tO5J-dYHz0RBeEA3Wo6OLRlP2tVbhV6xAcItw4CggAOu6HqV9-0TRCluN9Ka70-S_klANa4OWLh6PdBIjDJ2rMrU-XgzXbTdllnHwaxLUqUZd_vJFgylKrZMTo-1TkXdQPXBEobZqG-G8OK-4xXA0pgfAFHGeBDxcdI_3uiYD0310b',
    content: 'Zero Trust detayları...'
  },
  {
    id: '3',
    category: 'Altyapı',
    date: '24 Ekim 2023',
    title: 'Kurumsal Veri Mimarisi ve Geleceğin Altyapıları',
    summary: 'Modern işletmeler için veri mimarisi stratejileri.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjcya9GokW1VO3X49deC0WhxinBkE4BsTeBiIDO-ouukrtCnZvVR7NAjTOVcLnAGllI-qieD_PaCwawjujpqo--OkDPBMhe6_nap-rAEkh1VPO36h_Ce93RK_fzsTDRF3oxdIqURBR0w7-7D9hN5Jt9hUNBe34zaIM2l7mHFveJEpcv1i8R9S4c-yiajqaSoWhlEjE68p4_C8-wrigZPym_rp4ULogW2hfvJaI_Js2ROKKd_6Z0qWTeUN4ZQcGxypjD2xK2GSnPPh6',
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
  const [db, setDb] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Initialize SQLite DB
  useEffect(() => {
    const initDB = async () => {
      // @ts-ignore
      if (!window.initSqlJs) return;
      
      try {
        // @ts-ignore
        const SQL = await window.initSqlJs({
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        const savedDb = localStorage.getItem('sqliteDb');
        let database;

        if (savedDb) {
           const u8 = new Uint8Array(JSON.parse(savedDb));
           database = new SQL.Database(u8);
        } else {
           database = new SQL.Database();
           
           // Initialize Tables
           database.run("CREATE TABLE IF NOT EXISTS blog_posts (id TEXT PRIMARY KEY, title TEXT, category TEXT, date TEXT, summary TEXT, image TEXT, content TEXT)");
           database.run("CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, title TEXT, type TEXT, location TEXT, time TEXT, exp TEXT, department TEXT)");
           database.run("CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, title TEXT, category TEXT, description TEXT, image TEXT)");
           
           // Insert Initial Data
           initialBlogPosts.forEach(p => {
             database.run("INSERT INTO blog_posts VALUES (?,?,?,?,?,?,?)", [p.id, p.title, p.category, p.date, p.summary, p.image, p.content]);
           });
           initialJobs.forEach(j => {
             database.run("INSERT INTO jobs VALUES (?,?,?,?,?,?,?)", [j.id, j.title, j.type, j.location, j.time, j.exp, j.department]);
           });
           initialProjects.forEach(p => {
             database.run("INSERT INTO projects VALUES (?,?,?,?,?)", [p.id, p.title, p.category, p.description, p.image || ""]);
           });
        }
        
        setDb(database);
        refreshData(database);
      } catch (err) {
        console.error("Failed to init database:", err);
      }
    };

    initDB();
  }, []);

  // Helper to convert SQL result to array of objects
  const resultToObjects = (execResult: any) => {
    if (!execResult || execResult.length === 0) return [];
    const columns = execResult[0].columns;
    const values = execResult[0].values;
    return values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, i: number) => {
        obj[col] = row[i];
      });
      return obj;
    });
  };

  const refreshData = (database: any) => {
    if (!database) return;
    
    try {
      const postsRes = database.exec("SELECT * FROM blog_posts");
      setBlogPosts(resultToObjects(postsRes) as BlogPost[]);

      const jobsRes = database.exec("SELECT * FROM jobs");
      setJobs(resultToObjects(jobsRes) as Job[]);

      const projectsRes = database.exec("SELECT * FROM projects");
      setProjects(resultToObjects(projectsRes) as Project[]);
    } catch(e) {
      console.error("Error fetching data", e);
    }
  };

  const saveDb = (database: any) => {
    if (!database) return;
    const data = database.export();
    const arr = Array.from(data);
    localStorage.setItem('sqliteDb', JSON.stringify(arr));
    refreshData(database);
  };

  // Actions
  const addBlogPost = (post: BlogPost) => {
    if (!db) return;
    db.run("INSERT INTO blog_posts VALUES (?,?,?,?,?,?,?)", [post.id, post.title, post.category, post.date, post.summary, post.image, post.content || ""]);
    saveDb(db);
  };

  const deleteBlogPost = (id: string) => {
    if (!db) return;
    db.run("DELETE FROM blog_posts WHERE id = ?", [id]);
    saveDb(db);
  };

  const addJob = (job: Job) => {
    if (!db) return;
    db.run("INSERT INTO jobs VALUES (?,?,?,?,?,?,?)", [job.id, job.title, job.type, job.location, job.time, job.exp, job.department]);
    saveDb(db);
  };

  const deleteJob = (id: string) => {
    if (!db) return;
    db.run("DELETE FROM jobs WHERE id = ?", [id]);
    saveDb(db);
  };

  const addProject = (project: Project) => {
    if (!db) return;
    db.run("INSERT INTO projects VALUES (?,?,?,?,?)", [project.id, project.title, project.category, project.description, project.image || ""]);
    saveDb(db);
  };

  const deleteProject = (id: string) => {
    if (!db) return;
    db.run("DELETE FROM projects WHERE id = ?", [id]);
    saveDb(db);
  };

  return (
    <DataContext.Provider value={{
      blogPosts, jobs, projects,
      addBlogPost, deleteBlogPost,
      addJob, deleteJob,
      addProject, deleteProject
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