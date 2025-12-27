@extends('layouts.admin')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
            <a href="{{ route('admin.jobs.index') }}" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </a>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">
                    {{ $job ? 'İlanı Düzenle' : 'Yeni İş İlanı' }}
                </h1>
                <p class="text-gray-500 mt-1">
                    {{ $job ? 'Mevcut ilanı düzenle' : 'Yeni bir iş ilanı oluştur' }}
                </p>
            </div>
        </div>
    </div>

    <form method="POST" action="{{ $job ? route('admin.jobs.update', $job->id) : route('admin.jobs.store') }}" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        @csrf
        @if($job)
            @method('PUT')
        @endif

        <div class="space-y-6">
            {{-- Title --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Pozisyon Adı <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="title" 
                    value="{{ old('title', $job->title ?? '') }}" 
                    required
                    class="w-full px-4 py-3 rounded-lg border @error('title') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="örn: Senior Backend Developer"
                >
                @error('title')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- Department --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    Departman <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="department" 
                    value="{{ old('department', $job->department ?? '') }}" 
                    required
                    class="w-full px-4 py-3 rounded-lg border @error('department') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="örn: Yazılım Geliştirme"
                    list="departments"
                >
                <datalist id="departments">
                    <option value="Yazılım Geliştirme">
                    <option value="Altyapı ve DevOps">
                    <option value="Siber Güvenlik">
                    <option value="Satış ve Pazarlama">
                    <option value="Müşteri Hizmetleri">
                </datalist>
                @error('department')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {{-- Type --}}
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        Çalışma Şekli <span class="text-red-500">*</span>
                    </label>
                    <select 
                        name="type" 
                        required
                        class="w-full px-4 py-3 rounded-lg border @error('type') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                        <option value="">Seçin...</option>
                        <option value="Tam Zamanlı" {{ old('type', $job->type ?? '') == 'Tam Zamanlı' ? 'selected' : '' }}>Tam Zamanlı</option>
                        <option value="Yarı Zamanlı" {{ old('type', $job->type ?? '') == 'Yarı Zamanlı' ? 'selected' : '' }}>Yarı Zamanlı</option>
                        <option value="Sözleşmeli" {{ old('type', $job->type ?? '') == 'Sözleşmeli' ? 'selected' : '' }}>Sözleşmeli</option>
                        <option value="Staj" {{ old('type', $job->type ?? '') == 'Staj' ? 'selected' : '' }}>Staj</option>
                    </select>
                    @error('type')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                {{-- Location --}}
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        Lokasyon <span class="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="location" 
                        value="{{ old('location', $job->location ?? '') }}" 
                        required
                        class="w-full px-4 py-3 rounded-lg border @error('location') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="örn: İstanbul / Uzaktan"
                    >
                    @error('location')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            {{-- Description --}}
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                    İş Tanımı <span class="text-red-500">*</span>
                </label>
                <x-rich-editor 
                    name="description" 
                    :value="$job->description ?? ''" 
                    rows="10" 
                    class="@error('description') border-red-500 @enderror" 
                />
                @error('description')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
                <p class="text-xs text-gray-500 mt-2">İş tanımı, sorumluluklar ve gereklilikler</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {{-- Time Commitment --}}
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        Zaman Taahhüdü
                    </label>
                    <input 
                        type="text" 
                        name="time" 
                        value="{{ old('time', $job->time ?? '') }}" 
                        class="w-full px-4 py-3 rounded-lg border @error('time') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="örn: 40 saat/hafta"
                    >
                    @error('time')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                {{-- Experience Level --}}
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        Deneyim Seviyesi
                    </label>
                    <select 
                        name="exp" 
                        class="w-full px-4 py-3 rounded-lg border @error('exp') border-red-500 @else border-gray-300 @enderror focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                        <option value="">Belirtilmemiş</option>
                        <option value="Junior" {{ old('exp', $job->exp ?? '') == 'Junior' ? 'selected' : '' }}>Junior (0-2 yıl)</option>
                        <option value="Mid-Level" {{ old('exp', $job->exp ?? '') == 'Mid-Level' ? 'selected' : '' }}>Mid-Level (2-5 yıl)</option>
                        <option value="Senior" {{ old('exp', $job->exp ?? '') == 'Senior' ? 'selected' : '' }}>Senior (5+ yıl)</option>
                        <option value="Lead/Manager" {{ old('exp', $job->exp ?? '') == 'Lead/Manager' ? 'selected' : '' }}>Lead/Manager</option>
                    </select>
                    @error('exp')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        {{-- Actions --}}
        <div class="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
            <button 
                type="submit" 
                class="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
                <span class="material-symbols-outlined">save</span>
                {{ $job ? 'Güncelle' : 'Kaydet' }}
            </button>
            <a 
                href="{{ route('admin.jobs.index') }}" 
                class="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
                İptal
            </a>
        </div>
    </form>
</div>
@endsection
