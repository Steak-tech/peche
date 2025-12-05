<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sortie;

class SortieSeeder extends Seeder
{
    public function run(): void
    {
        Sortie::create([
            'date' => '2025-06-04',
            'lieu' => 'Étang du Nord',
        ]);

        Sortie::create([
            'date' => '2025-06-05',
            'lieu' => 'Lac Bleu',
        ]);
    }
}
