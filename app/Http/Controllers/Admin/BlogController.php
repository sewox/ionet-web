<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::query()->orderBy('date', 'desc');

        // Search filter
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Category filter
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $posts = $query->paginate(15);
        $categories = BlogPost::distinct()->pluck('category')->filter();

        return view('admin.blog.index', compact('posts', 'categories'));
    }

    public function create()
    {
        return view('admin.blog.form', ['post' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'summary' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|url|max:500',
            'og_image' => 'nullable|url|max:500',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'date' => 'required|date',
            'published' => 'boolean',
        ]);

        $validated['published'] = $request->has('published');

        BlogPost::create($validated);

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog yazısı başarıyla oluşturuldu.');
    }

    public function edit($id)
    {
        $post = BlogPost::findOrFail($id);
        return view('admin.blog.form', compact('post'));
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'summary' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|url|max:500',
            'og_image' => 'nullable|url|max:500',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'date' => 'required|date',
            'published' => 'boolean',
        ]);

        $validated['published'] = $request->has('published');

        $post->update($validated);

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog yazısı başarıyla güncellendi.');
    }

    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog yazısı başarıyla silindi.');
    }
}
