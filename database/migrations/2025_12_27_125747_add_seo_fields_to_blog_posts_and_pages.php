<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add SEO fields to blog_posts
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->string('meta_keywords')->nullable()->after('meta_description');
            $table->string('og_image')->nullable()->after('image');
        });

        // Add SEO fields to pages
        Schema::table('pages', function (Blueprint $table) {
            $table->string('meta_keywords')->nullable()->after('meta_description');
            $table->string('og_image')->nullable()->after('content');
        });
    }

    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['meta_keywords', 'og_image']);
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['meta_keywords', 'og_image']);
        });
    }
};
