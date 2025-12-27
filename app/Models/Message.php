<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasUuid;

    protected $table = 'messages';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'surname',
        'email',
        'phone',
        'message',
        'date',
    ];
}
