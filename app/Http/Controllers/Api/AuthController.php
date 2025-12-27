<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login endpoint - Cookie-based JWT (Sanctum) authentication
     */
    public function login(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $adminPasswordHash = env('ADMIN_PASSWORD_HASH');
        
        if (!$adminPasswordHash) {
            return response()->json([
                'success' => false,
                'message' => 'Server configuration error'
            ], 500);
        }

        // Laravel bcrypt is compatible with Node.js bcryptjs
        $isValid = Hash::check($request->password, $adminPasswordHash);

        if ($isValid) {
            // For stateless API auth without user model, we  use a simple token approach
            // Since there's no user model, we'll create a response that frontend expects
            $token = Hash::make(env('JWT_SECRET') . time());
            
            // Set httpOnly cookie
            cookie()->queue(cookie(
                'token',
                $token,
                60 * 24, // 24 hours
                '/',
                null,
                false, // secure - false for localhost
                true,  // httpOnly
                false, // raw
                'lax'  // sameSite
            ));

            // Store token in session for verification
            session(['admin_token' => $token, 'admin_logged_in' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Login successful'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    /**
     * Logout endpoint  - Clear cookie and session
     */
    public function logout(Request $request)
    {
        session()->forget(['admin_token', 'admin_logged_in']);
        cookie()->queue(cookie()->forget('token'));

        return response()->json([
            'success' => true,
            'message' => 'Logout successful'
        ]);
    }

    /**
     * Check authentication status
     */
    public function check(Request $request)
    {
        // Check if user has valid session
        if (session('admin_logged_in')) {
            return response()->json([
                'success' => true,
                'authenticated' => true,
                'user' => ['role' => 'admin']
            ]);
        }

        return response()->json([
            'error' => 'Unauthorized'
        ], 401);
    }
}
