<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class HomeService extends Model
{
    use HasUuid;

    protected $table = 'home_services';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'title', 'description', 'icon', 'link', 'order_index'];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index');
    }
}
