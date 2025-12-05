<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Poisson;

class PoissonSeeder extends Seeder
{
    public function run(): void
    {
        Poisson::create(['espece' => 'Carpe', 'image_url' => 'carpe.png']);
        Poisson::create(['espece' => 'Brochet', 'image_url' => 'brochet.png']);
        Poisson::create(['espece' => 'Truite', 'image_url' => 'truite.png']);
    }
}
