<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\productsController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// PRODUCTS
Route::get('/dashboard/products', [productsController::class, 'get'])->middleware('auth:sanctum');
Route::post('/dashboard/product/add', [productsController::class, 'add'])->middleware('auth:sanctum');
Route::delete('/dashboard/product/delete/{id}', [productsController::class, 'delete'])->middleware('auth:sanctum');
Route::put('/dashboard/product/edit/{id}', [productsController::class, 'edit'])->middleware('auth:sanctum');
Route::post('/dashboard/product/add/image/{id}', [productsController::class, 'addImage'])->middleware('auth:sanctum');
Route::delete('/dashboard/product/delete/image/{id}', [productsController::class, 'deleteImage'])->middleware('auth:sanctum');

