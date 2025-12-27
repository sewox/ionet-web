<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InfrastructureFeature;
use Illuminate\Http\Request;

class InfrastructureController extends Controller
{
    public function index(Request $request)
    {
        $query = InfrastructureFeature::query()->orderBy('order_index');

        // Search filter
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $features = $query->paginate(15);

        return view('admin.infrastructure.index', compact('features'));
    }

    public function create()
    {
        return view('admin.infrastructure.form', ['feature' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:500',
            'points' => 'nullable|string',
            'order_index' => 'required|integer|min:0',
        ]);

        // Convert points from newline-separated string to JSON array
        if (!empty($validated['points'])) {
            $pointsArray = array_filter(array_map('trim', explode("\n", $validated['points'])));
            $validated['points'] = json_encode(array_values($pointsArray));
        } else {
            $validated['points'] = json_encode([]);
        }

        InfrastructureFeature::create($validated);

        return redirect()->route('admin.infrastructure.index')
            ->with('success', 'Altyapı özelliği başarıyla oluşturuldu.');
    }

    public function edit($id)
    {
        $feature = InfrastructureFeature::findOrFail($id);
        return view('admin.infrastructure.form', compact('feature'));
    }

    public function update(Request $request, $id)
    {
        $feature = InfrastructureFeature::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:500',
            'points' => 'nullable|string',
            'order_index' => 'required|integer|min:0',
        ]);

        // Convert points from newline-separated string to JSON array
        if (!empty($validated['points'])) {
            $pointsArray = array_filter(array_map('trim', explode("\n", $validated['points'])));
            $validated['points'] = json_encode(array_values($pointsArray));
        } else {
            $validated['points'] = json_encode([]);
        }

        $feature->update($validated);

        return redirect()->route('admin.infrastructure.index')
            ->with('success', 'Altyapı özelliği başarıyla güncellendi.');
    }

    public function destroy($id)
    {
        $feature = InfrastructureFeature::findOrFail($id);
        $feature->delete();

        return redirect()->route('admin.infrastructure.index')
            ->with('success', 'Altyapı özelliği başarıyla silindi.');
    }
}
