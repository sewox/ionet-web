<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteSetting;

class SettingController extends Controller
{
    /**
     * Get all settings (filter sensitive keys for non-auth users)
     */
    public function index(Request $request)
    {
        $settings = SiteSetting::all();

        // Check if user is authenticated
        $isAuthenticated = session('admin_logged_in', false);

        if (!$isAuthenticated) {
            // Filter sensitive keys
            $sensitiveKeywords = ['smtp_pass', 'smtp_user', 'gemini_api', 'api_key', 'secret', 'password', 'token'];
            
            $settings = $settings->filter(function ($setting) use ($sensitiveKeywords) {
                $keyLower = strtolower($setting->ckey);
                foreach ($sensitiveKeywords as $sensitive) {
                    if (str_contains($keyLower, strtolower($sensitive))) {
                        return false;
                    }
                }
                return true;
            });
        }

        return response()->json($settings->values());
    }

    /**
     * Store or update a setting
     */
    public function store(Request $request)
    {
        $request->validate([
            'ckey' => 'required|string',
            'value' => 'nullable|string',
            'group_name' => 'nullable|string',
            'type' => 'nullable|string',
        ]);

        $existing = SiteSetting::where('ckey', $request->ckey)->first();

        if ($existing) {
            $existing->update($request->only(['value', 'group_name', 'type']));
            return response()->json(['success' => true, 'ckey' => $request->ckey, 'value' => $existing->value]);
        }

        $setting = SiteSetting::create($request->all());
        return response()->json(['success' => true, 'ckey' => $setting->ckey, 'value' => $setting->value]);
    }

    /**
     * Delete a setting
     */
    public function destroy(string $ckey)
    {
        $setting = SiteSetting::where('ckey', $ckey)->first();
        
        if (!$setting) {
            return response()->json(['error' => 'Setting not found'], 404);
        }

        $setting->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}
