<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Base controller with common CRUD operations
 * All resource controllers can extend this to get standard CRUD functionality
 */
abstract class BaseResourceController extends Controller
{
    /**
     * The model class name
     */
    protected $modelClass;

    /**
     * Validation rules for store/update
     */
    protected $validationRules = [];

    /**
     * Display a listing of the resource
     */
    public function index()
    {
        $query = $this->modelClass::query();
        
        // Apply ordering if model has order_index
        if (in_array('order_index', (new $this->modelClass)->getFillable())) {
            $query->orderBy('order_index');
        }
        
        $items = $query->get();
        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage
     */
    public function store(Request $request)
    {
        if (!empty($this->validationRules)) {
            $request->validate($this->validationRules);
        }

        $data = $request->all();
        $item = $this->modelClass::create($data);
        return response()->json($item, 201);
    }

    /**
     * Display the specified resource
     */
    public function show(string $id)
    {
        $item = $this->modelClass::find($id);
        
        if (!$item) {
            return response()->json(['error' => 'Not found'], 404);
        }
        
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage
     */
    public function update(Request $request, string $id)
    {
        $item = $this->modelClass::find($id);
        
        if (!$item) {
            return response()->json(['error' => 'Not found'], 404);
        }

        if (!empty($this->validationRules)) {
            $request->validate($this->validationRules);
        }

        $item->update($request->all());
        return response()->json(['success' => true, 'id' => $id] + $item->toArray());
    }

    /**
     * Remove the specified resource from storage
     */
    public function destroy(string $id)
    {
        $item = $this->modelClass::find($id);
        
        if (!$item) {
            return response()->json(['error' => 'Not found'], 404);
        }

        $item->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
