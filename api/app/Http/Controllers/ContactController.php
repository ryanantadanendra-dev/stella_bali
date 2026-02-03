<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function get() {
        $contact = Contact::all();

        return response()->json([
            'success' => true,
            'data' => $contact
        ], 201);
    }

    public function edit($id, Request $request) {
        $contact = Contact::findOrFail($id);

        if($contact) {
            $validatedData = $request->validate([
                'phone' => 'required|phone:ID,INTERNATIONAL'
            ]);

            $contact->update([
                'phone' => $validatedData['phone']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Contact Updated Successfully!'
            ], 201);
        }
    }
}
