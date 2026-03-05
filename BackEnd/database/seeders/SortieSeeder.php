<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Sortie;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SortieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first(); // Récupère le premier utilisateur pour associer les sorties

        // 2. Création d'une sortie typique "Carnassier"
        Sortie::create([
            'user_id'         => $user->id,
            'lieu'            => 'Lac de Maine, Angers',
            'start_time'      => now()->subDays(2)->setTime(8, 00), // Il y a 2 jours à 8h
            'end_time'        => now()->subDays(2)->setTime(12, 30),
            'gps_lat'         => 47.462415,
            'gps_long'        => -0.591245,
            'observation'     => 'Eau légèrement trouble, vent d’Ouest.',
            'visibility'      => 'public',
            'water_type'      => 'Lac',
            'weather'         => 'Nuageux',
            'description'     => 'Session matinale à la recherche du brochet.',
            'distance_meters' => 1200,
            'sortie_status' => 'completed',
        ]);

        // 3. Création d'une sortie typique "Rivière" (Privée)
        Sortie::create([
            'user_id'         => $user->id,
            'lieu'            => 'La Mayenne, secteur Grez-Neuville',
            'start_time'      => now()->subDays(5)->setTime(17, 00),
            'end_time'        => now()->subDays(5)->setTime(20, 00),
            'gps_lat'         => 47.632145,
            'gps_long'        => -0.684120,
            'observation'     => 'Belle activité en surface le soir.',
            'visibility'      => 'private',
            'water_type'      => 'Rivière',
            'weather'         => 'Ensoleillé',
            'description'     => 'Coup du soir rapide après le travail.',
            'distance_meters' => 450,
            'sortie_status' => 'pending',
        ]);
    }
}
