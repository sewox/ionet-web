@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ isset($setting) ? 'Ayar Düzenle' : 'Yeni Ayar' }}</h1>
        <p class="text-gray-500 mt-1">Site ayarı bilgilerini girin</p>
    </div>

    <div class="max-w-3xl">
        <form method="POST" action="{{ isset($setting) ? route('admin.site-settings.update', $setting->id) : route('admin.site-settings.store') }}" class="bg-white rounded-lg shadow p-6 space-y-6">
            @csrf
            @if(isset($setting)) @method('PUT') @endif

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Anahtar (Key) <span class="text-red-500">*</span></label>
                <input type="text" name="ckey" value="{{ old('ckey', $setting->ckey ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono @error('ckey') border-red-500 @enderror" placeholder="site_title" required {{ isset($setting) ? 'readonly' : '' }}>
                @error('ckey') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                @if(!isset($setting))
                    <p class="mt-1 text-sm text-gray-500">Benzersiz bir anahtar (site_title, site_description, vb.)</p>
                @endif
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Değer (Value)</label>
                <textarea name="value" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y @error('value') border-red-500 @enderror" placeholder="Ayar değerini girin">{{ old('value', $setting->value ?? '') }}</textarea>
                @error('value') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Grup</label>
                <input type="text" name="group_name" value="{{ old('group_name', $setting->group_name ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('group_name') border-red-500 @enderror" placeholder="general, social, contact">
                @error('group_name') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                <p class="mt-1 text-sm text-gray-500">Ayarları gruplamak için (opsiyonel)</p>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tip</label>
                <select name="type" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('type') border-red-500 @enderror">
                    <option value="">Tip seçin (opsiyonel)</option>
                    <option value="text" {{ old('type', $setting->type ?? '') == 'text' ? 'selected' : '' }}>Text</option>
                    <option value="url" {{ old('type', $setting->type ?? '') == 'url' ? 'selected' : '' }}>URL</option>
                    <option value="email" {{ old('type', $setting->type ?? '') == 'email' ? 'selected' : '' }}>Email</option>
                    <option value="number" {{ old('type', $setting->type ?? '') == 'number' ? 'selected' : '' }}>Number</option>
                    <option value="boolean" {{ old('type', $setting->type ?? '') == 'boolean' ? 'selected' : '' }}>Boolean</option>
                    <option value="json" {{ old('type', $setting->type ?? '') == 'json' ? 'selected' : '' }}>JSON</option>
                </select>
                @error('type') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined">save</span>
                    <span>{{ isset($setting) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.site-settings.index') }}" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">İptal</a>
            </div>
        </form>
    </div>
</div>
@endsection
