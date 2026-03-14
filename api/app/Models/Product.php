<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'name_ina',
        'description',
        'description_ina',
        'colors',
        'type',
        'type_ina',
        'subtype',
        'subtype_ina',
        'price',
        'slug'
    ];

    protected $attributes = [
        'colors' => '[]',
    ];

    protected $casts = [
        'colors' => 'array',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
