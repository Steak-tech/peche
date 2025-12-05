<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            SortieSeeder::class,
            PoissonSeeder::class,
            CaptureSeeder::class,
        ]);
    }
}
