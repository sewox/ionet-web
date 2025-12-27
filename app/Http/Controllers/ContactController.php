<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'İletişim - I/ONET Teknoloji',
            'description' => 'İletişime geçin, size yardımcı olalım.',
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.contact', $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|min:10',
        ]);

        // Create message
        $message = Message::create([
            'id' => (string) Str::uuid(),
            'name' => $validated['name'],
            'sur_name' => $validated['surname'], // Fixed: use sur_name
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? '',
            'message' => $validated['message'],
            'read' => false,
        ]);

        // Send email notification
        try {
            $adminEmail = env('MAIL_TO', 'info@ionet.com.tr');
            
            Mail::raw(
                "Yeni İletişim Formu Mesajı\n\n" .
                "Ad Soyad: {$validated['name']} {$validated['surname']}\n" .
                "Email: {$validated['email']}\n" .
                "Telefon: " . ($validated['phone'] ?? 'Belirtilmedi') . "\n\n" .
                "Mesaj:\n{$validated['message']}",
                function ($mail) use ($adminEmail, $validated) {
                    $mail->to($adminEmail)
                         ->subject('Yeni İletişim Formu Mesajı')
                         ->replyTo($validated['email']);
                }
            );
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Contact form email failed: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
    }
}
