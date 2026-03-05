<?php

namespace App\Models;

use App\Enums\SortieStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sortie extends Model
{
    protected $fillable = [
        'user_id',
        'lieu',
        'water_type',
        'gps_lat',
        'gps_long',
        'start_time',
        'end_time',
        'weather',
        'distance_meters',
        'observation',
        'description',
        'visibility',
        'sotie_status',
        'sortie_status',
    ];
    public function captures()
{
    return $this->hasMany(Capture::class);
}

    public function user() :belongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function markAsFinished(): void
    {
        $this->update(['sortie_status' => SortieStatusEnum::COMPLETED]);
    }

    public function isFinished(): bool
    {
        return $this->sortie_status === SortieStatusEnum::COMPLETED;
    }

    public function markAsCanceled() : void {
        $this->update(['sortie_status' => SortieStatusEnum::CANCELED]);
    }

    public function isCanceled(): bool
    {
        return $this->sortie_status === SortieStatusEnum::CANCELED;
    }

    public function markAsPending() : void {
        $this->update(['sortie_status' => SortieStatusEnum::PENDING]);
    }

    public function isPending(): bool {
        return $this->sortie_status === SortieStatusEnum::PENDING;
    }
}
