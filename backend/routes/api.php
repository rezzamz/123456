<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HallController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/halls', [HallController::class, 'getHalls']);
    Route::get('/halls/{id}', [HallController::class, 'getHall']);
    Route::get('/halls/{id}/daily-data', [HallController::class, 'getDailyData']);
});