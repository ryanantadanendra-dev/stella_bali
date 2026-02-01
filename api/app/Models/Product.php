<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'colors',
        'type',
        'subtype',
        'price',
        'slug'
    ];

    protected $casts = [
        'colors' => 'array',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
