@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ isset($menuItem) ? 'Menü Düzenle' : 'Yeni Menü Öğesi' }}</h1>
        <p class="text-gray-500 mt-1">Navigasyon menüsü öğesi bilgilerini girin</p>
    </div>

    <div class="max-w-3xl">
        <form method="POST" action="{{ isset($menuItem) ? route('admin.menu-items.update', $menuItem->id) : route('admin.menu-items.store') }}" class="bg-white rounded-lg shadow p-6 space-y-6">
            @csrf
            @if(isset($menuItem)) @method('PUT') @endif

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Etiket <span class="text-red-500">*</span></label>
                <input type="text" name="label" value="{{ old('label', $menuItem->label ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('label') border-red-500 @enderror" placeholder="Ana Sayfa" required>
                @error('label') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">URL <span class="text-red-500">*</span></label>
                <input type="text" name="url" value="{{ old('url', $menuItem->url ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('url') border-red-500 @enderror" placeholder="/" required>
                @error('url') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                <p class="mt-1 text-sm text-gray-500">Göreli yol (/) veya tam URL</p>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Sıra Numarası</label>
                <input type="number" name="order_index" value="{{ old('order_index', $menuItem->order_index ?? 0) }}" min="0" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('order_index') border-red-500 @enderror">
                @error('order_index') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined">save</span>
                    <span>{{ isset($menuItem) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.menu-items.index') }}" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">İptal</a>
            </div>
        </form>
    </div>
</div>
@endsection
