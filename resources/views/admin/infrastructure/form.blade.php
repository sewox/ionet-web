@extends('layouts.admin')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
            <a href="{{ route('admin.infrastructure.index') }}" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </a>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">
                    {{ $feature ? 'Özelliği Düzenle' : 'Yeni Özellik' }}
                </h1>
                <p class="text-gray-500 mt-1">
                    {{ $feature ? 'Mevcut özelliği düzenle' : 'Yeni bir altyapı özelliği oluştur' }}
                </p>
            </div>
        </div>
    </div>

    <form method="POST" action="{{ $feature ? route('admin.infrastructure.update', $feature->id) : route('admin.infrastructure.store') }}" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        @csrf
        @if($feature)
            @method('PUT')
        @endif

        <div class="space-y-6">
            {{-- Title --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Başlık <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="title" 
                    value="{{ old('title', $feature->title ?? '') }}" 
                    required
                    class="w-full px-4 py-3 rounded-lg border @error('title') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Özellik başlığı..."
                >
                @error('title')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- Description --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Açıklama <span class="text-red-500">*</span>
                </label>
                <x-rich-editor 
                    name="description" 
                    :value="$feature->description ?? ''" 
                    rows="4" 
                    required 
                    class="@error('description') border-red-500 @enderror" 
                />
                @error('description')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- Icon URL --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    İkon URL
                </label>
                <input 
                    type="text" 
                    name="icon" 
                    value="{{ old('icon', $feature->icon ?? '') }}" 
                    class="w-full px-4 py-3 rounded-lg border @error('icon') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="https://example.com/icon.svg veya Material Icon adı"
                >
                @error('icon')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
                <p class="text-xs text-gray-500 mt-2">Material icon adı (örn: 'cloud') veya tam URL girebilirsiniz</p>
            </div>

            {{-- Points --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Özellik Maddeleri
                </label>
                <x-rich-editor 
                    name="points" 
                    :value="$feature ? implode('\n', json_decode($feature->points, true) ?? []) : ''" 
                    rows="6" 
                    class="@error('points') border-red-500 @enderror" 
                />
                @error('points')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
                <p class="text-xs text-gray-500 mt-2">Her satıra bir madde yazın. Boş satırlar otomatik kaldırılır.</p>
            </div>

            {{-- Order Index --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Sıralama <span class="text-red-500">*</span>
                </label>
                <input 
                    type="number" 
                    name="order_index" 
                    value="{{ old('order_index', $feature->order_index ?? 0) }}" 
                    required
                    min="0"
                    class="w-full px-4 py-3 rounded-lg border @error('order_index') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="0"
                >
                @error('order_index')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
                <p class="text-xs text-gray-500 mt-2">Küçük sayılar önce görünür</p>
            </div>
        </div>

        {{-- Actions --}}
        <div class="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
            <button 
                type="submit" 
                class="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
                <span class="material-symbols-outlined">save</span>
                {{ $feature ? 'Güncelle' : 'Kaydet' }}
            </button>
            <a 
                href="{{ route('admin.infrastructure.index') }}" 
                class="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
                İptal
            </a>
        </div>
    </form>
</div>
@endsection
