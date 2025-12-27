@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Site Ayarları</h1>
            <p class="text-gray-500 mt-1">Site geneli yapılandırmalarını yönetin</p>
        </div>
        <a href="{{ route('admin.site-settings.create') }}" class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
            <span class="material-symbols-outlined">add</span>
            <span>Yeni Ayar</span>
        </a>
    </div>

    @if(session('success'))
        <div class="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3">
            <span class="material-symbols-outlined">check_circle</span>
            <span>{{ session('success') }}</span>
        </div>
    @endif

    <div class="mb-6 bg-white rounded-lg shadow p-4">
        <form method="GET" action="{{ route('admin.site-settings.index') }}" class="flex gap-4">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Anahtar, değer veya grup ara..." class="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
            <select name="group" class="h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                <option value="">Tüm Gruplar</option>
                @foreach($groups as $group)
                    <option value="{{ $group }}" {{ request('group') == $group ? 'selected' : '' }}>{{ $group }}</option>
                @endforeach
            </select>
            <button type="submit" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">Ara</button>
            @if(request()->hasAny(['search', 'group']))
                <a href="{{ route('admin.site-settings.index') }}" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">Sıfırla</a>
            @endif
        </form>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Anahtar</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Değer</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Grup</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tip</th>
                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700">İşlemler</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @forelse($settings as $setting)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <code class="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-900 font-semibold">{{ $setting->ckey }}</code>
                        </td>
                        <td class="px-6 py-4">
                            <div class="max-w-md truncate text-gray-700">{{ Str::limit($setting->value, 60) }}</div>
                        </td>
                        <td class="px-6 py-4">
                            @if($setting->group_name)
                                <span class="inline-flex px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">{{ $setting->group_name }}</span>
                            @else
                                <span class="text-gray-400 text-xs">-</span>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            @if($setting->type)
                                <span class="text-xs text-gray-600">{{ $setting->type }}</span>
                            @else
                                <span class="text-gray-400 text-xs">-</span>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.site-settings.edit', $setting->id) }}" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                </a>
                                <form method="POST" action="{{ route('admin.site-settings.destroy', $setting->id) }}" onsubmit="return confirm('Bu ayarı silmek istediğinizden emin misiniz?');" class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                                <span class="material-symbols-outlined text-gray-300 text-[48px]">settings</span>
                                <p class="text-gray-500">Henüz ayar bulunmuyor</p>
                                <a href="{{ route('admin.site-settings.create') }}" class="text-primary hover:underline font-medium">İlk ayarı ekleyin</a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($settings->hasPages())
        <div class="mt-6">{{ $settings->links() }}</div>
    @endif
</div>
@endsection
