<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeService;
use Illuminate\Http\Request;

class HomeServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = HomeService::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $services = $query->ordered()->paginate(15);

        return view('admin.home-services.index', compact('services'));
    }

    public function create()
    {
        return view('admin.home-services.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        // Set default order if not provided
        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        HomeService::create($validated);

        return redirect()->route('admin.home-services.index')
                        ->with('success', 'Ana sayfa servisi başarıyla oluşturuldu.');
    }

    public function edit(string $id)
    {
        $service = HomeService::findOrFail($id);
        return view('admin.home-services.form', compact('service'));
    }

    public function update(Request $request, string $id)
    {
        $service = HomeService::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        $service->update($validated);

        return redirect()->route('admin.home-services.index')
                        ->with('success', 'Ana sayfa servisi başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        $service = HomeService::findOrFail($id);
        $service->delete();

        return redirect()->route('admin.home-services.index')
                        ->with('success', 'Ana sayfa servisi başarıyla silindi.');
    }
}
