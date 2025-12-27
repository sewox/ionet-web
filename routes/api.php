<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\HomeFeatureController;
use App\Http\Controllers\Api\HomeServiceController;
use App\Http\Controllers\Api\InfraFeatureController;
use App\Http\Controllers\Api\TechPartnerController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\CareerValueController;
use App\Http\Controllers\Api\CareerTechController;
use App\Http\Controllers\Api\LegalSectionController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\HealthController;

// v1 API Routes
Route::prefix('v1')->group(function () {
    // Authentication routes (public)
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/check', [AuthController::class, 'check']);

    // Public endpoints
    Route::get('/settings', [SettingController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);

    // Health check
    Route::get('/health', [HealthController::class, 'index']);

    // Protected endpoints (require authentication)
    Route::middleware(\App\Http\Middleware\CheckAdminAuth::class)->group(function () {
        // Resource routes
        Route::apiResource('blog_posts', BlogPostController::class);
        Route::apiResource('jobs', JobController::class);
        Route::apiResource('projects', ProjectController::class);
        Route::apiResource('pages', PageController::class);
        Route::get('pages/slug/{slug}', [PageController::class, 'showBySlug']);
        
        Route::apiResource('messages', MessageController::class)->except(['store']);
        Route::apiResource('menu_items', MenuItemController::class);
        Route::apiResource('home_features', HomeFeatureController::class);
        Route::apiResource('home_services', HomeServiceController::class);
        Route::apiResource('infrastructure_features', InfraFeatureController::class);
        Route::apiResource('tech_partners', TechPartnerController::class);
        Route::apiResource('testimonials', TestimonialController::class);
        Route::apiResource('career_values', CareerValueController::class);
        Route::apiResource('career_tech_stack', CareerTechController::class);
        Route::apiResource('legal_sections', LegalSectionController::class);

        // Settings (protected)
        Route::post('/settings', [SettingController::class, 'store']);
        Route::delete('/settings/{ckey}', [SettingController::class, 'destroy']);

        // Upload
        Route::post('/upload', [UploadController::class, 'store']);
    });
});
