<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends BaseResourceController
{
    protected $modelClass = Project::class;
}
