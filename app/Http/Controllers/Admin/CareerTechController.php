<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CareerTech;
use Illuminate\Http\Request;

class CareerTechController extends Controller
{
    public function index(Request $request)
    {
        $query = CareerTech::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $techs = $query->ordered()->paginate(15);

        return view('admin.career-tech.index', compact('techs'));
    }

    public function create()
    {
        return view('admin.career-tech.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        CareerTech::create($validated);

        return redirect()->route('admin.career-tech.index')
                        ->with('success', 'Teknoloji başarıyla eklendi.');
    }

    public function edit(string $id)
    {
        $tech = CareerTech::findOrFail($id);
        return view('admin.career-tech.form', compact('tech'));
    }

    public function update(Request $request, string $id)
    {
        $tech = CareerTech::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        if (!isset($validated['order_index'])) {
            $validated['order_index'] = 0;
        }

        $tech->update($validated);

        return redirect()->route('admin.career-tech.index')
                        ->with('success', 'Teknoloji başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        $tech = CareerTech::findOrFail($id);
        $tech->delete();

        return redirect()->route('admin.career-tech.index')
                        ->with('success', 'Teknoloji başarıyla silindi.');
    }
}
