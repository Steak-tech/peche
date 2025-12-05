<?php

namespace App\Http\Controllers;

use App\Models\Capture;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Capture $capture)
    {
        //
    }

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
