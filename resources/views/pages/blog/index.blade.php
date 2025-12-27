@extends('layouts.app')

@section('content')
<div class="flex flex-col">
    {{-- Hero Section --}}
    <section class="bg-white border-b border-gray-100 pt-10 pb-16">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center gap-2 mb-4">
                <span class="h-1 w-8 bg-primary rounded-full"></span>
                <span class="text-primary font-bold text-xs tracking-widest uppercase">Bilgi Merkezi</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Güncel Teknoloji & Haberler</h1>
            <p class="text-lg text-gray-500 max-w-2xl leading-relaxed">
                Teknoloji trendleri, derinlemesine sektör analizleri ve I/ONET uzmanlık alanlarıyla ilgili en son gelişmeleri takip edin.
            </p>

            {{-- Featured Article --}}
            @if($posts->count() > 0)
                @php $featured = $posts->first(); @endphp
                <div class="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                    <div class="lg:w-1/2 h-64 lg:h-auto bg-gray-900 relative">
                        <div class="absolute inset-0 bg-cover bg-center opacity-80" style="background-image: url('{{ $featured->image ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072' }}');"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div class="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="bg-blue-50 text-primary text-xs font-bold px-2 py-1 rounded uppercase">Öne Çıkan</span>
                            <span class="text-gray-400 text-sm flex items-center gap-1">
                                <span class="material-symbols-outlined text-[16px]">calendar_today</span> {{ $featured->date }}
                            </span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4 leading-tight">{{ $featured->title }}</h2>
                        <p class="text-gray-600 mb-6 leading-relaxed line-clamp-3">{{ strip_tags($featured->summary) }}</p>
                        <a href="{{ route('blog.show', $featured->id) }}" class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            <span>Okumaya Devam Et</span>
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>
                </div>
            @else
                <div class="mt-12 p-10 text-center bg-gray-50 rounded-2xl border border-gray-200">
                    <p class="text-gray-500">Henüz blog yazısı eklenmemiş.</p>
                </div>
            @endif
        </div>
    </section>

    {{-- Toolbar --}}
    <section class="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4 items-center">
            <div class="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                <button class="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors shadow-sm bg-primary text-white">
                    Tümü
                </button>
                <button class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100">
                    Yazılım
                </button>
                <button class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100">
                    Altyapı
                </button>
            </div>
            <div class="relative w-full md:w-64">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input 
                    type="text" 
                    placeholder="Makale veya konu ara..." 
                    class="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" 
                >
            </div>
        </div>
    </section>

    {{-- Grid --}}
    <section class="bg-background-light py-16">
        <div class="max-w-7xl mx-auto px-6">
            @if($posts->count() > 1)
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($posts->slice(1) as $post)
                        <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100">
                            <div class="h-48 overflow-hidden relative">
                                <div class="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('{{ $post->image ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072' }}');"></div>
                            </div>
                            <div class="p-6 flex flex-col h-full">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-primary text-xs font-bold uppercase">{{ $post->category ?? 'Genel' }}</span>
                                    <span class="text-gray-400 text-xs">{{ $post->date }}</span>
                                </div>
                                <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{{ $post->title }}</h3>
                                <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ strip_tags($post->summary) }}</p>
                                <a href="{{ route('blog.show', $post->id) }}" class="text-sm font-bold text-primary flex items-center gap-1 mt-auto">
                                    Devamını Oku <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </section>

    {{-- Newsletter --}}
    <section class="bg-secondary py-16">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-white text-3xl font-bold mb-4">Teknoloji Dünyasından Geri Kalmayın</h2>
            <p class="text-gray-400 mb-8 max-w-xl mx-auto">En son trendler, I/ONET haberleri ve derinlemesine teknoloji analizleri için bültenimize abone olun.</p>
            <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="E-posta adresiniz" class="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <button class="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                    Abone Ol
                </button>
            </div>
        </div>
    </section>
</div>
@endsection
