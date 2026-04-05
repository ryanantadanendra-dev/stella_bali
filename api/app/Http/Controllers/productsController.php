<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Mews\Purifier\Facades\Purifier;

class productsController extends Controller
{
    public function get() {
        $products = Product::with('images')->get();

        $column = DB::select("SHOW COLUMNS FROM products WHERE Field = 'subtype'")[0]->Type;

        $categories = collect(
            str_getcsv(
            preg_replace("/^enum\(|\)$/", '', $column),
            ',',
            "'"
            )
        );

        return response()->json([
            'data' => $products,
            'categories' => $categories
        ]);
    }

    public function add(Request $request) {
        $validatedData = $request->validate([
            'name' => ['max:100', Rule::unique('products', 'name')],
            'name_ina' => ['max:100', Rule::unique('products', 'name_ina')],
            'description' => 'required',
            'description_ina' => 'required',
            'colors' => ['required', 'array', 'min:1'],
            'colors.*' => ['string', 'max:50'],
            'type' => 'required',
            'subtype' => 'required',
            'price' => 'required|numeric'
        ]);

        // create slug
        $slug = Str::slug($request->name);

        $cleanContent = Purifier::clean($validatedData['description'], [
            'HTML.Allowed' => 'p,strong,em,ul,ol,li,a[href],br,h2,h3'
        ]);

        $cleanContent_ina = Purifier::clean($validatedData['description_ina'], [
            'HTML.Allowed' => 'p,strong,em,ul,ol,li,a[href],br,h2,h3'
        ]);

        switch ($validatedData['type']) {
            case 'man':
                $type_ina = 'Pria';
                break;
            case 'woman':
                $type_ina = 'Wanita';
                break;
            default:
                $type_ina = 'Pria';
                break;
        }

        switch ($validatedData['subtype']) {
            case 'Tops':
                $subtype_ina = 'Atasan';
                break;
            case 'Bottoms':
                $subtype_ina = 'Bawahan';
                break;
            case 'Swimsuit':
                $subtype_ina = 'Pakaian Renang';
                break;
            case 'Dresses':
                $subtype_ina = 'Gaun';
                break;
            case 'Accessories':
                $subtype_ina = 'Aksesoris';
                break;

            default:
                # code...
                break;
        }

        $product = Product::create([
            'name' => $validatedData['name'],
            'name_ina' => $validatedData['name_ina'],
            'description' => $cleanContent,
            'description_ina' => $cleanContent_ina,
            'colors' => $validatedData['colors'],
            'type' => $validatedData['type'],
            'subtype' => $validatedData['subtype'],
            'price' => $validatedData['price'],
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
                if ($image && Storage::disk('public')->exists($image->path)) {
                    Storage::disk('public')->delete($image->path);
                }

                $image->delete();
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Products deleted successfully',
            ], 201);
        }
    }

    public function edit($id, Request $request) {
        $product = Product::findOrFail($id);

        if(Product::where('name', $request->name)->where('id', '!=', $id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Name Already Exists',
            ], 400);
        }

        $validatedData = $request->validate([
            'name' => ['max:100', 'required'],
            'name_ina' => ['max:100', 'required'],
            'description' => 'required',
            'description_ina' => 'required',
            'colors' => ['required', 'array', 'min:1'],
            'colors.*' => ['string', 'max:50'],
            'type' => 'required',
            'subtype' => 'required',
            'price' => 'required|numeric'
        ]);

        $colors = $validatedData['colors'] ?? [];

        // create slug
        $slug = Str::slug($request->name);

        switch ($validatedData['type']) {
            case 'man':
                $type_ina = 'Pria';
                break;
            case 'woman':
                $type_ina = 'Wanita';
                break;
            default:
                $type_ina = 'Pria';
                break;
        }

        switch ($validatedData['subtype']) {
            case 'Tops':
                $subtype_ina = 'Atasan';
                break;
            case 'Bottoms':
                $subtype_ina = 'Bawahan';
                break;
            case 'Swimsuit':
                $subtype_ina = 'Pakaian Renang';
                break;
            case 'Dresses':
                $subtype_ina = 'Gaun';
                break;
            case 'Accessories':
                $subtype_ina = 'Aksesoris';
                break;

            default:
                # code...
                break;
        }

        $product->update([
            'name' => $validatedData['name'],
            'name_ina' => $validatedData['name_ina'],
            'description' => $validatedData['description'],
            'description_ina' => $validatedData['description_ina'],
            'colors' => $colors,
            'type' => $validatedData['type'],
            'type_ina' => $type_ina,
            'subtype' => $validatedData['subtype'],
            'subtype_ina' => $subtype_ina,
            'price' => $validatedData['price'],
            'slug' => $slug
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
        ], 201);
    }

    public function addImage($id, Request $request) {
        $count = Image::where('product_id', $id)->get()->count();

        if ($count >= 5) {
            return response()->json([
                'success' => false,
                'message' => 'Can only have 5 images',
            ], 422);
        }

            $validateImage = $request->validate([
                'images'   => ['required', 'array', 'min:1'],
                'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            ]);

        $remain = 5 - $count;

        if (count($request->file('images')) > $remain) {
            return response()->json([
                'success' => false,
                'message' => "You can only upload {$remain} more images",
            ], 422);
        }
    
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    $path = $file->store('products', 'public');
    
                    Image::create([
                        'path' => $path,
                        'product_id' => $id,
                    ]);
                }
                return response()->json([
                    'success' => true,
                    'message' => 'Image Added successfully',
                ], 201);
            }
    
    }

    public function deleteImage($id) {
        $image = Image::findOrFail($id);

        if($image) {
            // find image data
            $file = public_path('/storage/'.$image->path);
            unlink($file);

            $image->delete();

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully',
            ], 201);
        }
    }
}
