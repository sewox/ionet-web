@extends('layouts.admin')

@section('content')
<div class="min-h-screen flex bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
    {{-- Animated Background Shapes --}}
    <div class="absolute inset-0">
        <div class="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 w-full flex items-center justify-center p-4 lg:p-8">
        <div class="w-full max-w-6xl grid lg:grid-cols-5 gap-12 items-center">
            
            {{-- Left Section - Branding (3 columns) --}}
            <div class="hidden lg:flex flex-col gap-8 lg:col-span-3 text-white pr-12">
                {{-- Logo --}}
                <div class="flex items-center gap-5">
                    <div class="w-24 h-24 bg-white/95 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                        <span class="material-symbols-outlined text-indigo-600" style="font-size: 56px; font-weight: bold;">hub</span>
                    </div>
                    <div>
                        <h1 class="text-6xl font-black tracking-tight drop-shadow-lg">I/ONET</h1>
                        <p class="text-2xl text-white/90 font-bold mt-1">Teknoloji Platformu</p>
                    </div>
                </div>

                {{-- Headline --}}
                <div class="space-y-6">
                    <h2 class="text-5xl lg:text-6xl font-black leading-tight drop-shadow-lg">
                        Yönetimi<br/>
                        <span class="text-yellow-300">Basitleştirin</span>
                    </h2>
                    <p class="text-2xl text-white/95 leading-relaxed font-medium max-w-xl">
                        İşletmenizi bulutta yönetin. Hızlı, güvenli ve her yerden erişilebilir.
                    </p>
                </div>

                {{-- Stats --}}
                <div class="grid grid-cols-3 gap-6 mt-4">
                    <div class="text-center p-4">
                        <div class="text-4xl font-black text-yellow-300">256</div>
                        <div class="text-sm text-white/80 font-semibold mt-1">Bit Güvenlik</div>
                    </div>
                    <div class="text-center p-4">
                        <div class="text-4xl font-black text-green-300">99.9%</div>
                        <div class="text-sm text-white/80 font-semibold mt-1">Uptime</div>
                    </div>
                    <div class="text-center p-4">
                        <div class="text-4xl font-black text-blue-300">24/7</div>
                        <div class="text-sm text-white/80 font-semibold mt-1">Destek</div>
                    </div>
                </div>
            </div>

            {{-- Right Section - Login Card (2 columns) --}}
            <div class="w-full lg:col-span-2">
                <div class="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/40">
                    {{-- Mobile Logo --}}
                    <div class="lg:hidden flex flex-col items-center gap-4 mb-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl">
                            <span class="material-symbols-outlined text-white" style="font-size: 48px; font-weight: bold;">hub</span>
                        </div>
                        <div class="text-center">
                            <h1 class="text-4xl font-black text-gray-900">I/ONET</h1>
                            <p class="text-lg text-indigo-600 font-bold">Yönetim Paneli</p>
                        </div>
                    </div>

                    {{-- Header --}}
                    <div class="text-center mb-10">
                        <h2 class="text-4xl font-black text-gray-900 mb-3">Hoş Geldiniz!</h2>
                        <p class="text-lg text-gray-600 font-medium">Hesabınıza giriş yapın</p>
                    </div>

                    <form method="POST" action="{{ route('admin.login.post') }}" class="space-y-6">
                        @csrf

                        {{-- Username --}}
                        <div>
                            <label class="block text-base font-black text-gray-900 mb-3">
                                Kullanıcı Adı
                            </label>
                            <div class="relative group">
                                <div class="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <span class="material-symbols-outlined text-gray-400 group-focus-within:text-indigo-600 transition-colors" style="font-size: 24px;">person</span>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value="{{ old('username') }}"
                                    class="w-full h-16 pl-16 pr-6 text-lg bg-gray-50 border-2 border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                    placeholder="admin"
                                    required
                                    autocomplete="username"
                                >
                            </div>
                        </div>

                        {{-- Password --}}
                        <div>
                            <label class="block text-base font-black text-gray-900 mb-3">
                                Şifre
                            </label>
                            <div class="relative group">
                                <div class="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <span class="material-symbols-outlined text-gray-400 group-focus-within:text-indigo-600 transition-colors" style="font-size: 24px;">lock</span>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    class="w-full h-16 pl-16 pr-6 text-lg bg-gray-50 border-2 border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                    autocomplete="current-password"
                                >
                            </div>
                        </div>

                        {{-- Error --}}
                        @if($errors->any())
                            <div class="bg-red-50 border-2 border-red-400 text-red-800 px-5 py-4 rounded-2xl flex items-center gap-4">
                                <span class="material-symbols-outlined text-red-600" style="font-size: 28px;">error</span>
                                <span class="font-bold text-base">{{ $errors->first() }}</span>
                            </div>
                        @endif

                        {{-- Submit --}}
                        <button
                            type="submit"
                            class="w-full h-16 mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-600/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
                        >
                            <span class="material-symbols-outlined" style="font-size: 28px;">login</span>
                            <span>Giriş Yap</span>
                        </button>
                    </form>

                    {{-- Demo --}}
                    <div class="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl">
                        <div class="flex items-start gap-4">
                            <span class="material-symbols-outlined text-indigo-600" style="font-size: 32px;">info</span>
                            <div>
                                <p class="text-gray-900 font-black mb-2 text-base">Demo Hesabı:</p>
                                <div class="flex items-center gap-3 flex-wrap">
                                    <code class="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-base">admin</code>
                                    <span class="text-gray-400 font-bold text-xl">/</span>
                                    <code class="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-base">admin123</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Footer --}}
                    <div class="mt-10 text-center">
                        <p class="text-gray-500 font-semibold text-sm">
                            © 2025 I/ONET Teknoloji
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

