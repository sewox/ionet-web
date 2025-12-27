@extends('layouts.admin')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ isset($testimonial) ? 'Referans Düzenle' : 'Yeni Referans' }}</h1>
        <p class="text-gray-500 mt-1">Referans bilgilerini girin</p>
    </div>

    <div class="max-w-3xl">
        <form method="POST" action="{{ isset($testimonial) ? route('admin.testimonials.update', $testimonial->id) : route('admin.testimonials.store') }}" enctype="multipart/form-data" class="bg-white rounded-lg shadow p-6 space-y-6" x-data="{ imagePreview: '{{ isset($testimonial) && $testimonial->image ? Storage::url($testimonial->image) : '' }}' }">
            @csrf
            @if(isset($testimonial)) @method('PUT') @endif

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">İsim <span class="text-red-500">*</span></label>
                <input type="text" name="name" value="{{ old('name', $testimonial->name ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('name') border-red-500 @enderror" required>
                @error('name') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Ünvan <span class="text-red-500">*</span></label>
                <input type="text" name="title" value="{{ old('title', $testimonial->title ?? '') }}" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('title') border-red-500 @enderror" placeholder="Örn: CEO, Amazon Web Services" required>
                @error('title') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Alıntı <span class="text-red-500">*</span></label>
                <x-rich-editor 
                    name="quote" 
                    :value="$testimonial->quote ?? ''" 
                    rows="4" 
                    required 
                    class="@error('quote') border-red-500 @enderror" 
                />
                @error('quote') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Fotoğraf</label>
                <input type="file" name="image" accept="image/*" @change="imagePreview = URL.createObjectURL($event.target.files[0])" class="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('image') border-red-500 @enderror">
                @error('image') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
                <div x-show="imagePreview" class="mt-3">
                    <img :src="imagePreview" class="w-20 h-20 rounded-full object-cover border-2 border-gray-200">
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Sıra Numarası</label>
                <input type="number" name="order_index" value="{{ old('order_index', $testimonial->order_index ?? 0) }}" min="0" class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none @error('order_index') border-red-500 @enderror">
                @error('order_index') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
            </div>

            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined">save</span>
                    <span>{{ isset($testimonial) ? 'Güncelle' : 'Kaydet' }}</span>
                </button>
                <a href="{{ route('admin.testimonials.index') }}" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">İptal</a>
            </div>
        </form>
    </div>
</div>
@endsection
