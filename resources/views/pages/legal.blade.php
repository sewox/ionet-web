@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-white py-24">
    <div class="max-w-4xl mx-auto px-6">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-12">Yasal Bilgiler</h1>

        <div class="space-y-12">
            @forelse($sections as $section)
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $section->title }}</h2>
                    <div class="prose prose-lg max-w-none text-gray-700 admin-html-content">
                        {!! $section->content !!}
                    </div>
                </div>
            @empty
                <div class="bg-surface-light rounded-xl p-8 text-center">
                    <p class="text-gray-500">Yasal bilgiler hazırlanıyor...</p>
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection
