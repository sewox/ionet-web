@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Projeler</h1>
            <p class="text-gray-500 mt-1">Referans projelerini yönetin</p>
        </div>
        <a href="{{ route('admin.projects.create') }}" 
           class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
            <span class="material-symbols-outlined">add</span>
            <span>Yeni Proje</span>
        </a>
    </div>

    @if(session('success'))
        <div class="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3">
            <span class="material-symbols-outlined">check_circle</span>
            <span>{{ session('success') }}</span>
        </div>
    @endif

    <!-- Filters -->
    <div class="mb-6 bg-white rounded-lg shadow p-4">
        <form method="GET" action="{{ route('admin.projects.index') }}" class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[200px]">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}"
                    placeholder="Proje adı veya kategori ara..."
                    class="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
            </div>
            
            @if($categories->count() > 0)
            <div class="w-48">
                <select 
                    name="category" 
                    class="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                    <option value="">Tüm Kategoriler</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat }}" {{ request('category') == $cat ? 'selected' : '' }}>
                            {{ $cat }}
                        </option>
                    @endforeach
                </select>
            </div>
            @endif

            <button type="submit" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                Filtrele
            </button>

            @if(request('search') || request('category'))
                <a href="{{ route('admin.projects.index') }}" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
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
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Görsel</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Başlık</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Açıklama</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700">İşlemler</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @forelse($projects as $project)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            @if($project->image)
                                <img src="{{ asset('storage/' . $project->image) }}" 
                                     alt="{{ $project->title }}" 
                                     class="w-16 h-16 object-cover rounded-lg">
                            @else
                                <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined text-gray-400">image</span>
                                </div>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="font-medium text-gray-900">{{ $project->title }}</div>
                        </td>
                        <td class="px-6 py-4">
                            @if($project->category)
                                <span class="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                    {{ $project->category }}
                                </span>
                            @else
                                <span class="text-gray-400">—</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-gray-600">
                            {{ Str::limit($project->description, 100) }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.projects.edit', $project->id) }}" 
                                   class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                </a>
                                <form method="POST" 
                                      action="{{ route('admin.projects.destroy', $project->id) }}" 
                                      onsubmit="return confirm('Bu projeyi silmek istediğinizden emin misiniz?');"
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
                                <span class="material-symbols-outlined text-gray-300 text-[48px]">folder_open</span>
                                <p class="text-gray-500">Henüz proje bulunmuyor</p>
                                <a href="{{ route('admin.projects.create') }}" 
                                   class="text-primary hover:underline font-medium">
                                    İlk projeyi ekleyin
                                </a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    @if($projects->hasPages())
        <div class="mt-6">
            {{ $projects->links() }}
        </div>
    @endif
</div>
@endsection
