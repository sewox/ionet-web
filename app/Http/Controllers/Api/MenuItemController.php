<?php
namespace App\Http\Controllers\Api;
use App\Models\MenuItem;

class MenuItemController extends BaseResourceController
{
    protected $modelClass = MenuItem::class;
}
