<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasUuid;

    protected $table = 'pages';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'slug',
        'title',
        'content',
        'meta_description',
        'meta_keywords',
        'og_image',
        'created_at',
    ];

    public function scopeBySlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }
}
