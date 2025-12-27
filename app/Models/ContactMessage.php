<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $table = 'messages';

    protected $fillable = [
        'name',
        'sur_name',
        'email',
        'phone',
        'subject',
        'message',
        'read',
    ];

    protected $casts = [
        'read' => 'boolean',
        'created_at' => 'datetime',
    ];
}
