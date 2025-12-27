@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
            {{ isset($project) ? 'Proje Düzenle' : 'Yeni Proje' }}
        </h1>
        <p class="text-gray-500 mt-1">Proje bilgilerini girin</p>
    </div>

    <div class="max-w-3xl">
        <form method="POST" 
              action="{{ isset($project) ? route('admin.projects.update', $project->id) : route('admin.projects.store') }}" 
              enctype="multipart/form-data"
              class="bg-white rounded-lg shadow p-6 space-y-6"
              x-data="{ 
                  imagePreview: '{{ isset($project) && $project->image ? asset('storage/' . $project->image) : '' }}'
              }">
            @csrf
            @if(isset($project))
                @method('PUT')
            @endif

            <!-- Title -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Proje Başlığı <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="title" 
                    value="{{ old('title', $project->title ?? '') }}"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('title') border-red-500 @enderror"
                    placeholder="Örn: E-Ticaret Platformu"
                    required
                >
                @error('title')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Category -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori
                </label>
                <input 
                    type="text" 
                    name="category" 
                    value="{{ old('category', $project->category ?? '') }}"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('category') border-red-500 @enderror"
                    placeholder="Örn: Web Uygulaması, Mobil Uygulama"
                >
                @error('category')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
                <p class="mt-1 text-sm text-gray-500">Projenin kategorisini belirtin</p>
            </div>

            <!-- Description -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Açıklama <span class="text-red-500">*</span>
                </label>
                <x-rich-editor 
                    name="description" 
                    :value="$project->description ?? ''" 
                    rows="5" 
                    required 
                    class="@error('description') border-red-500 @enderror" 
                />
                @error('description')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Image Upload -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Proje Görseli
                </label>
                
                <div class="space-y-4">
                    <!-- Preview -->
                    <div x-show="imagePreview" class="relative inline-block">
                        <img :src="imagePreview" 
                             alt="Preview" 
                             class="w-48 h-48 object-cover rounded-lg border-2 border-gray-200">
                        <button 
                            type="button"
                            @click="imagePreview = ''; $refs.imageInput.value = ''"
                            class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors">
                            <span class="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    <!-- Upload Input -->
                    <div>
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*"
                            x-ref="imageInput"
                            @change="
                                const file = $event.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => imagePreview = e.target.result;
                                    reader.readAsDataURL(file);
                                }
                            "
                            class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark @error('image') border-red-500 @enderror"
                        >
                        @error('image')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <p class="mt-1 text-sm text-gray-500">JPG, PNG, GIF veya WEBP (Max: 2MB)</p>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4 pt-4">
                <button 
                    type="submit"
                    class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined">save</span>
                    <span>{{ isset($project) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.projects.index') }}" 
                   class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
                    İptal
                </a>
            </div>
        </form>
    </div>
</div>
@endsection
