<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\productsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogsController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// PRODUCTS
Route::get('/dashboard/products', [productsController::class, 'get']);
Route::post('/dashboard/product/add', [productsController::class, 'add'])->middleware('auth:sanctum');
Route::delete('/dashboard/product/delete/{id}', [productsController::class, 'delete'])->middleware('auth:sanctum');
Route::put('/dashboard/product/edit/{id}', [productsController::class, 'edit'])->middleware('auth:sanctum');
Route::post('/dashboard/product/add/image/{id}', [productsController::class, 'addImage'])->middleware('auth:sanctum');
Route::delete('/dashboard/product/delete/image/{id}', [productsController::class, 'deleteImage'])->middleware('auth:sanctum');

// BLOGS
Route::get('/dashboard/blogs', [BlogsController::class, 'get']);
Route::post('/dashboard/blogs/add', [BlogsController::class, 'add'])->middleware('auth:sanctum');
Route::delete('/dashboard/blogs/delete/{id}', [BlogsController::class, 'delete'])->middleware('auth:sanctum');
Route::put('dashboard/blogs/edit/{id}', [BlogsController::class, 'edit'])->middleware('auth:sanctum');
Route::put('dashboard/blogs/edit/image/{id}', [BlogsController::class, 'editImage'])->middleware('auth:sanctum');

// CONTACT
Route::get('/dashboard/contact', [ContactController::class, 'get']);
Route::put('/dashboard/contact/edit/{id}', [ContactController::class, 'edit'])->middleware('auth:sanctum');

