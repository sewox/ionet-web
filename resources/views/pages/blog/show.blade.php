@extends('layouts.app')

@section('content')
<div class="flex flex-col items-center">
    <article class="w-full max-w-[800px] px-6 py-12">
        <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
                <span class="bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded uppercase">{{ $post->category ?? 'Genel' }}</span>
                <span class="text-gray-400 text-xs uppercase font-medium">5 dk okuma</span>
            </div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {{ $post->title }}
            </h1>
            
            <div class="flex items-center justify-between border-b border-gray-100 pb-6">
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="material-symbols-outlined text-gray-500">group</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-gray-900 text-sm">I/ONET Teknoloji Ekibi</span>
                        <span class="text-xs text-gray-500">{{ $post->date }}</span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="p-2 text-gray-400 hover:text-primary"><span class="material-symbols-outlined">share</span></button>
                    <button class="p-2 text-gray-400 hover:text-primary"><span class="material-symbols-outlined">bookmark</span></button>
                </div>
            </div>
        </div>

        <div class="mb-8 rounded-2xl overflow-hidden shadow-sm">
            <img src="{{ $post->image ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072' }}" alt="{{ $post->title }}" class="w-full h-auto">
        </div>

        <div class="prose prose-lg prose-blue max-w-none text-gray-800">
            <p class="font-medium text-xl leading-relaxed mb-6">{{ $post->summary }}</p>
            <div class="admin-html-content">{!! $post->content ?? '<p>İçerik hazırlanıyor...</p>' !!}</div>
        </div>

        {{-- Tags --}}
        <div class="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-200 cursor-pointer">#{{ str_replace(' ', '', $post->category ?? 'teknoloji') }}</span>
            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-200 cursor-pointer">#Teknoloji</span>
        </div>

        {{-- Feedback --}}
        <div class="mt-8 bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="font-bold text-gray-900 text-sm">Bu makaleyi faydalı buldunuz mu?</p>
            <div class="flex gap-3">
                <button class="flex items-center gap-2 px-4 py-2 bg-white rounded shadow-sm border border-gray-200 hover:border-primary text-gray-600 hover:text-primary transition-all">
                    <span class="material-symbols-outlined text-lg">thumb_up</span>
                    <span class="text-sm font-bold">Evet</span>
                </button>
                <button class="flex items-center gap-2 px-4 py-2 bg-white rounded shadow-sm border border-gray-200 hover:border-red-500 text-gray-600 hover:text-red-500 transition-all">
                    <span class="material-symbols-outlined text-lg">thumb_down</span>
                    <span class="text-sm font-bold">Hayır</span>
                </button>
            </div>
        </div>
    </article>

    {{-- Related Articles --}}
    <section class="w-full bg-surface-light py-16 mt-8">
        <div class="max-w-[800px] mx-auto px-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-8">İlgili Makaleler</h3>
            <div class="space-y-6">
                @php
                    $relatedPosts = \App\Models\BlogPost::where('id', '!=', $post->id)->limit(2)->get();
                @endphp
                @foreach($relatedPosts as $related)
                    <a href="{{ route('blog.show', $related->id) }}" class="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 hover:shadow-md transition-all cursor-pointer">
                        <div class="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                            <img src="{{ $related->image ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072' }}" alt="{{ $related->title }}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex flex-col justify-center">
                            <span class="text-primary text-[10px] font-bold uppercase mb-1">{{ $related->category ?? 'Genel' }}</span>
                            <h4 class="font-bold text-gray-900 mb-1">{{ $related->title }}</h4>
                            <span class="text-xs text-gray-500">{{ $related->date }}</span>
                        </div>
                    </a>
                @endforeach
            </div>
            {{-- The original "Tüm Makaleleri Gör" link is replaced by the new CTA section --}}
        </div>
    </section>

    {{-- CTA Section --}}
    <section class="bg-secondary text-white py-16 text-center">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-3xl font-bold mb-4">Daha Fazla İçerik Keşfedin</h2>
            <p class="text-gray-400 mb-8">Teknoloji, altyapı, yazılım ve daha fazlasıyla ilgili güncel makaleler için blog sayfamıza göz atabilirsiniz.</p>
            <a href="{{ route('blog.index') }}" class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors">
                <span class="material-symbols-outlined">article</span>
                Tüm Makaleleri Gör
            </a>
        </div>
    </section>
</div>
@endsection
