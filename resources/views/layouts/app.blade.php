<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- SEO Meta Tags --}}
    <title>{{ $title ?? 'I/ONET Teknoloji' }}</title>
    <meta name="description" content="{{ $description ?? 'Teknolojiyi işletmeniz için bir yük olmaktan çıkarıp, en güçlü rekabet avantajınız haline getiriyoruz.' }}">
    
    {{-- Open Graph --}}
    <meta property="og:title" content="{{ $title ?? 'I/ONET Teknoloji' }}">
    <meta property="og:description" content="{{ $description ?? 'Teknolojiyi işletmeniz için bir yük olmaktan çıkarıp, en güçlü rekabet avantajınız haline getiriyoruz.' }}">
    <meta property="og:image" content="{{ $ogImage ?? asset('images/og-image.jpg') }}">
    <meta property="og:type" content="website">
    
    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title ?? 'I/ONET Teknoloji' }}">
    <meta name="twitter:description" content="{{ $description ?? 'Teknoloji çözümleri' }}">

    {{-- Google Material Symbols --}}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    {{-- Vite CSS --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @stack('styles')
</head>
<body class="font-sans bg-white text-[#111418] antialiased">
    <div class="flex flex-col min-h-screen">
        {{-- Header Component --}}
        @include('components.header')

        {{-- Main Content --}}
        <main class="flex-grow">
            @yield('content')
        </main>

        {{-- Footer Component --}}
        @include('components.footer')
    </div>

    @stack('scripts')
</body>
</html>
