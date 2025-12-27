@extends('layouts.admin')

@section('content')
<div class="mb-8">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Altyapı Özellikleri</h1>
            <p class="text-gray-500 mt-1">Altyapı sayfası özelliklerini yönet</p>
        </div>
        <a href="{{ route('admin.infrastructure.create') }}" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">add</span>
            Yeni Özellik
        </a>
    </div>

    {{-- Filters --}}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <form method="GET" action="{{ route('admin.infrastructure.index') }}" class="flex gap-4">
            <div class="flex-1">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}" 
                    placeholder="Özellik ara..." 
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
            </div>
            <button type="submit" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                Ara
            </button>
            @if(request('search'))
                <a href="{{ route('admin.infrastructure.index') }}" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
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
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sıra</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Başlık</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Açıklama</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Noktalar</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @forelse($features as $feature)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                                {{ $feature->order_index }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="font-medium text-gray-900">{{ $feature->title }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-600 line-clamp-2 max-w-md">
                                {{ Str::limit($feature->description, 100) }}
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            @php
                                $points = json_decode($feature->points, true) ?? [];
                            @endphp
                            <span class="text-sm text-gray-500">
                                {{ count($points) }} madde
                            </span>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.infrastructure.edit', $feature->id) }}" class="p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                </a>
                                <form action="{{ route('admin.infrastructure.destroy', $feature->id) }}" method="POST" class="inline" onsubmit="return confirm('Bu özelliği silmek istediğinize emin misiniz?')">
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
                            <span class="material-symbols-outlined text-5xl mb-2 block text-gray-300">featured_play_list</span>
                            Henüz altyapı özelliği yok.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- Pagination --}}
    @if($features->hasPages())
        <div class="mt-6">
            {{ $features->links() }}
        </div>
    @endif
</div>
@endsection
