@extends('layouts.admin')

@section('content')
<div class="mb-8">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">İş İlanları</h1>
            <p class="text-gray-500 mt-1">Kariyer sayfası iş ilanlarını yönet</p>
        </div>
        <a href="{{ route('admin.jobs.create') }}" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">add</span>
            Yeni İlan
        </a>
    </div>

    {{-- Filters --}}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <form method="GET" action="{{ route('admin.jobs.index') }}" class="flex gap-4">
            <div class="flex-1">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}" 
                    placeholder="İlan veya departman ara..." 
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
            </div>
            <div class="w-48">
                <select 
                    name="department" 
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                    <option value="">Tüm Departmanlar</option>
                    @foreach($departments as $dept)
                        <option value="{{ $dept }}" {{ request('department') == $dept ? 'selected' : '' }}>
                            {{ $dept }}
                        </option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                Filtrele
            </button>
            @if(request()->hasAny(['search', 'department']))
                <a href="{{ route('admin.jobs.index') }}" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
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
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pozisyon</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Departman</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tür</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Lokasyon</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Deneyim</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @forelse($jobs as $job)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="font-medium text-gray-900">{{ $job->title }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                                {{ $job->department }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                            {{ $job->type }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                            {{ $job->location }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                            {{ $job->exp ?? '-' }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.jobs.edit', $job->id) }}" class="p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                </a>
                                <form action="{{ route('admin.jobs.destroy', $job->id) }}" method="POST" class="inline" onsubmit="return confirm('Bu ilanı silmek istediğinize emin misiniz?')">
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
                        <td colspan="6" class="px-6 py-12 text-center text-gray-400">
                            <span class="material-symbols-outlined text-5xl mb-2 block text-gray-300">work</span>
                            Henüz iş ilanı yok.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- Pagination --}}
    @if($jobs->hasPages())
        <div class="mt-6">
            {{ $jobs->links() }}
        </div>
    @endif
</div>
@endsection
