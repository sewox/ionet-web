@extends('layouts.admin')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
            <a href="{{ route('admin.blog.index') }}" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </a>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">
                    {{ $post ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı' }}
                </h1>
                <p class="text-gray-500 mt-1">
                    {{ $post ? 'Mevcut yazıyı düzenle' : 'Yeni bir blog yazısı oluştur' }}
                </p>
            </div>
        </div>
    </div>

    <form method="POST" action="{{ $post ? route('admin.blog.update', $post->id) : route('admin.blog.store') }}" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        @csrf
        @if($post)
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
                    value="{{ old('title', $post->title ?? '') }}" 
                    required
                    class="w-full px-4 py-3 rounded-lg border @error('title') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Blog yazısı başlığı..."
                >
                @error('title')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- Category --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Kategori <span class="text-red-500">*</span>
                </label>
                <select 
                    name="category" 
                    required
                    class="w-full px-4 py-3 rounded-lg border @error('category') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                    <option value="">Kategori seçin...</option>
                    <option value="Yazılım" {{ old('category', $post->category ?? '') == 'Yazılım' ? 'selected' : '' }}>Yazılım</option>
                    <option value="Altyapı" {{ old('category', $post->category ?? '') == 'Altyapı' ? 'selected' : '' }}>Altyapı</option>
                    <option value="Güvenlik" {{ old('category', $post->category ?? '') == 'Güvenlik' ? 'selected' : '' }}>Güvenlik</option>
                    <option value="Genel" {{ old('category', $post->category ?? '') == 'Genel' ? 'selected' : '' }}>Genel</option>
                </select>
                @error('category')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- Summary --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Özet <span class="text-red-500">*</span>
                </label>
                <textarea 
                    name="summary" 
                    rows="3" 
                    required
                    class="w-full px-4 py-3 rounded-lg border @error('summary') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Yazının kısa özeti (listede görünecek)..."
                >{{ old('summary', $post->summary ?? '') }}</textarea>
                @error('summary')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- Content --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    İçerik
                </label>
                <x-rich-editor 
                    name="content" 
                    :value="$post->content ?? ''" 
                    rows="12" 
                    class="@error('content') border-red-500 @enderror" 
                />
                @error('content')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
                <p class="text-xs text-gray-500 mt-2">HTML etiketleri kullanabilirsiniz</p>
            </div>

            {{-- Image URL --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Görsel URL
                </label>
                <input 
                    type="url" 
                    name="image" 
                    value="{{ old('image', $post->image ?? '') }}" 
                    class="w-full px-4 py-3 rounded-lg border @error('image') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="https://example.com/image.jpg"
                >
                @error('image')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
                @if(old('image', $post->image ?? ''))
                    <div class="mt-3">
                        <img src="{{ old('image', $post->image ?? '') }}" alt="Preview" class="h-32 rounded-lg border border-gray-200">
                    </div>
                @endif
            </div>

            {{-- Date --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Yayın Tarihi <span class="text-red-500">*</span>
                </label>
                <input 
                    type="date" 
                    name="date" 
                    value="{{ old('date', $post ? $post->date : now()->format('Y-m-d')) }}" 
                    required
                    class="w-full px-4 py-3 rounded-lg border @error('date') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                @error('date')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- SEO Meta Fields --}}
            <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined">search</span>
                    SEO Ayarları
                </h3>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                    <textarea name="meta_description" rows="2" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y" placeholder="Arama motorları için kısa açıklama">{{ old('meta_description', $post->meta_description ?? '') }}</textarea>
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Meta Keywords</label>
                    <input type="text" name="meta_keywords" value="{{ old('meta_keywords', $post->meta_keywords ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="keyword1, keyword2, keyword3">
                    <p class="text-xs text-gray-500 mt-1">V irgülle ayırarak keyword'ler girin</p>
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">OG Image URL</label>
                    <input type="url" name="og_image" value="{{ old('og_image', $post->og_image ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="https://example.com/social-image.jpg">
                    <p class="text-xs text-gray-500 mt-1">Sosyal medyada paylaşıldığında görünecek resim</p>
                </div>
            </div>

            {{-- Published Toggle --}}
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input 
                    type="checkbox" 
                    name="published" 
                    id="published" 
                    value="1"
                    {{ old('published', $post->published ?? true) ? 'checked' : '' }}
                    class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                >
                <label for="published" class="font-medium text-gray-900 cursor-pointer select-none">
                    Yayında (İşaretli olmadığında taslak olarak kaydedilir)
                </label>
            </div>
        </div>

        {{-- Actions --}}
        <div class="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
            <button 
                type="submit" 
                class="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
                <span class="material-symbols-outlined">save</span>
                {{ $post ? 'Güncelle' : 'Kaydet' }}
            </button>
            <a 
                href="{{ route('admin.blog.index') }}" 
                class="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
                İptal
            </a>
        </div>
    </form>
</div>
@endsection
