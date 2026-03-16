<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'title_ina',
        'subtitle',
        'subtitle_ina',
        'content',
        'content_ina',
        'image',
        'slug'
    ];
}
