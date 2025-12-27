<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    /**
     * Handle file upload
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png,gif,webp,pdf|max:' . (env('MAX_FILE_SIZE', 52428800) / 1024)
        ]);

        if (!$request->hasFile('file')) {
            return response()->json(['error' => 'No file uploaded'], 400);
        }

        $file = $request->file('file');
        
        // Generate unique filename
        $filename = \Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        // Store in public/storage/uploads
        $path = $file->storeAs('uploads', $filename, 'public');

        // Generate URL
        $url = url('storage/' . $path);

        return response()->json(['url' => $url]);
    }
}
