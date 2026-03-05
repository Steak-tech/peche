<?php

namespace App\Http\Controllers;

use App\Models\Capture;
use App\Models\Sortie;
use App\Models\User;
use Illuminate\Http\Request;

class CaptureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
            $captures = Capture::with(['user', 'sortie', 'poisson'])->get();
            return response()->json($captures);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user, Sortie $sortie)
    {
        if ($sortie->sortie_status !== 'pending') {
            return response()->json([
                'message' => 'Impossible d\'ajouter une capture à une sortie terminée.'
            ], 403);
        }

        $capture = $sortie->captures()->create($request->all());

        return response()->json($capture, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user, Sortie $sortie, Capture $capture)
    {
        return response()->json([
            'capture' => $capture->load('poisson')
        ]);    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Capture $capture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Capture $capture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Capture $capture)
    {
        //
    }
}
