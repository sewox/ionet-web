<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\SiteSetting;

class BlogController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Blog - I/ONET Teknoloji',
            'description' => 'Teknoloji dünyasından haberler ve makaleler',
            'posts' => BlogPost::where('published', true)->orderBy('date', 'desc')->get(),
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.blog.index', $data);
    }

    public function show($id)
    {
        $post = BlogPost::findOrFail($id);

        $data = [
            'title' => $post->title . ' - I/ONET Teknoloji Blog',
            'description' => $post->summary ?? $post->title,
            'post' => $post,
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.blog.show', $data);
    }
}
