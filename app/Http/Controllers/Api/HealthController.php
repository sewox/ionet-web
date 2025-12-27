<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    public function index()
    {
        try {
            // Test database connection
            DB::connection()->getPdo();
            $dbStatus = 'connected';
        } catch (\Exception $e) {
            $dbStatus = 'error';
        }

        $uptime = (int) shell_exec('ps -p ' . getmypid() . ' -o etime= | tr "-" ":"  | awk -F\'[: ]\' \'{print ($1*86400)+($2*3600)+($3*60)+$4}\'') ?: 0;

        return response()->json([
            'status' => $dbStatus === 'connected' ? 'healthy' : 'unhealthy',
            'environment' => env('APP_ENV', 'production'),
            'uptime' => $uptime,
            'uptimeFormatted' => gmdate('H\\h i\\m', $uptime),
            'database' => $dbStatus,
            'databasePath' => env('DB_DATABASE', 'database.sqlite'),
            'timestamp' => now()->toISOString(),
            'version' => '1.0.0'
        ]);
    }
}
