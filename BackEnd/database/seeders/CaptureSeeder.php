<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Capture;
use App\Models\User;
use App\Models\Sortie;
use App\Models\Poisson;

class CaptureSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();         // prends le premier user
        $sortie = Sortie::first();     // prends la première sortie
        $poisson = Poisson::first();   // prends le premier poisson

        Capture::create([
            'user_id' => $user->id,
            'sortie_id' => $sortie->id,
            'poisson_id' => $poisson->id,
            'poids' => 1200,
            'taille' => 45,
        ]);
    }
}
