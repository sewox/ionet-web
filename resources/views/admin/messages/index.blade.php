@extends('layouts.admin')

@section('content')
<div class="mb-8">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Gelen Mesajlar</h1>
            <p class="text-gray-500 mt-1">İletişim formundan gelen mesajları görüntüle</p>
            @if($unreadCount > 0)
                <p class="text-sm text-primary font-medium mt-1">{{ $unreadCount }} okunmamış mesaj</p>
            @endif
        </div>
    </div>

    {{-- Filter --}}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex gap-3">
            <a href="{{ route('admin.messages.index') }}" 
               class="px-4 py-2 rounded-lg font-medium transition-colors {{ !request('status') ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">
                Tümü ({{ \App\Models\ContactMessage::count() }})
            </a>
            <a href="{{ route('admin.messages.index', ['status' => 'unread']) }}" 
               class="px-4 py-2 rounded-lg font-medium transition-colors {{ request('status') === 'unread' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">
                Okunmamış ({{ $unreadCount }})
            </a>
            <a href="{{ route('admin.messages.index', ['status' => 'read']) }}" 
               class="px-4 py-2 rounded-lg font-medium transition-colors {{ request('status') === 'read' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">
                Okunmuş ({{ \App\Models\ContactMessage::where('read', true)->count() }})
            </a>
        </div>
    </div>

    {{-- Success Message --}}
    @if(session('success'))
        <div class="bg-green-50 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3 border border-green-200">
            <span class="material-symbols-outlined">check_circle</span>
            <span>{{ session('success') }}</span>
        </div>
    @endif

    {{-- Messages List --}}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="divide-y divide-gray-200">
            @forelse($messages as $message)
                <div class="p-6 hover:bg-gray-50 transition-colors" x-data="{ open: false }">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1 cursor-pointer" @click="open = !open">
                            <div class="flex items-center gap-3 mb-2">
                                @if(!$message->read)
                                    <span class="w-2 h-2 bg-primary rounded-full"></span>
                                @endif
                                <h3 class="font-bold text-gray-900 {{ !$message->read ? 'font-black' : '' }}">
                                    {{ $message->name }} {{ $message->sur_name ? $message->sur_name : '' }}
                                </h3>
                                <span class="text-xs text-gray-400">
                                    {{ \Carbon\Carbon::parse($message->created_at)->diffForHumans() }}
                                </span>
                            </div>
                            <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[16px]">mail</span>
                                    {{ $message->email }}
                                </span>
                                @if($message->phone)
                                    <span class="flex items-center gap-1">
                                        <span class="material-symbols-outlined text-[16px]">phone</span>
                                        {{ $message->phone }}
                                    </span>
                                @endif
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                                    {{ $message->subject ?? 'Genel' }}
                                </span>
                                @if($message->read)
                                    <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Okundu</span>
                                @else
                                    <span class="px-2 py-1 bg-blue-100 text-primary text-xs font-medium rounded">Yeni</span>
                                @endif
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <form action="{{ route('admin.messages.toggleRead', $message->id) }}" method="POST" class="inline">
                                @csrf
                                <button type="submit" class="p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors" title="{{ $message->read ? 'Okunmadı olarak işaretle' : 'Okundu olarak işaretle' }}">
                                    <span class="material-symbols-outlined text-[20px]">
                                        {{ $message->read ? 'mark_email_unread' : 'mark_email_read' }}
                                    </span>
                                </button>
                            </form>
                            <form action="{{ route('admin.messages.destroy', $message->id) }}" method="POST" class="inline" onsubmit="return confirm('Bu mesajı silmek istediğinize emin misiniz?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                                    <span class="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </form>
                            <button @click="open = !open" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                <span class="material-symbols-outlined text-[20px]" x-text="open ? 'expand_less' : 'expand_more'">expand_more</span>
                            </button>
                        </div>
                    </div>

                    {{-- Message Details (Expandable) --}}
                    <div x-show="open" x-collapse class="mt-4 pt-4 border-t border-gray-200">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-sm font-bold text-gray-700 mb-2">Mesaj:</p>
                            <p class="text-gray-800 whitespace-pre-wrap">{{ $message->message }}</p>
                        </div>
                        <div class="mt-4 text-xs text-gray-500">
                            Gönderilme: {{ \Carbon\Carbon::parse($message->created_at)->format('d.m.Y H:i') }}
                        </div>
                    </div>
                </div>
            @empty
                <div class="px-6 py-12 text-center text-gray-400">
                    <span class="material-symbols-outlined text-5xl mb-2 block text-gray-300">mail</span>
                    @if(request('status') === 'unread')
                        Okunmamış mesaj yok.
                    @elseif(request('status') === 'read')
                        Okunmuş mesaj yok.
                    @else
                        Henüz mesaj yok.
                    @endif
                </div>
            @endforelse
        </div>
    </div>

    {{-- Pagination --}}
    @if($messages->hasPages())
        <div class="mt-6">
            {{ $messages->links() }}
        </div>
    @endif
</div>

@push('scripts')
<script>
// Alpine.js collapse plugin is included in Alpine
</script>
@endpush
@endsection
