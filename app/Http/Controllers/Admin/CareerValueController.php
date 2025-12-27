<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CareerValue;
use Illuminate\Http\Request;

class CareerValueController extends Controller
{
    public function index(Request $request)
    {
        $query = CareerValue::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $values = $query->ordered()->paginate(15);

        return view('admin.career-values.index', compact('values'));
    }

    public function create()
    {
        return view('admin.career-values.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        CareerValue::create($validated);

        return redirect()->route('admin.career-values.index')
                        ->with('success', 'Kariyer değeri başarıyla oluşturuldu.');
    }

    public function edit(string $id)
    {
        $value = CareerValue::findOrFail($id);
        return view('admin.career-values.form', compact('value'));
    }

    public function update(Request $request, string $id)
    {
        $value = CareerValue::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        $value->update($validated);

        return redirect()->route('admin.career-values.index')
                        ->with('success', 'Kariyer değeri başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        $value = CareerValue::findOrFail($id);
        $value->delete();

        return redirect()->route('admin.career-values.index')
                        ->with('success', 'Kariyer değeri başarıyla silindi.');
    }
}
