<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuItem::query();
        
        if ($request->filled('search')) {
            $query->where('label', 'like', "%{$request->search}%");
        }
        
        $menuItems = $query->ordered()->paginate(15);
        
        return view('admin.menu-items.index', compact('menuItems'));
    }

    public function create()
    {
        return view('admin.menu-items.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);
        
        $validated['order_index'] = $validated['order_index'] ?? 0;
        
        MenuItem::create($validated);
        
        return redirect()->route('admin.menu-items.index')
                        ->with('success', 'Menü öğesi başarıyla eklendi.');
    }

    public function edit(string $id)
    {
        $menuItem = MenuItem::findOrFail($id);
        return view('admin.menu-items.form', compact('menuItem'));
    }

    public function update(Request $request, string $id)
    {
        $menuItem = MenuItem::findOrFail($id);
        
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);
        
        $validated['order_index'] = $validated['order_index'] ?? 0;
        
        $menuItem->update($validated);
        
        return redirect()->route('admin.menu-items.index')
                        ->with('success', 'Menü öğesi başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        MenuItem::findOrFail($id)->delete();
        
        return redirect()->route('admin.menu-items.index')
                        ->with('success', 'Menü öğesi başarıyla silindi.');
    }
}
