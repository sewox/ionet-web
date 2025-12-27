<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{BlogPost, Job, Project, Message, SiteSetting};

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'stats' => [
                'totalPosts' => BlogPost::count(),
                'totalJobs' => Job::count(),
                'totalProjects' => Project::count(),
                'totalMessages' => Message::count(),
            ],
            'recentMessages' => Message::orderBy('created_at', 'desc')->limit(5)->get(),
            'recentPosts' => BlogPost::orderBy('date', 'desc')->limit(5)->get(),
        ];

        return view('admin.dashboard', $data);
    }
}
