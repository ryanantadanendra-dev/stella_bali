<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Support\Str;

class productsController extends Controller
{
    public function get() {
        $products = Product::with('images')->get();

        return response()->json([
            'data' => $products
        ]);
    }

    public function add(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|max:100',
            'description' => 'required',
            'colors' => ['required', 'array', 'min:1'],
            'colors.*' => ['string', 'max:50'],
            'type' => 'required',
            'subtype' => 'required',
            'price' => 'required|numeric'
        ]);

        // create slug
        $slug = Str::slug($request->name);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'colors' => $request->colors,
            'type' => $request->type,
            'subtype' => $request->subtype,
            'price' => $request->price,
            'slug' => $slug
        ]);

        $validateImage = [
            'images'   => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('products', 'public');

                Image::create([
                    'path' => $path,
                    'product_id' => $product->id,
                ]);
            }
        }


        return response()->json([
            'success' => true,
            'message' => 'Product Added Successfully',
        ], 201);
        
    }

    public function delete($id) {
        $product = Product::findOrFail($id);

        if($product) {
            $images = Image::where('product_id', $id)->get();    

            foreach($images as $image) {
                // find image data
                $file = public_path('/storage/'.$image->path);
                unlink($file);

                $image->delete();
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Products deleted successfully',
            ], 201);
        }
    }
}
