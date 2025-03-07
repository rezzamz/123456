<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\DailyData;

class HallController extends Controller
{
    public function getHalls()
    {
        return response()->json(Hall::all());
    }

    public function getHall($id)
    {
        $hall = Hall::find($id);
        if ($hall) {
            return response()->json($hall);
        }
        return response()->json(['error' => 'Hall not found'], 404);
    }

    public function getDailyData($hall_id)
    {
        return response()->json(DailyData::where('hall_id', $hall_id)->get());
    }
}