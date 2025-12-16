import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Infrastructure from './pages/Infrastructure';
import References from './pages/References';
import Pricing from './pages/Pricing';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Hide header on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/infrastructure' },
    { name: 'Referanslar', path: '/references' },
    { name: 'Kariyer', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]">hub</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-gray-900 leading-none">I/ONET</h1>
              <span className="text-[10px] font-bold tracking-widest text-primary uppercase leading-none block mt-0.5">TEKNOLOJİ</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-primary">Fiyatlar</Link>
             <Link to="/contact" className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-primary/20">
              Teklif Al
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
             <Link
                to="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Fiyatlar
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-primary hover:bg-gray-50"
              >
                Teklif Al
              </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 flex items-center justify-center bg-primary rounded text-white">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
              <span className="text-lg font-bold tracking-tight">I/ONET</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Teknolojiyi işletmeniz için bir yük olmaktan çıkarıp, en güçlü rekabet avantajınız haline getiriyoruz.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Hizmetler</h4>
            <ul className="space-y-4">
              <li><Link to="/infrastructure" className="text-gray-300 hover:text-primary transition-colors text-sm">Altyapı Yönetimi</Link></li>
              <li><Link to="/infrastructure" className="text-gray-300 hover:text-primary transition-colors text-sm">Siber Güvenlik</Link></li>
              <li><Link to="/infrastructure" className="text-gray-300 hover:text-primary transition-colors text-sm">Bulut Çözümleri</Link></li>
              <li><Link to="/infrastructure" className="text-gray-300 hover:text-primary transition-colors text-sm">Yazılım Geliştirme</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Kurumsal</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-primary transition-colors text-sm">Kariyer</Link></li>
              <li><Link to="/references" className="text-gray-300 hover:text-primary transition-colors text-sm">Referanslar</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="material-symbols-outlined text-primary text-base mt-0.5">location_on</span>
                <span>Teknopark İstanbul, Sanayi Mah.<br/>34906 Pendik/İstanbul</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="material-symbols-outlined text-primary text-base">call</span>
                <span>+90 (212) 555 00 00</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span className="material-symbols-outlined text-primary text-base">mail</span>
                <span>info@ionet.com.tr</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2024 I/ONET Teknoloji A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/legal" className="hover:text-primary">Gizlilik Politikası</Link>
            <Link to="/legal" className="hover:text-primary">Kullanım Şartları</Link>
            <Link to="/legal" className="hover:text-primary">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/infrastructure" element={<Infrastructure />} />
                <Route path="/references" element={<References />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/article/:id" element={<BlogPost />} />
                <Route path="/legal" element={<Legal />} />
                
                {/* Admin Routes */}
                {/* Redirect /admin to /admin/dashboard */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;