<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TechPartner;
use Illuminate\Http\Request;

class TechPartnerController extends Controller
{
    public function index(Request $request)
    {
        $query = TechPartner::query();
        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }
        $partners = $query->ordered()->paginate(15);
        return view('admin.tech-partners.index', compact('partners'));
    }

    public function create()
    {
        return view('admin.tech-partners.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);
        $validated['order_index'] = $validated['order_index'] ?? 0;
        TechPartner::create($validated);
        return redirect()->route('admin.tech-partners.index')
                        ->with('success', 'Teknoloji partneri başarıyla eklendi.');
    }

    public function edit(string $id)
    {
        $partner = TechPartner::findOrFail($id);
        return view('admin.tech-partners.form', compact('partner'));
    }

    public function update(Request $request, string $id)
    {
        $partner = TechPartner::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);
        $validated['order_index'] = $validated['order_index'] ?? 0;
        $partner->update($validated);
        return redirect()->route('admin.tech-partners.index')
                        ->with('success', 'Teknoloji partneri başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        TechPartner::findOrFail($id)->delete();
        return redirect()->route('admin.tech-partners.index')
                        ->with('success', 'Teknoloji partneri başarıyla silindi.');
    }
}
