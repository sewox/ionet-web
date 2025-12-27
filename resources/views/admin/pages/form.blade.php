@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
            {{ isset($page) ? 'Sayfa Düzenle' : 'Yeni Sayfa' }}
        </h1>
        <p class="text-gray-500 mt-1">Dinamik sayfa içeriğini düzenleyin</p>
    </div>

    <div class="max-w-4xl">
        <form method="POST" 
              action="{{ isset($page) ? route('admin.pages.update', $page->id) : route('admin.pages.store') }}" 
              class="bg-white rounded-lg shadow p-6 space-y-6"
              x-data="{ 
                  title: '{{ old('title', $page->title ?? '') }}',
                  slug: '{{ old('slug', $page->slug ?? '') }}',
                  autoSlug: {{ isset($page) ? 'false' : 'true' }},
                  generateSlug() {
                      if (this.autoSlug) {
                          this.slug = this.title
                              .toLowerCase()
                              .replace(/ğ/g, 'g')
                              .replace(/ü/g, 'u')
                              .replace(/ş/g, 's')
                              .replace(/ı/g, 'i')
                              .replace(/ö/g, 'o')
                              .replace(/ç/g, 'c')
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/^-+|-+$/g, '');
                      }
                  }
              }">
            @csrf
            @if(isset($page))
                @method('PUT')
            @endif

            <!-- Title -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Sayfa Başlığı <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="title"
                    x-model="title"
                    @input="generateSlug()"
                    class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('title') border-red-500 @enderror"
                    placeholder="Örn: Hakkımızda"
                    required
                >
                @error('title')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Slug -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    URL Slug <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                        {{ url('/') }}/
                    </div>
                    <input 
                        type="text" 
                        name="slug"
                        x-model="slug"
                        @input="autoSlug = false"
                        class="w-full h-12 pl-[{{ strlen(url('/')) + 10 }}px] pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono @error('slug') border-red-500 @enderror"
                        placeholder="hakkimizda"
                        required
                        pattern="[a-z0-9-]+"
                    >
                </div>
                @error('slug')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @else
                    <p class="mt-1 text-sm text-gray-500">
                        Sadece küçük harf, rakam ve tire (-) kullanın. Otomatik olarak başlıktan oluşturulur.
                    </p>
                @enderror
            </div>

            <!-- Content -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    İçerik <span class="text-red-500">*</span>
                </label>
                <x-rich-editor 
                    name="content" 
                    :value="$page->content ?? ''" 
                    rows="15" 
                    required 
                    class="@error('content') border-red-500 @enderror" 
                />
                @error('content')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @else
                    <p class="mt-1 text-sm text-gray-500">
                        HTML etiketleri kullanabilirsiniz. İçerik sayfada render edilecektir.
                    </p>
                @enderror
            </div>

            <!-- Preview Link (for edit mode) -->
            @if(isset($page))
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-blue-600">info</span>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-blue-900">Sayfayı Önizleyin</p>
                            <a href="{{ url($page->slug) }}" 
                               target="_blank" 
                               class="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1">
                                <span>{{ url($page->slug) }}</span>
                                <span class="material-symbols-outlined text-[16px]">open_in_new</span>
                            </a>
                        </div>
                    </div>
                </div>
            @endif

            {{-- SEO Meta Fields --}}
            <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined">search</span>
                    SEO Ayarları
                </h3>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                    <textarea name="meta_description" rows="2" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y" placeholder="Arama motorları için kısa açıklama">{{ old('meta_description', $page->meta_description ?? '') }}</textarea>
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Meta Keywords</label>
                    <input type="text" name="meta_keywords" value="{{ old('meta_keywords', $page->meta_keywords ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="keyword1, keyword2, keyword3">
                    <p class="text-xs text-gray-500 mt-1">Virgülle ayırarak keyword'ler girin</p>
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">OG Image URL</label>
                    <input type="url" name="og_image" value="{{ old('og_image', $page->og_image ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="https://example.com/social-image.jpg">
                    <p class="text-xs text-gray-500 mt-1">Sosyal medyada paylaşıldığında görünecek resim</p>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4 pt-4">
                <button 
                    type="submit"
                    class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined">save</span>
                    <span>{{ isset($page) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.pages.index') }}" 
                   class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
                    İptal
                </a>
            </div>
        </form>
    </div>
</div>
@endsection
