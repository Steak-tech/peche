<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sortie extends Model
{
    public function captures()
{
    return $this->hasMany(Capture::class);
}

}
