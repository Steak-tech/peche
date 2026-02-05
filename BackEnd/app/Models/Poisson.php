<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poisson extends Model
{
    protected $fillable = [
        'espece',
        'taille',
        'poids',
        'famille',
        'image_url',
    ];
    public function captures()
{
    return $this->hasMany(Capture::class);
}

}
