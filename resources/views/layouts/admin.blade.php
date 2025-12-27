<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? 'Admin Panel' }} - I/ONET</title>

    {{-- Google Material Symbols --}}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    {{-- Vite CSS --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{-- TinyMCE Rich Text Editor --}}
    <script src="https://cdn.tiny.cloud/1/{{ config('services.tinymce.api_key', 'no-api-key') }}/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>

    @stack('styles')
</head>
<body class="bg-gray-50 antialiased">
    <div class="flex min-h-screen">
        @auth
            @include('admin.components.sidebar')
        @endauth
        
        <main class="flex-1 overflow-auto">
            <div>
                @yield('content')
            </div>
        </main>
    </div>

    @stack('scripts')
</body>
</html>
