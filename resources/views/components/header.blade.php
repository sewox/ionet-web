@php
    $menuItems = \App\Models\MenuItem::orderBy('order_index')->get();
    $settings = \App\Models\SiteSetting::pluck('value', 'ckey');
    $logoText = $settings['header_logo_text'] ?? 'I/ONET';
    $logoImage = $settings['header_logo_image'] ?? null;
    $logoHeight = $settings['header_logo_height'] ?? '40';
@endphp

<header 
    x-data="{ isMenuOpen: false }"
    class="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
            {{-- Logo --}}
            <div class="flex items-center">
                <a href="{{ url('/') }}" class="flex-shrink-0 flex items-center gap-2 group">
                    @if($logoImage)
                        <img 
                            src="{{ $logoImage }}" 
                            alt="Logo" 
                            class="w-auto object-contain"
                            style="height: {{ $logoHeight }}px"
                        >
                    @else
                        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/50 transition-all">
                            <span class="material-symbols-outlined text-2xl">hub</span>
                        </div>
                        <span class="font-black text-2xl tracking-tighter text-secondary group-hover:text-primary transition-colors">
                            {{ $logoText }}
                        </span>
                    @endif
                </a>
            </div>

            {{-- Desktop Navigation --}}
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-8">
                    @forelse($menuItems as $item)
                        <a 
                            href="{{ url($item->url) }}" 
                            class="px-4 py-2 rounded-lg text-sm font-bold transition-all {{ request()->is(ltrim($item->url, '/')) ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary hover:bg-gray-50' }}"
                        >
                            {{ $item->label }}
                        </a>
                    @empty
                        <a href="{{ url('/') }}" class="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-primary">Ana Sayfa</a>
                        <a href="{{ url('/infrastructure') }}" class="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-primary">Hizmetlerimiz</a>
                        <a href="{{ url('/references') }}" class="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-primary">Referanslar</a>
                        <a href="{{ url('/careers') }}" class="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-primary">Kariyer</a>
                        <a href="{{ url('/contact') }}" class="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-primary">İletişim</a>
                    @endforelse
                    
                    <a 
                        href="{{ url('/contact') }}" 
                        class="ml-4 px-6 py-2.5 bg-secondary text-white text-sm font-bold rounded-lg shadow-lg hover:bg-secondary-light hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                    >
                        <span>Teklif Al</span>
                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>

            {{-- Mobile menu button --}}
            <div class="-mr-2 flex md:hidden">
                <button 
                    @click="isMenuOpen = !isMenuOpen"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                    <span class="material-symbols-outlined" x-text="isMenuOpen ? 'close' : 'menu'"></span>
                </button>
            </div>
        </div>
    </div>

    {{-- Mobile menu --}}
    <div x-show="isMenuOpen" x-cloak class="md:hidden bg-white border-t border-gray-100">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            @forelse($menuItems as $item)
                <a 
                    href="{{ url($item->url) }}" 
                    @click="isMenuOpen = false"
                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                    {{ $item->label }}
                </a>
            @empty
                <a href="{{ url('/') }}" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">Ana Sayfa</a>
                <a href="{{ url('/infrastructure') }}" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">Hizmetlerimiz</a>
                <a href="{{ url('/contact') }}" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">İletişim</a>
            @endforelse
        </div>
    </div>
</header>

{{-- Spacer for fixed header --}}
<div class="h-20"></div>

<style>
    [x-cloak] { display: none !important; }
</style>
