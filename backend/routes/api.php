<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/password', [AuthController::class, 'updatePassword']);

    // only accessible for admin role
    Route::apiResource('products', ProductController::class)->middleware('role:admin');
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
