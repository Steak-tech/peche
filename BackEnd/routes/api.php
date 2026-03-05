<?php

use App\Http\Controllers\SortieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('poissons', App\Http\Controllers\PoissonController::class);

Route::apiResource('users.sorties.captures', App\Http\Controllers\CaptureController::class)
    ->scoped([
        'capture' => 'id'
    ])
    ->parameters([
        'captures' => 'capture',
        'sorties' => 'sortie'
    ]);

Route::apiResource('users.sorties', SortieController::class)
    ->scoped([
        'sortie' => 'id',
    ])
    ->parameters([
        'sorties' => 'sortie'
    ]);


// Route protégée (exemple)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::middleware('auth:sanctum')->post('logout', 'logout');
});