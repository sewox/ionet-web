<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteSetting::query();
        
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('ckey', 'like', "%{$search}%")
                  ->orWhere('value', 'like', "%{$search}%")
                  ->orWhere('group_name', 'like', "%{$search}%");
            });
        }
        
        if ($request->filled('group')) {
            $query->byGroup($request->group);
        }
        
        $settings = $query->paginate(15);
        $groups = SiteSetting::distinct()->pluck('group_name')->filter();
        
        return view('admin.site-settings.index', compact('settings', 'groups'));
    }

    public function create()
    {
        return view('admin.site-settings.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ckey' => 'required|string|max:255|unique:site_settings,ckey',
            'value' => 'nullable|string',
            'group_name' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:100',
        ]);
        
        SiteSetting::create($validated);
        
        return redirect()->route('admin.site-settings.index')
                        ->with('success', 'Ayar başarıyla eklendi.');
    }

    public function edit(string $id)
    {
        $setting = SiteSetting::findOrFail($id);
        return view('admin.site-settings.form', compact('setting'));
    }

    public function update(Request $request, string $id)
    {
        $setting = SiteSetting::findOrFail($id);
        
        $validated = $request->validate([
            'ckey' => 'required|string|max:255|unique:site_settings,ckey,' . $id,
            'value' => 'nullable|string',
            'group_name' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:100',
        ]);
        
        $setting->update($validated);
        
        return redirect()->route('admin.site-settings.index')
                        ->with('success', 'Ayar başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        SiteSetting::findOrFail($id)->delete();
        
        return redirect()->route('admin.site-settings.index')
                        ->with('success', 'Ayar başarıyla silindi.');
    }
}
