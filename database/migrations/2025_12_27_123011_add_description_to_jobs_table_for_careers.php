<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // The 'jobs' table exists for Laravel Queue - we need to check the ionet migration
        // Add description column if it doesn't exist in the career jobs table
        if (Schema::hasColumn('jobs', 'department')) {
            // This is our career jobs table (has department field)
            if (!Schema::hasColumn('jobs', 'description')) {
                Schema::table('jobs', function (Blueprint $table) {
                    $table->text('description')->nullable()->after('location');
                });
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('jobs', 'description') && Schema::hasColumn('jobs', 'department')) {
            Schema::table('jobs', function (Blueprint $table) {
                $table->dropColumn('description');
            });
        }
    }
};
