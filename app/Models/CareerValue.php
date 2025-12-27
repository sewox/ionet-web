<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class CareerValue extends Model
{
    use HasUuid;

    protected $table = 'career_values';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'title', 'description', 'icon', 'order_index'];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index');
    }
}
