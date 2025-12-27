<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeFeature;
use Illuminate\Http\Request;

class HomeFeatureController extends Controller
{
    public function index(Request $request)
    {
        $query = HomeFeature::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $features = $query->ordered()->paginate(15);

        return view('admin.home-features.index', compact('features'));
    }

    public function create()
    {
        return view('admin.home-features.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        // Set default order if not provided
        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        HomeFeature::create($validated);

        return redirect()->route('admin.home-features.index')
                        ->with('success', 'Ana sayfa özelliği başarıyla oluşturuldu.');
    }

    public function edit(string $id)
    {
        $feature = HomeFeature::findOrFail($id);
        return view('admin.home-features.form', compact('feature'));
    }

    public function update(Request $request, string $id)
    {
        $feature = HomeFeature::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        $feature->update($validated);

        return redirect()->route('admin.home-features.index')
                        ->with('success', 'Ana sayfa özelliği başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        $feature = HomeFeature::findOrFail($id);
        $feature->delete();

        return redirect()->route('admin.home-features.index')
                        ->with('success', 'Ana sayfa özelliği başarıyla silindi.');
    }
}
