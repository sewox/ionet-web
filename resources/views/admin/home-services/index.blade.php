@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Ana Sayfa Servisleri</h1>
            <p class="text-gray-500 mt-1">Ana sayfada gösterilen servis kartlarını yönetin</p>
        </div>
        <a href="{{ route('admin.home-services.create') }}" 
           class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
            <span class="material-symbols-outlined">add</span>
            <span>Yeni Servis</span>
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
        <form method="GET" action="{{ route('admin.home-services.index') }}" class="flex gap-4">
            <div class="flex-1">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}"
                    placeholder="Servis adı veya açıklama ara..."
                    class="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
            </div>

            <button type="submit" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                Ara
            </button>

            @if(request('search'))
                <a href="{{ route('admin.home-services.index') }}" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
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
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sıra</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Başlık</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Açıklama</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Link</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700">İşlemler</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @forelse($services as $service)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <span class="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 font-semibold rounded-full">
                                {{ $service->order_index }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="font-medium text-gray-900">{{ $service->title }}</div>
                            @if($service->icon)
                                <code class="mt-1 text-xs text-gray-500">{{ Str::limit($service->icon, 30) }}</code>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-gray-600">
                            {{ Str::limit($service->description, 80) }}
                        </td>
                        <td class="px-6 py-4">
                            @if($service->link)
                                <a href="{{ $service->link }}" 
                                   target="_blank"
                                   class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                                    <span>Link</span>
                                    <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                                </a>
                            @else
                                <span class="text-gray-400">—</span>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.home-services.edit', $service->id) }}" 
                                   class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                </a>
                                <form method="POST" 
                                      action="{{ route('admin.home-services.destroy', $service->id) }}" 
                                      onsubmit="return confirm('Bu servisi silmek istediğinizden emin misiniz?');"
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
                                <span class="material-symbols-outlined text-gray-300 text-[48px]">star</span>
                                <p class="text-gray-500">Henüz servis bulunmuyor</p>
                                <a href="{{ route('admin.home-services.create') }}" 
                                   class="text-primary hover:underline font-medium">
                                    İlk servisi ekleyin
                                </a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    @if($services->hasPages())
        <div class="mt-6">
            {{ $services->links() }}
        </div>
    @endif
</div>
@endsection
