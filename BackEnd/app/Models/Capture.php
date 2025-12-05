<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Capture extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sortie()
    {
        return $this->belongsTo(Sortie::class);
    }

    public function poisson()
    {
        return $this->belongsTo(Poisson::class);
    }
}
