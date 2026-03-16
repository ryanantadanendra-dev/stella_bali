<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Mews\Purifier\Facades\Purifier;

class BlogsController extends Controller
{
    public function get() {
        $blogs = Blog::all();

        return response()->json([
            'success' => true,
            'data' => $blogs
        ], 201);
    }

    public function add(Request $request) {
        $validatedData = $request->validate([
            'title' =>  [
                'required',
                'max:100',
                Rule::unique('blogs', 'title'),
            ],
            'title_ina' =>  [
                'required',
                'max:100',
                Rule::unique('blogs', 'title_ina'),
            ],
            "subtitle" => 'required',
            "subtitle_ina" => 'required',
            'content' => 'required',
            'image' => 'image|mimes:jpeg,jpg,png|max:2048'
        ]);

        // create slug
        $slug = Str::slug($request->title);

        if($request->hasFile('image')) {
            $path = $request->image->store('blogs', 'public');
        }

        $cleanContent = Purifier::clean($request->content, [
            'HTML.Allowed' => 'p,strong,em,ul,ol,li,a[href],br,h2,h3'
        ]);
        $cleanContent_ina = Purifier::clean($request->content_ina, [
            'HTML.Allowed' => 'p,strong,em,ul,ol,li,a[href],br,h2,h3'
        ]);

        $blog = Blog::create([
            'title' => $validatedData['title'],
            'title_ina' => $validatedData['title_ina'],
            'subtitle' => $validatedData['subtitle'],
            'subtitle_ina' => $validatedData['subtitle_ina'],
            'content' => $cleanContent,
            'content_ina' => $cleanContent_ina,
            'image' => $path,
            'slug' => $slug
        ]);

        return response()->json([
            'success' => true,
            'message' => "Blog Created Successfully!"
        ], 201);
    }

    public function edit($id, Request $request) {
        $blog = Blog::findOrFail($id);

        if($blog) {
            if(Blog::where('title', $request->title)->where('id', '!=', $id)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Name Already Exists',
                ], 400);
            }

            if(Blog::where('title_ina', $request->title_ina)->where('id', '!=', $id)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Name Already Exists',
                ], 400);
            }

            $validatedData = $request->validate([
                'title' => 'required|max:100',
                'title_ina' => 'required|max:100',
                "subtitle" => 'max:150',
                "subtitle_ina" => 'max:150',
                'content' => 'required',
                'content_ina' => 'required',
            ]);

            $slug = Str::slug($validatedData['title']);

            $cleanContent = Purifier::clean($request->content, [
                'HTML.Allowed' => 'p,strong,em,ul,ol,li,a[href],br,h2,h3'
            ]);
            $cleanContent_ina = Purifier::clean($request->content_ina, [
                'HTML.Allowed' => 'p,strong,em,ul,ol,li,a[href],br,h2,h3'
            ]);

            $blog->update([
                'title' => $validatedData['title'],
                'title_ina' => $validatedData['title_ina'],
                'subtitle' => $validatedData['subtitle'],
                'subtitle_ina' => $validatedData['subtitle_ina'],
                'content' => $cleanContent,
                'content_ina' => $cleanContent_ina,
                'slug' => $slug
            ]);

            return response()->json([
                'success' => true,
                'message' => "Blog Updated Successfully!"
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => "Blog Not Found"
            ], 404);
        }
    }

    public function delete($id) {
        $blog = Blog::findOrFail($id);

        if($blog) {
            $image = public_path('/storage/'.$blog->image);

            if ($blog->image && Storage::disk('public')->exists($blog->image)) {
                Storage::disk('public')->delete($blog->image);
            }

            $blog->delete();

            return response()->json([
                'success' => true,
                'message' => "Blog Deleted Successfully!"
            ], 201);
        }
    }

    public function editImage($id, Request $request) {
        $blog = Blog::findOrFail($id);
        
        if($blog) {
            $validatedData = [
                'image' => 'image|mimes:jpeg,jpg,png|max:2048'
            ];

            if ($blog->image && Storage::disk('public')->exists($blog->image)) {
                Storage::disk('public')->delete($blog->image);
            }

            $path = $request->image->store('blogs', 'public');

            $blog->update([
                'image' => $path
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Image Updated Successfully!'
            ]);
        }
    }
}
