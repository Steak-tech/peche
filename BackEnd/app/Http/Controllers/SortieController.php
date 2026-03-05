<?php

namespace App\Http\Controllers;

use App\Models\Sortie;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\JsonResponse;

class SortieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user): JsonResponse
    {
        return response()->json([$user->sorties()->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id'         => 'required|exists:users,id',

            'lieu'            => 'required|string|max:255',
            'water_type'      => 'nullable|string|max:100',
            'gps_lat'         => 'nullable|numeric|between:-90,90',
            'gps_long'        => 'nullable|numeric|between:-180,180',

            'start_time'      => 'nullable|date',
            'end_time'        => 'nullable|date|after_or_equal:start_time',

            'weather'         => 'nullable|string|max:255',
            'distance_meters' => 'nullable|integer|min:0',

            'observation'     => 'nullable|string',
            'description'     => 'nullable|string|max:1000',
            'visibility'      => 'required|in:public,private,semi_private',
            'sortie_status' => 'required',
        ]);

        $exists = Sortie::where('user_id', $validatedData['user_id'])
            ->where('sortie_status', 'pending')
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Vous avez déjà une session de pêche en cours.',
                'error_code' => 'ACTIVE_SESSION_EXISTS'
            ], 422);
        }

        $sortie = Sortie::create($validatedData);

        return response()->json($sortie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user,Sortie $sortie)
    {
        $sortie->load('captures.poisson');

        return response()->json([
            'sortie' => $sortie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sortie $sortie)
    {
        Log::info('Données reçues :', $request->all());
        Log::info('Sortie trouvée ID :', ['id' => $sortie->id]);
        $validatedData = $request->validate([
            'user_id'         => 'sometimes|required|exists:users,id',

            'lieu'            => 'sometimes|required|string|max:255',
            'water_type'      => 'nullable|string|max:100',
            'gps_lat'         => 'nullable|numeric|between:-90,90',
            'gps_long'        => 'nullable|numeric|between:-180,180',

            'start_time'      => 'nullable|date',
            'end_time'        => 'nullable|date|after_or_equal:start_time',

            'weather'         => 'nullable|string|max:255',
            'distance_meters' => 'nullable|integer|min:0',

            'observation'     => 'nullable|string',
            'description'     => 'nullable|string|max:1000',
            'visibility'      => 'sometimes|required|in:public,private,semi_private',
            'sortie_status' => 'required',
        ]);

        $sortie->update($validatedData);

        return response()->json($sortie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sortie $sortie)
    {
        try {
            $sortie->delete();
            return response()->json(['message' => 'Sortie deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete sortie', 'details' => $e->getMessage()], 500);
        }
    }
}
