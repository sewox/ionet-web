@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
            {{ isset($feature) ? 'Özellik Düzenle' : 'Yeni Özellik' }}
        </h1>
        <p class="text-gray-500 mt-1">Ana sayfa özellik bilgilerini girin</p>
    </div>

    <div class="max-w-3xl">
        <form method="POST" 
              action="{{ isset($feature) ? route('admin.home-features.update', $feature->id) : route('admin.home-features.store') }}" 
              class="bg-white rounded-lg shadow p-6 space-y-6">
            @csrf
            @if(isset($feature))
                @method('PUT')
            @endif

            <!-- Title -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Başlık <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="title" 
                    value="{{ old('title', $feature->title ?? '') }}"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('title') border-red-500 @enderror"
                    placeholder="Örn: Yüksek Performans"
                    required
                >
                @error('title')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Description -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
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
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Icon -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    İkon URL
                </label>
                <input 
                    type="text" 
                    name="icon" 
                    value="{{ old('icon', $feature->icon ?? '') }}"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('icon') border-red-500 @enderror"
                    placeholder="https://example.com/icon.svg veya /images/icon.png"
                >
                @error('icon')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
                <p class="mt-1 text-sm text-gray-500">İkon görseli için URL veya yol</p>
            </div>

            <!-- Order Index -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Sıra Numarası
                </label>
                <input 
                    type="number" 
                    name="order_index" 
                    value="{{ old('order_index', $feature->order_index ?? 0) }}"
                    min="0"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('order_index') border-red-500 @enderror"
                    placeholder="0"
                >
                @error('order_index')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
                <p class="mt-1 text-sm text-gray-500">Gösterim sırası (0 = en üstte)</p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4 pt-4">
                <button 
                    type="submit"
                    class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined">save</span>
                    <span>{{ isset($feature) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.home-features.index') }}" 
                   class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
                    İptal
                </a>
            </div>
        </form>
    </div>
</div>
@endsection
