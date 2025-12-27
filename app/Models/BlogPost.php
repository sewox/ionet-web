<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $table = 'blog_posts';
    public $timestamps = false;

    protected $fillable = [
        'title',
        'category',
        'date',
        'summary',
        'image',
        'og_image',
        'content',
        'meta_description',
        'meta_keywords',
        'published',
    ];

    protected $casts = [
        'published' => 'boolean',
    ];
}
