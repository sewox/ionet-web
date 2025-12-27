<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LegalSection;
use Illuminate\Http\Request;

class LegalSectionController extends Controller
{
    public function index(Request $request)
    {
        $query = LegalSection::query();
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }
        $sections = $query->ordered()->paginate(15);
        return view('admin.legal-sections.index', compact('sections'));
    }

    public function create()
    {
        return view('admin.legal-sections.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'anchor' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);
        $validated['order_index'] = $validated['order_index'] ?? 0;
        LegalSection::create($validated);
        return redirect()->route('admin.legal-sections.index')
                        ->with('success', 'Yasal bölüm başarıyla oluşturuldu.');
    }

    public function edit(string $id)
    {
        $section = LegalSection::findOrFail($id);
        return view('admin.legal-sections.form', compact('section'));
    }

    public function update(Request $request, string $id)
    {
        $section = LegalSection::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'anchor' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);
        $validated['order_index'] = $validated['order_index'] ?? 0;
        $section->update($validated);
        return redirect()->route('admin.legal-sections.index')
                        ->with('success', 'Yasal bölüm başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        LegalSection::findOrFail($id)->delete();
        return redirect()->route('admin.legal-sections.index')
                        ->with('success', 'Yasal bölüm başarıyla silindi.');
    }
}
