<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Mail;
use App\Models\SiteSetting;

class MessageController extends BaseResourceController
{
    protected $modelClass = Message::class;

    /**
     * Store a message (contact form) - PUBLIC endpoint
     * Must also send email
     */
    public function store(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:100',
            'surname' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|max:5000',
        ]);

        $data = $request->all();
        $data['date'] = now()->toDateTimeString();
        
        $message = Message::create($data);

        // Send email notification (async would be better in production)
        try {
            $mailTo = env('MAIL_TO', 'admin@example.com');
            
            // Simple email sending logic
            // In production, create a Mailable class
            Mail::raw(
                "New contact form submission:\n\n" .
                "Name: {$data['name']} {$data['surname']}\n" .
                "Email: {$data['email']}\n" .
                "Phone: {$data['phone']}\n" .
                "Message: {$data['message']}",
                function ($mail) use ($mailTo, $data) {
                    $mail->to($mailTo)
                        ->subject("New Contact Message: {$data['name']} {$data['surname']}");
                }
            );
        } catch (\Exception $e) {
            // Log but don't fail - email is optional
            \Log::warning('Email send failed: ' . $e->getMessage());
        }

        return response()->json($message, 201);
    }
}
