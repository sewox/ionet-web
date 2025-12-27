<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\BlogPost;

class BlogPostController extends BaseResourceController
{
    protected $modelClass = BlogPost::class;
}
