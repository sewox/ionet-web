@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-white py-24">
    <div class="max-w-5xl mx-auto px-6">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-8">Referanslarımız</h1>
        <p class="text-lg text-gray-600 mb-16">Birlikte çalıştığımız değerli iş ortaklarımız ve teknoloji partnerlerimiz.</p>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            @forelse($techPartners as $partner)
                <div class="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow grayscale hover:grayscale-0">
                    @if($partner->logo)
                        <img src="{{ $partner->logo }}" alt="{{ $partner->name }}" class="max-w-full h-12 object-contain">
                    @else
                        <div class="text-center">
                            <span class="material-symbols-outlined text-4xl text-gray-400 mb-2">{{ $partner->icon ?? 'business' }}</span>
                            <p class="text-sm font-bold text-gray-600">{{ $partner->name }}</p>
                        </div>
                    @endif
                </div>
            @empty
                <div class="col-span-full text-center py-16">
                    <p class="text-gray-500">Henüz referans eklenmemiş.</p>
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection
