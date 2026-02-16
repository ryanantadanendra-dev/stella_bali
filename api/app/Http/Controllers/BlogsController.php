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
            "subtitle" => 'required',
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

        $blog = Blog::create([
            'title' => $validatedData['title'],
            'subtitle' => $validatedData['subtitle'],
            'content' => $cleanContent,
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
            $validatedData = $request->validate([
                'title' => 'required|max:100',
                "subtitle" => 'max:150',
                'content' => 'required',
            ]);

            $slug = Str::slug($validatedData['title']);

            $blog->update([
                'title' => $validatedData['title'],
                'subtitle' => $validatedData['subtitle'],
                'content' => $validatedData['content'],
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
