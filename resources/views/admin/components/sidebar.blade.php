<aside class="w-64 bg-secondary min-h-screen flex flex-col" x-data="{ activeItem: '{{ request()->route()->getName() }}' }">
    {{-- Logo/Header --}}
    <div class="p-6 border-b border-gray-700">
        <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-2xl">admin_panel_settings</span>
            </div>
            <div>
                <h2 class="text-white font-bold text-lg">I/ONET</h2>
                <p class="text-gray-400 text-xs">Admin Panel</p>
            </div>
        </a>
    </div>

    {{-- Navigation --}}
    <nav class="flex-1 p-4 space-y-1">
        <a href="{{ route('admin.dashboard') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.dashboard') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="font-medium">Dashboard</span>
        </a>

        <a href="{{ route('admin.blog.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.blog.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">article</span>
            <span class="font-medium">Blog Yazıları</span>
        </a>

        <a href="{{ route('admin.messages.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.messages.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">mail</span>
            <div class="flex-1">
                <span class="font-medium">Gelen Mesajlar</span>
                @php
                    $unreadCount = \App\Models\ContactMessage::where('read', false)->count();
                @endphp
                @if($unreadCount > 0)
                    <span class="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{{ $unreadCount }}</span>
                @endif
            </div>
        </a>

        {{-- Divider --}}
        <div class="border-t border-gray-700 my-4"></div>
        
        <div class="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            İçerik Yönetimi
        </div>

        <a href="{{ route('admin.infrastructure.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.infrastructure.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">dns</span>
            <span class="font-medium">Altyapı Özellikleri</span>
        </a>

        <a href="{{ route('admin.jobs.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.jobs.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">work</span>
            <span class="font-medium">İş İlanları</span>
        </a>

        <a href="{{ route('admin.projects.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.projects.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">folder_open</span>
            <span class="font-medium">Projeler</span>
        </a>

        <a href="{{ route('admin.pages.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.pages.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">description</span>
            <span class="font-medium">Dinamik Sayfalar</span>
        </a>

        {{-- Divider --}}
        <div class="border-t border-gray-700 my-4"></div>
        
        <div class="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Ana Sayfa Bileşenleri
        </div>

        <a href="{{ route('admin.home-features.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.home-features.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">star</span>
            <span class="font-medium">Ana Sayfa Özellikleri</span>
        </a>

        <a href="{{ route('admin.home-services.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.home-services.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">apps</span>
            <span class="font-medium">Ana Sayfa Servisleri</span>
        </a>

        {{-- Divider --}}
        <div class="border-t border-gray-700 my-4"></div>
        
        <div class="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Kariyer Sayfası
        </div>

        <a href="{{ route('admin.career-values.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.career-values.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">favorite</span>
            <span class="font-medium">Kariyer Değerleri</span>
        </a>

        <a href="{{ route('admin.career-tech.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.career-tech.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">code</span>
            <span class="font-medium">Teknoloji Stack</span>
        </a>

        {{-- Divider --}}
        <div class="border-t border-gray-700 my-4"></div>
        
        <div class="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Ek İçerikler
        </div>

        <a href="{{ route('admin.tech-partners.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.tech-partners.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">business</span>
            <span class="font-medium">Teknoloji Partnerleri</span>
        </a>

        <a href="{{ route('admin.testimonials.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.testimonials.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">chat_bubble</span>
            <span class="font-medium">Müşteri Referansları</span>
        </a>

        <a href="{{ route('admin.legal-sections.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.legal-sections.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">gavel</span>
            <span class="font-medium">Yasal Bölümler</span>
        </a>

        {{-- Divider --}}
        <div class="border-t border-gray-700 my-4"></div>
        
        <div class="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Sistem Ayarları
        </div>

        <a href="{{ route('admin.menu-items.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.menu-items.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">menu</span>
            <span class="font-medium">Menü Öğeleri</span>
        </a>

        <a href="{{ route('admin.site-settings.index') }}" 
           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.site-settings.*') ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700' }}">
            <span class="material-symbols-outlined">settings</span>
            <span class="font-medium">Site Ayarları</span>
        </a>
    </nav>

    {{-- Footer Actions --}}
    <div class="p-4 border-t border-gray-700 space-y-2">
        <a href="{{ url('/') }}" target="_blank" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
            <span class="material-symbols-outlined">open_in_new</span>
            <span class="font-medium">Siteyi Görüntüle</span>
        </a>
        
        <form action="{{ route('admin.logout') }}" method="POST">
            @csrf
            <button type="submit" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-colors">
                <span class="material-symbols-outlined">logout</span>
                <span class="font-medium">Çıkış Yap</span>
            </button>
        </form>
    </div>
</aside>
