@extends('layouts.admin')

@section('content')
<div class="min-h-screen bg-gray-50">
    {{-- Admin Header --}}
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center gap-4">
                    <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-[24px]">hub</span>
                    </div>
                    <h1 class="text-xl font-bold text-gray-900">I/ONET Admin</h1>
                </div>
                <div class="flex items-center gap-4">
                    <a href="{{ url('/') }}" target="_blank" class="text-sm text-gray-600 hover:text-primary flex items-center gap-1">
                        <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                        Siteyi Görüntüle
                    </a>
                    <form method="POST" action="{{ route('admin.logout') }}">
                        @csrf
                        <button type="submit" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[18px]">logout</span>
                            Çıkış
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {{-- Stats Cards --}}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span class="material-symbols-outlined text-blue-600">article</span>
                    </div>
                    <span class="text-3xl font-black text-gray-900">{{ $stats['totalPosts'] }}</span>
                </div>
                <h3 class="text-sm font-medium text-gray-600">Blog Yazıları</h3>
            </div>

            <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span class="material-symbols-outlined text-green-600">work</span>
                    </div>
                    <span class="text-3xl font-black text-gray-900">{{ $stats['totalJobs'] }}</span>
                </div>
                <h3 class="text-sm font-medium text-gray-600">İş İlanları</h3>
            </div>

            <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span class="material-symbols-outlined text-purple-600">folder</span>
                    </div>
                    <span class="text-3xl font-black text-gray-900">{{ $stats['totalProjects'] }}</span>
                </div>
                <h3 class="text-sm font-medium text-gray-600">Projeler</h3>
            </div>

            <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span class="material-symbols-outlined text-orange-600">mail</span>
                    </div>
                    <span class="text-3xl font-black text-gray-900">{{ $stats['totalMessages'] }}</span>
                </div>
                <h3 class="text-sm font-medium text-gray-600">Mesajlar</h3>
            </div>
        </div>

        {{-- Quick Actions --}}
        <div class="bg-white rounded-xl p-6 border border-gray-200 mb-8">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/admin/blog" class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all">
                    <span class="material-symbols-outlined text-3xl text-primary mb-2">article</span>
                    <span class="text-sm font-medium">Blog Yönetimi</span>
                </a>
                <a href="/admin/jobs" class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all">
                    <span class="material-symbols-outlined text-3xl text-primary mb-2">work</span>
                    <span class="text-sm font-medium">İş İlanları</span>
                </a>
                <a href="{{ route('admin.site-settings.index') }}" class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all">
                    <span class="material-symbols-outlined text-3xl text-primary mb-2">settings</span>
                    <span class="text-sm font-medium">Site Ayarları</span>
                </a>
                <a href="/admin/messages" class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all">
                    <span class="material-symbols-outlined text-3xl text-primary mb-2">mail</span>
                    <span class="text-sm font-medium">Mesajlar</span>
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {{-- Recent Messages --}}
            <div class="bg-white rounded-xl p-6 border border-gray-200">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Son Mesajlar</h2>
                <div class="space-y-4">
                    @forelse($recentMessages as $message)
                        <div class="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-gray-600">person</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-gray-900">{{ $message->name }} {{ $message->surname }}</p>
                                <p class="text-sm text-gray-600 truncate">{{ $message->email }}</p>
                                <p class="text-xs text-gray-400 mt-1">{{ $message->created_at }}</p>
                            </div>
                        </div>
                    @empty
                        <p class="text-sm text-gray-500 text-center py-4">Henüz mesaj yok</p>
                    @endforelse
                </div>
            </div>

            {{-- Recent Posts --}}
            <div class="bg-white rounded-xl p-6 border border-gray-200">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Son Blog Yazıları</h2>
                <div class="space-y-4">
                    @forelse($recentPosts as $post)
                        <div class="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                            <div class="w-16 h-16 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                                @if($post->image)
                                    <img src="{{ $post->image }}" alt="{{ $post->title }}" class="w-full h-full object-cover">
                                @else
                                    <div class="w-full h-full flex items-center justify-center">
                                        <span class="material-symbols-outlined text-gray-400">image</span>
                                    </div>
                                @endif
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-gray-900 line-clamp-2">{{ $post->title }}</p>
                                <p class="text-xs text-gray-400 mt-1">{{ $post->date }}</p>
                            </div>
                        </div>
                    @empty
                        <p class="text-sm text-gray-500 text-center py-4">Henüz blog yazısı yok</p>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
