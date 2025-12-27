<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Page;

class PageController extends BaseResourceController
{
    protected $modelClass = Page::class;

    /**
     * Get page by slug
     */
    public function showBySlug(string $slug)
    {
        $page = Page::where('slug', $slug)->first();
        
        if (!$page) {
            return response()->json(['error' => 'Page not found'], 404);
        }
        
        return response()->json($page);
    }
}
