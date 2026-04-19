<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function get() {
        $contact = Contact::firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $contact
        ], 201);
    }

    public function edit($id, Request $request) {
        $contact = Contact::findOrFail($id);

        if($contact) {
            $validatedData = $request->validate([
                'phone' => ['required', 'regex:/^(\+62|62|0)8[1-9][0-9]{6,10}$/']
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
