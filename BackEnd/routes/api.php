<?php

use App\Http\Controllers\SortieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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


// Route de Login (publique)
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return response()->json(['message' => 'Connecté avec succès']);
    }

    return response()->json(['message' => 'Identifiants incorrects'], 401);
});

// Route de Logout
Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Déconnecté']);
});

// Route protégée (exemple)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('logout', 'logout');
});