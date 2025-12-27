@extends('layouts.app')

@section('content')
{{-- Hero Section --}}
<section class="relative w-full py-20 md:py-32 bg-gradient-to-br from-secondary via-secondary to-gray-800 overflow-hidden">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #127ae2 1px, transparent 1px); background-size: 50px 50px;"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="text-center max-w-4xl mx-auto">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-8">
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span class="text-blue-200 text-sm font-bold uppercase tracking-wider">Kariyer Fırsatları</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                {{ $settings['careers_hero_title'] ?? 'Geleceği Birlikte İnşa Edelim' }}
            </h1>
            
            <p class="text-xl text-gray-300 mb-10 leading-relaxed">
                {{ $settings['careers_hero_desc'] ?? 'Tutkulu, yaratıcı ve teknolojiye aşık bir ekiple çalışmak için bize katıl. Kariyerinizi bir sonraki seviyeye taşıyın.' }}
            </p>
            
            <a href="#open-positions" class="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/25">
                <span>Açık Pozisyonlar</span>
                <span class="material-symbols-outlined">arrow_downward</span>
            </a>
        </div>
    </div>
</section>

{{-- Values Section --}}
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Değerlerimiz</span>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                {{ $settings['careers_values_title'] ?? 'Neden Bizimle Çalışmalısın?' }}
            </h2>
            <p class="text-gray-600 text-lg">
                {{ $settings['careers_values_desc'] ?? 'İnovasyon, işbirliği ve sürekli öğrenme kültürümüzle fark yaratıyoruz.' }}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @forelse($values as $value)
                <div class="text-center p-6 rounded-2xl bg-surface-light hover:bg-white hover:shadow-lg transition-all group">
                    <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <span class="material-symbols-outlined text-4xl">{{ $value->icon }}</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $value->title }}</h3>
                    <p class="text-sm text-gray-600">{!! $value->description !!}</p>
                </div>
            @empty
                <div class="text-center p-6 rounded-2xl bg-surface-light">
                    <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="material-symbols-outlined text-4xl">lightbulb</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">İnovasyon</h3>
                    <p class="text-sm text-gray-600">Yenilikçi fikirlere açık ortam</p>
                </div>
                <div class="text-center p-6 rounded-2xl bg-surface-light">
                    <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="material-symbols-outlined text-4xl">groups</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">İşbirliği</h3>
                    <p class="text-sm text-gray-600">Güçlü takım ruhu</p>
                </div>
            @endforelse
        </div>
    </div>
</section>

{{-- Tech Stack Section --}}
<section class="py-20 bg-surface-light border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Kullandığımız Teknolojiler</h2>
            <p class="text-gray-600">Modern ve güncel teknolojilerle çalış</p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-6 md:gap-12">
            @forelse($techStack as $tech)
                <div class="flex items-center gap-3 text-lg font-bold text-gray-700 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-2xl">{{ $tech->icon }}</span>
                    <span>{{ $tech->name }}</span>
                </div>
            @empty
                <div class="flex items-center gap-3 text-lg font-bold text-gray-700">
                    <span class="material-symbols-outlined text-2xl">code</span>
                    <span>React</span>
                </div>
                <div class="flex items-center gap-3 text-lg font-bold text-gray-700">
                    <span class="material-symbols-outlined text-2xl">database</span>
                    <span>PostgreSQL</span>
                </div>
                <div class="flex items-center gap-3 text-lg font-bold text-gray-700">
                    <span class="material-symbols-outlined text-2xl">cloud</span>
                    <span>AWS</span>
                </div>
            @endforelse
        </div>
    </div>
</section>

{{-- Open Positions --}}
<section id="open-positions" class="py-24 bg-white">
    <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
            <span class="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">İş İlanları</span>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900">Açık Pozisyonlar</h2>
        </div>

        <div class="space-y-6">
            @forelse($jobs as $job)
                <div class="bg-surface-light rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ $job->title }}</h3>
                            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[18px]">location_on</span>
                                    {{ $job->location }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[18px]">schedule</span>
                                    {{ $job->type }}
                                </span>
                            </div>
                        </div>
                        <a href="{{ url('/contact') }}" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all whitespace-nowrap">
                            Başvur
                        </a>
                    </div>
                    <p class="text-gray-700 leading-relaxed">{!! $job->description !!}</p>
                </div>
            @empty
                <div class="text-center py-16">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="material-symbols-outlined text-5xl text-gray-400">work</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Şu Anda Açık Pozisyon Yok</h3>
                    <p class="text-gray-600 mb-6">Yeni ilanlar için takipte kalın veya özgeçmişinizi gönderin</p>
                    <a href="{{ url('/contact') }}" class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all">
                        <span>CV Gönder</span>
                        <span class="material-symbols-outlined">send</span>
                    </a>
                </div>
            @endforelse
        </div>
    </div>
</section>
@endsection
