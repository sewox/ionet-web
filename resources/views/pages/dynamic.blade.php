@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-white py-24">
    <div class="max-w-4xl mx-auto px-6">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">{{ $page->title }}</h1>
        
        @if($page->meta_description)
            <p class="text-lg text-gray-600 mb-12">{{ $page->meta_description }}</p>
        @endif

        <div class="prose prose-lg max-w-none text-gray-700 admin-html-content">
            {!! $page->content !!}
        </div>
    </div>
</div>
@endsection
