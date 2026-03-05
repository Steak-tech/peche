<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Capture extends Model
{
    public function user() :belongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sortie() :belongsTo
    {
        return $this->belongsTo(Sortie::class);
    }

    public function poisson() :belongsTo
    {
        return $this->belongsTo(Poisson::class);
    }
}
