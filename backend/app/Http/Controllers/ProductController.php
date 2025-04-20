<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    //show products
    public function index()
    {
        $products = Product::paginate(10);

        return response()->json([
            'data' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'total_pages' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ], 200);
    }

    //store product
   public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        $productData = $request->except('image');
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = Str::random(20) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $productData['image_path'] = '/images/' . $imageName;
        }

        $product = Product::create($productData);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ], 201);
    }


    //show a product
    public function show(Product $product)
    {
        return response()->json([
            'data' => $product,
        ], 200);
    }

    //update product
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'stock' => 'integer|min:0',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $productData = $request->except('image');

        if ($request->hasFile('image')) {
            // delete old image if exists
            if ($product->image_path) {
                $oldImagePath = public_path($product->image_path);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $image = $request->file('image');
            $imageName = Str::random(20) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $productData['image_path'] = '/images/' . $imageName;
        } else {
            $productData['image_path'] = $product->image_path;
        }

        $product->update($productData);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product,
        ], 200);
    }

    //delete product
    public function destroy(Product $product)
    {
        // Delete image if exists
        if ($product->image_path) {
            $imagePath = public_path($product->image_path);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ], 200);
    }

}
