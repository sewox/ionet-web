@extends('layouts.app')

@section('content')
<div class="flex flex-col">
    {{-- Hero --}}
    <section class="relative w-full py-20 bg-secondary overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-20" style="background-image: radial-gradient(#127ae2 1px, transparent 1px); background-size: 32px 32px;"></div>
        <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="animate-fade-in-up">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm mb-6">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span class="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                        {{ $settings['infra_hero_badge_title'] ?? 'Altyapı & Yönetim' }}
                    </span>
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                    {{ $settings['infra_hero_title'] ?? 'İşletmenizin Dijital Omurgasını Güçlendiriyoruz' }}
                </h1>
                <p class="text-lg text-gray-300 mb-8 leading-relaxed">
                    {{ $settings['infra_hero_desc'] ?? 'Kesintisiz, güvenli ve yüksek performanslı BT altyapı çözümleri ile operasyonel verimliliğinizi maksimize ediyoruz.' }}
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="#features" class="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                        Çözümlerimiz
                        <span class="material-symbols-outlined">arrow_downward</span>
                    </a>
                    <a href="{{ url('/contact') }}" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-all border border-white/10">
                        Teklif Alın
                    </a>
                </div>
            </div>
            <div class="relative lg:h-[500px] flex items-center justify-center animate-fade-in">
                <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform scale-75"></div>
                <img 
                    src="{{ $settings['infra_hero_img'] ?? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop' }}" 
                    alt="Infrastructure" 
                    class="relative z-10 rounded-2xl shadow-2xl border border-gray-700/50 w-full h-full object-cover"
                >
                {{-- Floating Badge --}}
                <div class="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl z-20 max-w-[200px] hidden md:block">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="p-2 bg-green-100 text-green-600 rounded-lg">
                            <span class="material-symbols-outlined">check_circle</span>
                        </div>
                        <span class="font-bold text-gray-900 text-sm">
                            {{ $settings['infra_hero_badge_title'] ?? 'Uptime Garantisi' }}
                        </span>
                    </div>
                    <p class="text-xs text-gray-500">
                        {{ $settings['infra_hero_badge_desc'] ?? '%99.9 Uptime ile iş sürekliliğinizi garanti altına alıyoruz.' }}
                    </p>
                </div>
            </div>
        </div>
    </section>

    {{-- Features Grid --}}
    <section id="features" class="py-24 bg-surface-light">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <span class="text-primary font-bold text-sm uppercase tracking-widest mb-2">Hizmetlerimiz</span>
                <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    {{ $settings['infra_features_title'] ?? 'Uçtan Uca Altyapı Yönetimi' }}
                </h2>
                <p class="text-gray-600 text-lg">
                    {{ $settings['infra_features_desc'] ?? 'Modern işletmelerin ihtiyaç duyduğu tüm teknoloji katmanlarında uzman desteği sağlıyoruz.' }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @forelse($features as $feature)
                    <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
                        <div class="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span class="material-symbols-outlined text-3xl">{{ $feature->icon }}</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $feature->title }}</h3>
                        <p class="text-gray-600 text-sm leading-relaxed mb-6">{!! $feature->description !!}</p>
                        @if($feature->points)
                            <ul class="space-y-2 border-t border-gray-50 pt-4">
                                @foreach(explode("\n", $feature->points) as $point)
                                    <li class="flex items-start gap-2 text-xs text-gray-500 font-medium">
                                        <span class="material-symbols-outlined text-[16px] text-green-500 shrink-0">check</span>
                                        {{ $point }}
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                @empty
                    {{-- Default features --}}
                    <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                        <div class="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-3xl">storage</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Sunucu Yönetimi ve Optimizasyon</h3>
                        <p class="text-gray-600 text-sm leading-relaxed mb-6">
                            Fiziksel ve sanal sunucularınızın performansını maksimize ediyoruz.
                        </p>
                        <ul class="space-y-2 border-t border-gray-50 pt-4">
                            <li class="flex items-start gap-2 text-xs text-gray-500 font-medium">
                                <span class="material-symbols-outlined text-[16px] text-green-500 shrink-0">check</span>
                                Sanallaştırma (VMware / Hyper-V)
                            </li>
                            <li class="flex items-start gap-2 text-xs text-gray-500 font-medium">
                                <span class="material-symbols-outlined text-[16px] text-green-500 shrink-0">check</span>
                                Linux & Windows Server Yönetimi
                            </li>
                        </ul>
                    </div>
                    <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                        <div class="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-3xl">hub</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Ağ ve Güvenlik Çözümleri</h3>
                        <p class="text-gray-600 text-sm leading-relaxed mb-6">
                            Kurumsal ağınızın omurgasını güçlendiriyoruz.
                        </p>
                        <ul class="space-y-2 border-t border-gray-50 pt-4">
                            <li class="flex items-start gap-2 text-xs text-gray-500 font-medium">
                                <span class="material-symbols-outlined text-[16px] text-green-500 shrink-0">check</span>
                                LAN / WAN / Wi-Fi Planlama
                            </li>
                            <li class="flex items-start gap-2 text-xs text-gray-500 font-medium">
                                <span class="material-symbols-outlined text-[16px] text-green-500 shrink-0">check</span>
                                Firewall ve VPN Kurulumu
                            </li>
                        </ul>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    {{-- Tech Partners --}}
    <section class="py-20 bg-white border-y border-gray-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-2xl font-bold text-gray-900">
                    {{ $settings['infra_partners_title'] ?? 'Teknoloji Partnerlerimiz' }}
                </h2>
            </div>
            <div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                @forelse($techPartners as $partner)
                    <div class="flex items-center gap-2 text-xl font-bold text-gray-400 hover:text-primary transition-colors cursor-default">
                        <span class="material-symbols-outlined">{{ $partner->icon }}</span>
                        <span>{{ $partner->name }}</span>
                    </div>
                @empty
                    <div class="flex items-center gap-2 text-xl font-bold text-gray-400 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined">grid_view</span>
                        <span>Microsoft</span>
                    </div>
                    <div class="flex items-center gap-2 text-xl font-bold text-gray-400 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined">cloud</span>
                        <span>AWS</span>
                    </div>
                    <div class="flex items-center gap-2 text-xl font-bold text-gray-400 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined">router</span>
                        <span>Cisco</span>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    {{-- CTA --}}
    <section class="py-24 bg-surface-light">
        <div class="max-w-5xl mx-auto px-6">
            <div class="bg-secondary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div class="absolute top-0 left-0 w-full h-full opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 24px 24px;"></div>
                <div class="relative z-10">
                    <span class="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">
                        {{ $settings['infra_cta_badge'] ?? 'Ücretsiz Analiz' }}
                    </span>
                    <h2 class="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {{ $settings['infra_cta_title'] ?? 'Altyapınız Ne Kadar Güçlü?' }}
                    </h2>
                    <p class="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
                        {{ $settings['infra_cta_desc'] ?? 'Mevcut sistemlerinizi ücretsiz analiz edelim, riskleri ve iyileştirme fırsatlarını raporlayalım.' }}
                    </p>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="{{ url('/contact') }}" class="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1">
                            {{ $settings['infra_cta_btn1_text'] ?? 'Analiz Talep Et' }}
                        </a>
                        <a href="{{ url('/contact') }}" class="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10">
                            {{ $settings['infra_cta_btn2_text'] ?? 'Bize Ulaşın' }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

@push('styles')
<style>
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out;
    }
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>
@endpush
@endsection
