<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $query = Page::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $pages = $query->orderBy('created_at', 'desc')->paginate(15);

        return view('admin.pages.index', compact('pages'));
    }

    public function create()
    {
        return view('admin.pages.form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'content' => 'required|string',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'og_image' => 'nullable|url|max:500',
        ], [
            'slug.regex' => 'Slug sadece küçük harf, rakam ve tire (-) içerebilir.',
            'slug.unique' => 'Bu slug zaten kullanılıyor.',
        ]);

        // Add created_at timestamp
        $validated['created_at'] = now()->toDateTimeString();

        Page::create($validated);

        return redirect()->route('admin.pages.index')
                        ->with('success', 'Sayfa başarıyla oluşturuldu.');
    }

    public function edit(string $id)
    {
        $page = Page::findOrFail($id);
        return view('admin.pages.form', compact('page'));
    }

    public function update(Request $request, string $id)
    {
        $page = Page::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/|unique:pages,slug,' . $id,
            'content' => 'required|string',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'og_image' => 'nullable|url|max:500',
        ], [
            'slug.regex' => 'Slug sadece küçük harf, rakam ve tire (-) içerebilir.',
            'slug.unique' => 'Bu slug zaten kullanılıyor.',
        ]);

        $page->update($validated);

        return redirect()->route('admin.pages.index')
                        ->with('success', 'Sayfa başarıyla güncellendi.');
    }

    public function destroy(string $id)
    {
        $page = Page::findOrFail($id);
        $page->delete();

        return redirect()->route('admin.pages.index')
                        ->with('success', 'Sayfa başarıyla silindi.');
    }
}
