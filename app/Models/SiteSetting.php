<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasUuid;

    protected $table = 'site_settings';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'ckey',
        'value',
        'group_name',
        'type',
    ];

    public function scopeByKey($query, $key)
    {
        return $query->where('ckey', $key);
    }

    public function scopeByGroup($query, $group)
    {
        return $query->where('group_name', $group);
    }
}
