<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Create a separate table for career job postings
        // The 'jobs' table is reserved for Laravel's queue system
        Schema::create('career_jobs', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('title')->nullable();
            $table->string('type')->nullable();
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->string('time')->nullable();
            $table->string('exp')->nullable();
            $table->string('department')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_jobs');
    }
};
