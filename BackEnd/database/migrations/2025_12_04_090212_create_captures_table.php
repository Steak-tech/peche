<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('captures', function (Blueprint $table) {
        $table->id();

        // Clés étrangères
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('sortie_id')->constrained()->onDelete('cascade');
        $table->foreignId('poisson_id')->constrained()->onDelete('cascade');

        // Infos supplémentaires sur la capture
        $table->integer('poids')->nullable(); // en grammes
        $table->integer('taille')->nullable(); // en cm
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('captures');
    }
};
