<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasUuid;

    protected $table = 'career_jobs';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'title',
        'type',
        'location',
        'description',
        'time',
        'exp',
        'department',
    ];
}
