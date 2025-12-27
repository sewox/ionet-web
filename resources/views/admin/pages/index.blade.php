@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Dinamik Sayfalar</h1>
            <p class="text-gray-500 mt-1">Özel CMS sayfalarını yönetin</p>
        </div>
        <a href="{{ route('admin.pages.create') }}" 
           class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
            <span class="material-symbols-outlined">add</span>
            <span>Yeni Sayfa</span>
        </a>
    </div>

    @if(session('success'))
        <div class="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3">
            <span class="material-symbols-outlined">check_circle</span>
            <span>{{ session('success') }}</span>
        </div>
    @endif

    <!-- Search -->
    <div class="mb-6 bg-white rounded-lg shadow p-4">
        <form method="GET" action="{{ route('admin.pages.index') }}" class="flex gap-4">
            <div class="flex-1">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}"
                    placeholder="Sayfa başlığı, slug veya içerik ara..."
                    class="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
            </div>

            <button type="submit" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                Ara
            </button>

            @if(request('search'))
                <a href="{{ route('admin.pages.index') }}" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                    Sıfırla
                </a>
            @endif
        </form>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Slug</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Başlık</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Oluşturulma</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Önizleme</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700">İşlemler</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @forelse($pages as $page)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <code class="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-mono rounded">
                                /{{ $page->slug }}
                            </code>
                        </td>
                        <td class="px-6 py-4">
                            <div class="font-medium text-gray-900">{{ $page->title }}</div>
                        </td>
                        <td class="px-6 py-4 text-gray-600 text-sm">
                            {{ $page->created_at ? \Carbon\Carbon::parse($page->created_at)->format('d.m.Y H:i') : '—' }}
                        </td>
                        <td class="px-6 py-4">
                            <a href="{{ url($page->slug) }}" 
                               target="_blank"
                               class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                <span>Görüntüle</span>
                                <span class="material-symbols-outlined text-[16px]">open_in_new</span>
                            </a>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.pages.edit', $page->id) }}" 
                                   class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                </a>
                                <form method="POST" 
                                      action="{{ route('admin.pages.destroy', $page->id) }}" 
                                      onsubmit="return confirm('Bu sayfayı silmek istediğinizden emin misiniz?');"
                                      class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" 
                                            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <span class="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center">
                            <div class="flex flex-col items-center gap-3">
                                <span class="material-symbols-outlined text-gray-300 text-[48px]">description</span>
                                <p class="text-gray-500">Henüz sayfa bulunmuyor</p>
                                <a href="{{ route('admin.pages.create') }}" 
                                   class="text-primary hover:underline font-medium">
                                    İlk sayfayı ekleyin
                                </a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    @if($pages->hasPages())
        <div class="mt-6">
            {{ $pages->links() }}
        </div>
    @endif
</div>
@endsection
