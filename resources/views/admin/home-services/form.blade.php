@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
            {{ isset($service) ? 'Servis Düzenle' : 'Yeni Servis' }}
        </h1>
        <p class="text-gray-500 mt-1">Ana sayfa servis bilgilerini girin</p>
    </div>

    <div class="max-w-3xl">
        <form method="POST" 
              action="{{ isset($service) ? route('admin.home-services.update', $service->id) : route('admin.home-services.store') }}" 
              class="bg-white rounded-lg shadow p-6 space-y-6">
            @csrf
            @if(isset($service))
                @method('PUT')
            @endif

            <!-- Title -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Servis Adı <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="title" 
                    value="{{ old('title', $service->title ?? '') }}"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('title') border-red-500 @enderror"
                    placeholder="Örn: Bulut Depolama"
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
                    :value="$service->description ?? ''" 
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
                    value="{{ old('icon', $service->icon ?? '') }}"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('icon') border-red-500 @enderror"
                    placeholder="https://example.com/icon.svg"
                >
                @error('icon')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
                <p class="mt-1 text-sm text-gray-500">İkon görseli için URL veya yol</p>
            </div>

            <!-- Link -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Servis Linki
                </label>
                <input 
                    type="text" 
                    name="link" 
                    value="{{ old('link', $service->link ?? '') }}"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('link') border-red-500 @enderror"
                    placeholder="/services/cloud-storage veya https://..."
                >
                @error('link')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
                <p class="mt-1 text-sm text-gray-500">Servis detay sayfası URL'i</p>
            </div>

            <!-- Order Index -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Sıra Numarası
                </label>
                <input 
                    type="number" 
                    name="order_index" 
                    value="{{ old('order_index', $service->order_index ?? 0) }}"
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
                    <span>{{ isset($service) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.home-services.index') }}" 
                   class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
                    İptal
                </a>
            </div>
        </form>
    </div>
</div>
@endsection
