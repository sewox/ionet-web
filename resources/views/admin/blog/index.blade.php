@extends('layouts.admin')

@section('content')
<div class="mb-8">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
            <p class="text-gray-500 mt-1">Tüm blog yazılarını görüntüle ve düzenle</p>
        </div>
        <a href="{{ route('admin.blog.create') }}" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">add</span>
            Yeni Yazı
        </a>
    </div>

    {{-- Filters --}}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <form method="GET" action="{{ route('admin.blog.index') }}" class="flex gap-4">
            <div class="flex-1">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}" 
                    placeholder="Başlık ara..." 
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
            </div>
            <div class="w-48">
                <select 
                    name="category" 
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                    <option value="">Tüm Kategoriler</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat }}" {{ request('category') == $cat ? 'selected' : '' }}>
                            {{ $cat }}
                        </option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                Filtrele
            </button>
            @if(request()->hasAny(['search', 'category']))
                <a href="{{ route('admin.blog.index') }}" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                    Temizle
                </a>
            @endif
        </form>
    </div>

    {{-- Success Message --}}
    @if(session('success'))
        <div class="bg-green-50 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3 border border-green-200">
            <span class="material-symbols-outlined">check_circle</span>
            <span>{{ session('success') }}</span>
        </div>
    @endif

    {{-- Table --}}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Başlık</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kategori</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tarih</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Durum</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @forelse($posts as $post)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="font-medium text-gray-900">{{ $post->title }}</div>
                            <div class="text-sm text-gray-500 line-clamp-1">{{ strip_tags($post->summary) }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 bg-blue-100 text-primary text-xs font-bold rounded">
                                {{ $post->category }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                            {{ \Carbon\Carbon::parse($post->date)->format('d.m.Y') }}
                        </td>
                        <td class="px-6 py-4">
                            @if($post->published)
                                <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Yayında</span>
                            @else
                                <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">Taslak</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.blog.edit', $post->id) }}" class="p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                </a>
                                <form action="{{ route('admin.blog.destroy', $post->id) }}" method="POST" class="inline" onsubmit="return confirm('Bu yazıyı silmek istediğinize emin misiniz?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <span class="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-400">
                            <span class="material-symbols-outlined text-5xl mb-2 block text-gray-300">article</span>
                            Henüz blog yazısı yok.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- Pagination --}}
    @if($posts->hasPages())
        <div class="mt-6">
            {{ $posts->links() }}
        </div>
    @endif
</div>
@endsection
