@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ isset($section) ? 'Bölüm Düzenle' : 'Yeni Bölüm' }}</h1>
        <p class="text-gray-500 mt-1">Yasal bölüm içeriğini düzenleyin</p>
    </div>

    <div class="max-w-4xl">
        <form method="POST" action="{{ isset($section) ? route('admin.legal-sections.update', $section->id) : route('admin.legal-sections.store') }}" class="bg-white rounded-lg shadow p-6 space-y-6">
            @csrf
            @if(isset($section)) @method('PUT') @endif

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Başlık <span class="text-red-500">*</span></label>
                <input type="text" name="title" value="{{ old('title', $section->title ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('title') border-red-500 @enderror" placeholder="Örn: Gizlilik Politikası" required>
                @error('title') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Anchor ID</label>
                <input type="text" name="anchor" value="{{ old('anchor', $section->anchor ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('anchor') border-red-500 @enderror" placeholder="privacy-policy">
                @error('anchor') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                <p class="mt-1 text-sm text-gray-500">Sayfa içi navigasyon için (#privacy-policy)</p>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">İçerik <span class="text-red-500">*</span></label>
                <textarea name="content" rows="15" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y font-mono text-sm @error('content') border-red-500 @enderror" required>{{ old('content', $section->content ?? '') }}</textarea>
                @error('content') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                <p class="mt-1 text-sm text-gray-500">HTML etiketleri kullanabilirsiniz</p>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Sıra Numarası</label>
                <input type="number" name="order_index" value="{{ old('order_index', $section->order_index ?? 0) }}" min="0" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('order_index') border-red-500 @enderror">
                @error('order_index') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined">save</span>
                    <span>{{ isset($section) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.legal-sections.index') }}" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">İptal</a>
            </div>
        </form>
    </div>
</div>
@endsection
