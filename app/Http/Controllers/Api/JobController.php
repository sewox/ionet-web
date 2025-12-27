<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Job;

class JobController extends BaseResourceController
{
    protected $modelClass = Job::class;
}
