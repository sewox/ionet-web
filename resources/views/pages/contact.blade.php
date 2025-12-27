@extends('layouts.app')

@section('content')
<div class="flex flex-col items-center bg-surface-light min-h-screen pb-24 pt-32">
    <div class="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {{-- Left Column --}}
            <div class="lg:col-span-12 flex flex-col gap-10">
                <div>
                    <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
                        {{ $settings['contact_hero_title'] ?? 'Bize Ulaşın' }}
                    </h1>
                    <p class="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
                        {{ $settings['contact_hero_desc'] ?? 'Teknoloji mimarı olarak iş süreçlerinizi dijitalleştiriyoruz. Projenizi hayata geçirmek için bizimle iletişime geçin.' }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
                    <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                        <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span class="material-symbols-outlined text-[24px]">location_on</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 mb-2 text-lg">Merkez Ofis</h3>
                            <p class="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{{ $settings['contact_address'] ?? "Bilişim Vadisi, Muallimköy Mah.\nDeniz Cad. No:143/5 Gebze/Kocaeli" }}</p>
                        </div>
                    </div>
                    <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                        <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span class="material-symbols-outlined text-[24px]">call</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 mb-2 text-lg">Telefon</h3>
                            <p class="text-gray-600 text-base font-medium">{{ $settings['contact_phone'] ?? '+90 (262) 555 00 00' }}</p>
                            <p class="text-gray-400 text-xs mt-1 font-medium tracking-wide uppercase">{{ $settings['contact_phone_note'] ?? 'Hafta içi 09:00 - 18:00' }}</p>
                        </div>
                    </div>
                    <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                        <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <span class="material-symbols-outlined text-[24px]">mail</span>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 mb-2 text-lg">E-posta</h3>
                            <p class="text-gray-600 text-base font-medium">{{ $settings['contact_email'] ?? 'info@ionet.com.tr' }}</p>
                            <p class="text-gray-400 text-xs mt-1 font-medium tracking-wide uppercase">{{ $settings['contact_email_note'] ?? '7/24 Destek' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Right Column: Form --}}
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 lg:p-12 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8"></div>

            <h2 class="text-3xl font-black text-gray-900 mb-8 relative z-10">İletişim Formu</h2>

            @if(session('success'))
                <div class="bg-green-50 text-green-700 p-6 rounded-2xl flex items-center gap-4 border border-green-200 animate-fade-in">
                    <span class="material-symbols-outlined text-4xl">check_circle</span>
                    <div>
                        <p class="font-bold text-lg mb-1">Mesajınız başarıyla gönderildi!</p>
                        <p class="text-green-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
                    </div>
                </div>
            @else
                <form method="POST" action="{{ route('contact.store') }}" class="flex flex-col gap-6 relative z-10">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-gray-700 ml-1">Adınız *</label>
                            <input 
                                name="name" 
                                value="{{ old('name') }}" 
                                type="text" 
                                class="h-14 w-full rounded-xl border {{ $errors->has('name') ? 'border-red-500' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white' }} bg-gray-50 px-5 text-base outline-none transition-all shadow-sm" 
                                placeholder="Adınız"
                            >
                            @error('name')
                                <span class="text-red-500 text-xs font-semibold ml-1">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-gray-700 ml-1">Soyadınız</label>
                            <input 
                                name="surname" 
                                value="{{ old('surname') }}" 
                                type="text" 
                                class="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 px-5 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm" 
                                placeholder="Soyadınız"
                            >
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-gray-700 ml-1">E-posta Adresi *</label>
                            <input 
                                name="email" 
                                value="{{ old('email') }}" 
                                type="email" 
                                class="h-14 w-full rounded-xl border {{ $errors->has('email') ? 'border-red-500' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white' }} bg-gray-50 px-5 text-base outline-none transition-all shadow-sm" 
                                placeholder="ornek@sirket.com"
                            >
                            @error('email')
                                <span class="text-red-500 text-xs font-semibold ml-1">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-gray-700 ml-1">Telefon</label>
                            <input 
                                name="phone" 
                                value="{{ old('phone') }}" 
                                type="tel" 
                                class="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 px-5 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm" 
                                placeholder="0555 555 55 55"
                            >
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-700 ml-1">Konu</label>
                        <div class="relative">
                            <select 
                                name="subject" 
                                class="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-5 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm"
                            >
                                <option>Genel Bilgi</option>
                                <option>Proje Teklifi</option>
                                <option>Teknik Destek</option>
                                <option>Kariyer</option>
                            </select>
                            <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-bold text-gray-700 ml-1">Mesajınız *</label>
                        <textarea 
                            name="message" 
                            rows="5" 
                            class="w-full rounded-xl border {{ $errors->has('message') ? 'border-red-500' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white' }} bg-gray-50 p-5 text-base outline-none resize-none transition-all shadow-sm" 
                            placeholder="Mesajınız..."
                        >{{ old('message') }}</textarea>
                        @error('message')
                            <span class="text-red-500 text-xs font-semibold ml-1">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-3 p-1">
                            <input 
                                name="privacyAccepted" 
                                type="checkbox" 
                                id="privacy" 
                                class="size-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            >
                            <label for="privacy" class="text-sm text-gray-500 cursor-pointer select-none">
                                KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        class="mt-4 h-14 w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        <span>Mesaj Gönder</span>
                        <span class="material-symbols-outlined text-[24px]">send</span>
                    </button>
                </form>
            @endif
        </div>
    </div>
</div>

{{-- Map Section --}}
<div class="h-[400px] w-full bg-gray-200 relative">
    <div class="absolute inset-0 overflow-hidden">
        <iframe
            src="{{ $settings['contact_map_embed_url'] ?? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.6888769351003!2d29.42859497645086!3d40.80066297138012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb208855427131%3A0x67175440ed3c6130!2sBili%C5%9Fim%20Vadisi!5e0!3m2!1str!2str!4v1710500000000!5m2!1str!2str' }}"
            width="100%"
            height="100%"
            style="border: 0; filter: saturate(0.5) contrast(1.1) opacity(0.9);"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center">
            <div class="size-10 bg-primary rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                <span class="material-symbols-outlined">apartment</span>
            </div>
            <div class="text-center">
                <h4 class="font-bold text-gray-900 text-sm">{{ $settings['contact_map_title'] ?? 'Bilişim Vadisi' }}</h4>
                <p class="text-xs text-gray-500">{{ $settings['contact_map_desc'] ?? 'I/ONET Merkez' }}</p>
            </div>
        </div>
    </div>
</div>
@endsection
