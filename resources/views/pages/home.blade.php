@extends('layouts.app')

@section('content')
<div class="bg-white min-h-screen font-sans text-[#111418]">
    {{-- Hero Section --}}
    <section class="relative w-full min-h-[600px] flex items-center justify-center bg-secondary pt-10 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div class="w-full h-full bg-cover bg-center opacity-40" 
                 style="background-image: url('{{ $settings['home_hero_image'] ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' }}')">
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
        </div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
            <div class="max-w-3xl flex flex-col gap-6 animate-fade-in">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span class="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                        {{ $settings['home_hero_badge'] ?? 'Geleceğin Teknolojisi' }}
                    </span>
                </div>
                
                <h1 class="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
                    {!! $settings['home_hero_title'] ?? 'Teknolojiyi Sizin İçin <span class="text-primary">Dizayn Ediyoruz.</span>' !!}
                </h1>
                
                <div class="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mt-4">
                    {!! $settings['home_hero_subtitle'] ?? 'Standart çözümlerle yetinmeyen işletmeler için sürdürülebilir, güvenli ve ölçeklenebilir altyapı mimarisi kurguluyoruz.' !!}
                </div>
                
                <div class="flex flex-wrap gap-4 pt-4">
                    <a href="{{ url($settings['home_hero_btn1_url'] ?? '/infrastructure') }}" 
                       class="flex items-center justify-center gap-2 h-12 px-8 bg-primary hover:bg-blue-700 text-white text-base font-bold rounded-lg transition-all shadow-lg shadow-primary/25">
                        <span>{{ $settings['home_hero_btn1_text'] ?? 'Mimarimizle Tanışın' }}</span>
                        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </a>
                    <a href="{{ url($settings['home_hero_btn2_url'] ?? '/contact') }}" 
                       class="flex items-center justify-center gap-2 h-12 px-8 bg-white/10 hover:bg-white/20 text-white text-base font-medium rounded-lg backdrop-blur-sm transition-all border border-white/10">
                        {{ $settings['home_hero_btn2_text'] ?? 'Hizmet Kataloğu' }}
                    </a>
                </div>
            </div>
        </div>
    </section>

    {{-- Why Us / Features Section --}}
    <section class="w-full bg-white py-24 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div class="max-w-2xl">
                    <h2 class="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
                        {!! $settings['home_motto_title'] ?? 'Biz Tamirci Değil, <span class="text-primary border-b-4 border-primary/20">Mimarız.</span>' !!}
                    </h2>
                    <div class="text-gray-600 text-lg leading-relaxed">
                        {!! $settings['home_motto_desc'] ?? 'İşletmeniz için sadece anlık sorunları çözen değil, geleceği bugünden inşa eden sürdürülebilir teknolojik yapılar kuruyoruz.' !!}
                    </div>
                </div>
                <div class="hidden md:block pb-2">
                    <span class="material-symbols-outlined text-gray-200 text-6xl">architecture</span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @forelse($features as $feature)
                    <div class="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                        <div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span class="material-symbols-outlined text-3xl">{{ $feature->icon }}</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $feature->title }}</h3>
                        <p class="text-gray-600 leading-relaxed text-sm">{!! $feature->description !!}</p>
                    </div>
                @empty
                    {{-- Default features --}}
                    <div class="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all">
                        <div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-3xl">hub</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Stratejik Planlama</h3>
                        <p class="text-gray-600 leading-relaxed text-sm">İş hedeflerinize uygun, uzun vadeli ve sürdürülebilir teknoloji yol haritaları.</p>
                    </div>
                    <div class="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all">
                        <div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-3xl">security</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Güvenlik Mimarisi</h3>
                        <p class="text-gray-600 leading-relaxed text-sm">Her katmanda proaktif güvenlik önlemleri ile verinizi koruyan sıfır güven yaklaşımı.</p>
                    </div>
                    <div class="group p-8 rounded-2xl bg-surface-light hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all">
                        <div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-3xl">speed</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Ölçeklenebilirlik</h3>
                        <p class="text-gray-600 leading-relaxed text-sm">Büyüyen iş hacminize anında yanıt veren, esnek ve performanslı sistem tasarımı.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    {{-- Services Grid --}}
    <section class="w-full bg-surface-light py-24">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
                <span class="text-primary font-bold text-sm uppercase tracking-widest mb-2">Uzmanlık Alanlarımız</span>
                <h2 class="text-[#111418] text-3xl md:text-4xl font-black leading-tight tracking-tight">
                    {{ $settings['home_services_title'] ?? 'Teknoloji Ekosisteminizi Yönetiyoruz' }}
                </h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @forelse($services as $service)
                    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                        <div class="h-48 w-full bg-gray-200 relative overflow-hidden">
                            <div class="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                                 style="background-image: url('{{ $service->image ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' }}')">
                            </div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-xl font-bold text-gray-900">{{ $service->title }}</h3>
                                <span class="material-symbols-outlined text-primary">{{ $service->icon }}</span>
                            </div>
                            <div class="text-gray-600 text-sm leading-relaxed mb-6">
                                {!! $service->description !!}
                            </div>
                            <a href="{{ url($service->link ?? '/infrastructure') }}" class="text-primary text-sm font-bold inline-flex items-center group-hover:gap-2 transition-all">
                                Detaylı İncele <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                @empty
                    {{-- Default service cards if empty --}}
                    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div class="h-48 w-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                        <div class="p-8">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">Altyapı Hizmetleri</h3>
                            <p class="text-gray-600 text-sm mb-6">Kurumsal ağ tasarımı, sunucu sanallaştırma ve veri merkezi yönetimi.</p>
                            <a href="{{ url('/infrastructure') }}" class="text-primary text-sm font-bold">Detaylı İncele →</a>
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    {{-- CTA Section --}}
    <section class="w-full bg-white py-20 border-t border-gray-100">
        <div class="max-w-[1000px] mx-auto px-6">
            <div class="bg-gradient-to-br from-secondary to-gray-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                <div class="absolute top-0 right-0 p-8 opacity-10">
                    <span class="material-symbols-outlined text-[200px] text-white">hub</span>
                </div>
                <h2 class="text-white text-3xl md:text-4xl font-bold mb-6 relative z-10">
                    {{ $settings['home_cta_title'] ?? 'Projenizi Mimar Gözüyle Değerlendirelim' }}
                </h2>
                <div class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                    {!! $settings['home_cta_desc'] ?? 'Mevcut altyapınızı analiz edelim, eksikleri belirleyelim ve işletmenizi geleceğe taşıyacak yol haritasını birlikte çizelim.' !!}
                </div>
                <a href="{{ url($settings['home_cta_btn_url'] ?? '/contact') }}" 
                   class="bg-primary hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 relative z-10 inline-block">
                    {{ $settings['home_cta_btn_text'] ?? 'Ücretsiz Ön Görüşme Planla' }}
                </a>
            </div>
        </div>
    </section>
</div>
@endsection
