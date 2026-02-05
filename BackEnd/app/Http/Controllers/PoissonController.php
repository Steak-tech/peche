<?php

namespace App\Http\Controllers;

use App\Models\Poisson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PoissonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $poissons = Poisson::all();
        return response()->json($poissons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'espece' => 'required|string|max:255',
            'famille' => 'required|string|max:255',
            'image_url' => 'required|string|max:255',
        ]);

        $poisson = Poisson::create($validatedData);

        return response()->json($poisson, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Poisson $poisson)
    {
        return response()->json($poisson);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Poisson $poisson)
    {
        $validatedData = $request->validate([
            'espece' => 'sometimes|required|string|max:255',
            'famille' => 'sometimes|required|string|max:255',
            'image_url' => 'nullable|url',
        ]);

        $poisson->update($validatedData);

        return response()->json($poisson);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poisson $poisson)
    {
        try {
            $poisson->delete();
            return response()->json([
                'message' => "Le poisson {$poisson->espece} a été supprimé avec succès."
            ], 200);
        } catch (\Exception $e) {
            Log::error("Erreur suppression Poisson ID {$poisson->id} : " . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la suppression.'], 500);
        }
    }
}
