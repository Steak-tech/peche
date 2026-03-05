<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sorties', function (Blueprint $table) {
            $table->dateTime('start_time')->nullable()->after('user_id');
            $table->dateTime('end_time')->nullable()->after('start_time');
            $table->decimal('gps_lat', 10,8)->nullable()->after('end_time');
            $table->decimal('gps_long', 11,8)->nullable()->after('gps_lat');
            $table->text('observation')->nullable()->after('gps_long');
            $table->enum('visibility', ['public', 'private', 'semi_private'])->default('private')->after('observation');
            $table->string('water_type')->nullable()->after('visibility');
            $table->string('weather')->nullable()->after('water_type');
            $table->string('description')->nullable()->after('weather');
            $table->integer('distance_meters')->nullable()->after('description');
            $table->string('sortie_status')->default('pending')->after('distance_meters');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sorties', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'start_time', 'end_time', 'gps_lat', 'gps_long', 'observation', 'visibility', 'water_type', 'weather', 'description', 'distance_meters']);
        });
    }
};
