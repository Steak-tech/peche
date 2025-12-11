<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('captures', App\Http\Controllers\CaptureController::class);

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
