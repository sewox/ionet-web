@php
    $settings = \App\Models\SiteSetting::pluck('value', 'ckey');
    $logoImage = $settings['header_logo_image'] ?? null;
    $logoHeight = $settings['header_logo_height'] ?? '32';
@endphp

<footer class="bg-secondary text-white pt-16 pb-8 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {{-- Column 1: Logo & Description --}}
            <div class="col-span-1 md:col-span-1">
                <div class="flex items-center gap-2 mb-6">
                    @if($logoImage)
                        <img 
                            src="{{ $logoImage }}" 
                            alt="Logo" 
                            class="w-auto object-contain brightness-0 invert"
                            style="height: {{ $logoHeight }}px"
                        >
                    @else
                        <div class="w-8 h-8 flex items-center justify-center bg-primary rounded text-white">
                            <span class="material-symbols-outlined text-[20px]">hub</span>
                        </div>
                        <span class="text-lg font-bold tracking-tight">I/ONET</span>
                    @endif
                </div>
                <div class="text-gray-400 text-sm leading-relaxed mb-6 admin-html-content">
                    {!! $settings['footer_desc'] ?? 'Teknolojiyi işletmeniz için bir yük olmaktan çıkarıp, en güçlü rekabet avantajınız haline getiriyoruz.' !!}
                </div>
                <div class="flex gap-4">
                    <a href="{{ $settings['social_linkedin'] ?? 'https://linkedin.com' }}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                    <a href="{{ $settings['social_twitter'] ?? 'https://twitter.com' }}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                    </a>
                    <a href="{{ $settings['social_facebook'] ?? 'https://facebook.com' }}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    </a>
                </div>
            </div>

            {{-- Column 2: Services --}}
            <div>
                <h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
                    {{ $settings['footer_col2_title'] ?? 'Hizmetler' }}
                </h4>
                <div class="text-sm text-gray-300 space-y-2 footer-links">
                    {!! $settings['footer_col2_content'] ?? '<ul class="space-y-4"><li><a href="/infrastructure">Altyapı Yönetimi</a></li></ul>' !!}
                </div>
            </div>

            {{-- Column 3: Corporate --}}
            <div>
                <h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
                    {{ $settings['footer_col3_title'] ?? 'Kurumsal' }}
                </h4>
                <div class="text-sm text-gray-300 space-y-2 footer-links">
                    {!! $settings['footer_col3_content'] ?? '<ul class="space-y-4"><li><a href="/">Hakkımızda</a></li></ul>' !!}
                </div>
            </div>

            {{-- Column 4: Contact --}}
            <div>
                <h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
                    {{ $settings['footer_col4_title'] ?? 'İletişim' }}
                </h4>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3 text-sm text-gray-300">
                        <span class="material-symbols-outlined text-primary text-base mt-0.5">location_on</span>
                        <span>{{ $settings['contact_address'] ?? 'Teknopark İstanbul, Sanayi Mah. 34906 Pendik/İstanbul' }}</span>
                    </li>
                    <li class="flex items-center gap-3 text-sm text-gray-300">
                        <span class="material-symbols-outlined text-primary text-base">call</span>
                        <span>{{ $settings['contact_phone'] ?? '+90 (212) 555 00 00' }}</span>
                    </li>
                    <li class="flex items-center gap-3 text-sm text-gray-300">
                        <span class="material-symbols-outlined text-primary text-base">mail</span>
                        <span>{{ $settings['contact_email'] ?? 'info@ionet.com.tr' }}</span>
                    </li>
                </ul>
            </div>
        </div>

        {{-- Bottom Bar --}}
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-500 text-xs">© {{ date('Y') }} I/ONET Teknoloji A.Ş. Tüm hakları saklıdır.</p>
            <div class="flex gap-6 text-xs text-gray-500">
                <a href="{{ url('/legal') }}" class="hover:text-primary">Gizlilik Politikası</a>
                <a href="{{ url('/legal') }}" class="hover:text-primary">Kullanım Şartları</a>
                <a href="{{ url('/legal') }}" class="hover:text-primary">KVKK</a>
            </div>
        </div>
    </div>
</footer>
