<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/password', [AuthController::class, 'updatePassword']);
    Route::get('/products', [ProductController::class, 'index'])->middleware('role:user|admin');
    Route::post('/products/store', [ProductController::class, 'store'])->middleware('role:admin');
    Route::get('/products/{product}', [ProductController::class, 'show'])->middleware('role:user|admin');
    Route::put('/products/{product}', [ProductController::class, 'update'])->middleware('role:admin');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->middleware('role:admin');

    // only accessible for admin role
    // Route::apiResource('products', ProductController::class)->middleware('role:admin');
    Route::apiResource('users', UserController::class)->middleware(['role:admin']);

});