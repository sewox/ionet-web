<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class TechPartner extends Model
{
    use HasUuid;

    protected $table = 'tech_partners';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'name', 'icon', 'order_index'];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index');
    }
}
