<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Note: Since we're copying existing database, this migration is for reference/documentation
        // The actual tables already exist in the copied database.sqlite file
        
        // If running fresh, these would create the tables:
        
        if (!Schema::hasTable('blog_posts')) {
            Schema::create('blog_posts', function (Blueprint $table) {
                $table->id();
                $table->string('title')->nullable();
                $table->string('category')->nullable();
                $table->string('date')->nullable();
                $table->text('summary')->nullable();
                $table->string('image')->nullable();
                $table->text('content')->nullable();
                $table->boolean('published')->default(true);
            });
        }

        if (!Schema::hasTable('jobs')) {
            Schema::create('jobs', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('title')->nullable();
                $table->string('type')->nullable();
                $table->string('location')->nullable();
                $table->string('time')->nullable();
                $table->string('exp')->nullable();
                $table->string('department')->nullable();
            });
        }

        if (!Schema::hasTable('projects')) {
            Schema::create('projects', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('title')->nullable();
                $table->string('category')->nullable();
                $table->text('description')->nullable();
                $table->string('image')->nullable();
            });
        }

        if (!Schema::hasTable('pages')) {
            Schema::create('pages', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('slug')->unique();
                $table->string('title')->nullable();
                $table->text('content')->nullable();
                $table->string('created_at')->nullable();
            });
        }

        if (!Schema::hasTable('messages')) {
            Schema::create('messages', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('name')->nullable();
                $table->string('sur_name')->nullable();
                $table->string('email')->nullable();
                $table->string('phone')->nullable();
               $table->string('subject')->nullable();
                $table->text('message')->nullable();
                $table->boolean('read')->default(false);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('site_settings')) {
            Schema::create('site_settings', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('ckey')->unique();
                $table->text('value')->nullable();
                $table->string('group_name')->nullable();
                $table->string('type')->nullable();
            });
        }

        if (!Schema::hasTable('menu_items')) {
            Schema::create('menu_items', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('label')->nullable();
                $table->string('url')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('home_features')) {
            Schema::create('home_features', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('title')->nullable();
                $table->text('description')->nullable();
                $table->string('icon')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('home_services')) {
            Schema::create('home_services', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('title')->nullable();
                $table->text('description')->nullable();
                $table->string('icon')->nullable();
                $table->string('link')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('infrastructure_features')) {
            Schema::create('infrastructure_features', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('title')->nullable();
                $table->text('description')->nullable();
                $table->string('icon')->nullable();
                $table->text('points')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('tech_partners')) {
            Schema::create('tech_partners', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('name')->nullable();
                $table->string('icon')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('testimonials')) {
            Schema::create('testimonials', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('name')->nullable();
                $table->string('title')->nullable();
                $table->text('quote')->nullable();
                $table->string('image')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('career_values')) {
            Schema::create('career_values', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('title')->nullable();
                $table->text('description')->nullable();
                $table->string('icon')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('career_tech_stack')) {
            Schema::create('career_tech_stack', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('name')->nullable();
                $table->string('icon')->nullable();
                $table->integer('order_index')->nullable();
            });
        }

        if (!Schema::hasTable('legal_sections')) {
            Schema::create('legal_sections', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('title')->nullable();
                $table->text('content')->nullable();
                $table->string('anchor')->nullable();
                $table->integer('order_index')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legal_sections');
        Schema::dropIfExists('career_tech_stack');
        Schema::dropIfExists('career_values');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('tech_partners');
        Schema::dropIfExists('infrastructure_features');
        Schema::dropIfExists('home_services');
        Schema::dropIfExists('home_features');
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('pages');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('blog_posts');
    }
};
