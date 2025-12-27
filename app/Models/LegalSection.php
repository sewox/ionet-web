<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class LegalSection extends Model
{
    use HasUuid;

    protected $table = 'legal_sections';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'title', 'content', 'anchor', 'order_index'];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index');
    }
}
