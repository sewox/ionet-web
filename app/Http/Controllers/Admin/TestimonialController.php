<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::query();
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('title', 'like', "%{$search}%")
                  ->orWhere('quote', 'like', "%{$search}%");
            });
        }
        $testimonials = $query->ordered()->paginate(15);
        return view('admin.testimonials.index', compact('testimonials'));
    }

    public function create()
    {
        return view('admin.testimonials.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'quote' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order_index' => 'nullable|integer|min:0',
        ]);
        
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        }
        $validated['order_index'] = $validated['order_index'] ?? 0;
        
        Testimonial::create($validated);
        return redirect()->route('admin.testimonials.index')
                        ->with('success', 'Referans başarıyla eklendi.');
    }

    public function edit(string $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        return view('admin.testimonials.form', compact('testimonial'));
    }

    public function update(Request $request, string $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'quote' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order_index' => 'nullable|integer|min:0',
        ]);
        
        if ($request->hasFile('image')) {
            if ($testimonial->image && Storage::disk('public')->exists($testimonial->image)) {
                Storage::disk('public')->delete($testimonial->image);
            }
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        }
        $validated['order_index'] = $validated['order_index'] ?? 0;
        
        $testimonial->update($validated);
        return redirect()->route('admin.testimonials.index')
                        ->with('success', 'Referans başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        if ($testimonial->image && Storage::disk('public')->exists($testimonial->image)) {
            Storage::disk('public')->delete($testimonial->image);
        }
        $testimonial->delete();
        return redirect()->route('admin.testimonials.index')
                        ->with('success', 'Referans başarıyla silindi.');
    }
}
