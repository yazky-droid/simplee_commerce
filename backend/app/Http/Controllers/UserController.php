<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10); 

        return response()->json([
            'data' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'total_pages' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|numeric',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('user');

        return response()->json([
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);

    }

    public function show(User $user)
    {
        return response()->json([
            'data' => $user,
        ], 200);
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|numeric',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id, 
            'password' => 'nullable|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $userData = $request->except('password');

        if ($request->filled('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);
        
        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user,
        ], 200);
    }

    public function destroy(User $user)
    {
        $user->delete();
        
        return response()->json([
            'message' => 'User deleted successfully',
        ], 200); 
    }
    
}
