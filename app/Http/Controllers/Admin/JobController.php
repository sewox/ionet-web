<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::query()->orderBy('department');

        // Search filter
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('department', 'like', '%' . $request->search . '%');
            });
        }

        // Department filter
        if ($request->filled('department')) {
            $query->where('department', $request->department);
        }

        $jobs = $query->paginate(15);
        $departments = Job::distinct()->pluck('department')->filter();

        return view('admin.jobs.index', compact('jobs', 'departments'));
    }

    public function create()
    {
        return view('admin.jobs.form', ['job' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'description' => 'required|string',
            'time' => 'nullable|string|max:100',
            'exp' => 'nullable|string|max:100',
            'department' => 'required|string|max:100',
        ]);

        Job::create($validated);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'İş ilanı başarıyla oluşturuldu.');
    }

    public function edit($id)
    {
        $job = Job::findOrFail($id);
        return view('admin.jobs.form', compact('job'));
    }

    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'description' => 'required|string',
            'time' => 'nullable|string|max:100',
            'exp' => 'nullable|string|max:100',
            'department' => 'required|string|max:100',
        ]);

        $job->update($validated);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'İş ilanı başarıyla güncellendi.');
    }

    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();

        return redirect()->route('admin.jobs.index')
            ->with('success', 'İş ilanı başarıyla silindi.');
    }
}
