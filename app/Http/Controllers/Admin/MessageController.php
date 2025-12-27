<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::query()->orderBy('created_at', 'desc');

        // Filter by read/unread status
        if ($request->filled('status')) {
            if ($request->status === 'unread') {
                $query->where('read', false);
            } elseif ($request->status === 'read') {
                $query->where('read', true);
            }
        }

        $messages = $query->paginate(20);
        $unreadCount = ContactMessage::where('read', false)->count();

        return view('admin.messages.index', compact('messages', 'unreadCount'));
    }

    public function toggleRead($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->read = !$message->read;
        $message->save();

        return back()->with('success', $message->read ? 'Mesaj okundu olarak işaretlendi.' : 'Mesaj okunmadı olarak işaretlendi.');
    }

    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return back()->with('success', 'Mesaj başarıyla silindi.');
    }
}
