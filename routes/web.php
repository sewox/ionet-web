<?php

use App\Http\Controllers\{HomeController, ContactController, PageController, BlogController};
use App\Http\Controllers\Admin\{AuthController, DashboardController, BlogController as AdminBlogController, MessageController, InfrastructureController, JobController, ProjectController, PageController as AdminPageController, HomeFeatureController, HomeServiceController, CareerValueController, CareerTechController, TechPartnerController, TestimonialController, LegalSectionController, MenuItemController, SiteSettingController};


// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/infrastructure', [PageController::class, 'infrastructure'])->name('infrastructure');
Route::get('/careers', [PageController::class, 'careers'])->name('careers');
Route::get('/references', [PageController::class, 'references'])->name('references');
Route::get('/legal', [PageController::class, 'legal'])->name('legal');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');

// Admin routes
Route::prefix('admin')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('admin.login');
    Route::post('/login', [AuthController::class, 'login'])->name('admin.login.post');
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        
        // Blog Manager
        Route::resource('blog', AdminBlogController::class)->names([
            'index' => 'admin.blog.index',
            'create' => 'admin.blog.create',
            'store' => 'admin.blog.store',
            'show' => 'admin.blog.show',
            'edit' => 'admin.blog.edit',
            'update' => 'admin.blog.update',
            'destroy' => 'admin.blog.destroy',
        ]);
        
        // Infrastructure Features Manager
        Route::resource('infrastructure', InfrastructureController::class)->names([
            'index' => 'admin.infrastructure.index',
            'create' => 'admin.infrastructure.create',
            'store' => 'admin.infrastructure.store',
            'show' => 'admin.infrastructure.show',
            'edit' => 'admin.infrastructure.edit',
            'update' => 'admin.infrastructure.update',
            'destroy' => 'admin.infrastructure.destroy',
        ]);
        
        // Jobs/Careers Manager
        Route::resource('jobs', JobController::class)->names([
            'index' => 'admin.jobs.index',
            'create' => 'admin.jobs.create',
            'store' => 'admin.jobs.store',
            'show' => 'admin.jobs.show',
            'edit' => 'admin.jobs.edit',
            'update' => 'admin.jobs.update',
            'destroy' => 'admin.jobs.destroy',
        ]);
        
        // Projects/References Manager
        Route::resource('projects', ProjectController::class)->names([
            'index' => 'admin.projects.index',
            'create' => 'admin.projects.create',
            'store' => 'admin.projects.store',
            'show' => 'admin.projects.show',
            'edit' => 'admin.projects.edit',
            'update' => 'admin.projects.update',
            'destroy' => 'admin.projects.destroy',
        ]);
        
        // Dynamic Pages Manager
        Route::resource('pages', AdminPageController::class)->names([
            'index' => 'admin.pages.index',
            'create' => 'admin.pages.create',
            'store' => 'admin.pages.store',
            'show' => 'admin.pages.show',
            'edit' => 'admin.pages.edit',
            'update' => 'admin.pages.update',
            'destroy' => 'admin.pages.destroy',
        ]);
        
        // Home Features Manager
        Route::resource('home-features', HomeFeatureController::class)->names([
            'index' => 'admin.home-features.index',
            'create' => 'admin.home-features.create',
            'store' => 'admin.home-features.store',
            'show' => 'admin.home-features.show',
            'edit' => 'admin.home-features.edit',
            'update' => 'admin.home-features.update',
            'destroy' => 'admin.home-features.destroy',
        ]);
        
        // Home Services Manager
        Route::resource('home-services', HomeServiceController::class)->names([
            'index' => 'admin.home-services.index',
            'create' => 'admin.home-services.create',
            'store' => 'admin.home-services.store',
            'show' => 'admin.home-services.show',
            'edit' => 'admin.home-services.edit',
            'update' => 'admin.home-services.update',
            'destroy' => 'admin.home-services.destroy',
        ]);
        
        // Career Values Manager
        Route::resource('career-values', CareerValueController::class)->names([
            'index' => 'admin.career-values.index',
            'create' => 'admin.career-values.create',
            'store' => 'admin.career-values.store',
            'show' => 'admin.career-values.show',
            'edit' => 'admin.career-values.edit',
            'update' => 'admin.career-values.update',
            'destroy' => 'admin.career-values.destroy',
        ]);
        
        // Career Tech Stack Manager
        Route::resource('career-tech', CareerTechController::class)->names([
            'index' => 'admin.career-tech.index',
            'create' => 'admin.career-tech.create',
            'store' => 'admin.career-tech.store',
            'show' => 'admin.career-tech.show',
            'edit' => 'admin.career-tech.edit',
            'update' => 'admin.career-tech.update',
            'destroy' => 'admin.career-tech.destroy',
        ]);
        
        // Tech Partners Manager
        Route::resource('tech-partners', TechPartnerController::class)->names([
            'index' => 'admin.tech-partners.index',
            'create' => 'admin.tech-partners.create',
            'store' => 'admin.tech-partners.store',
            'show' => 'admin.tech-partners.show',
            'edit' => 'admin.tech-partners.edit',
            'update' => 'admin.tech-partners.update',
            'destroy' => 'admin.tech-partners.destroy',
        ]);
        
        // Testimonials Manager
        Route::resource('testimonials', TestimonialController::class)->names([
            'index' => 'admin.testimonials.index',
            'create' => 'admin.testimonials.create',
            'store' => 'admin.testimonials.store',
            'show' => 'admin.testimonials.show',
            'edit' => 'admin.testimonials.edit',
            'update' => 'admin.testimonials.update',
            'destroy' => 'admin.testimonials.destroy',
        ]);
        
        // Legal Sections Manager
        Route::resource('legal-sections', LegalSectionController::class)->names([
            'index' => 'admin.legal-sections.index',
            'create' => 'admin.legal-sections.create',
            'store' => 'admin.legal-sections.store',
            'show' => 'admin.legal-sections.show',
            'edit' => 'admin.legal-sections.edit',
            'update' => 'admin.legal-sections.update',
            'destroy' => 'admin.legal-sections.destroy',
        ]);
        
        // System Settings
        Route::resource('menu-items', MenuItemController::class)->names([
            'index' => 'admin.menu-items.index',
            'create' => 'admin.menu-items.create',
            'store' => 'admin.menu-items.store',
            'edit' => 'admin.menu-items.edit',
            'update' => 'admin.menu-items.update',
            'destroy' => 'admin.menu-items.destroy',
        ]);
        Route::resource('site-settings', SiteSettingController::class)->names([
            'index' => 'admin.site-settings.index',
            'create' => 'admin.site-settings.create',
            'store' => 'admin.site-settings.store',
            'edit' => 'admin.site-settings.edit',
            'update' => 'admin.site-settings.update',
            'destroy' => 'admin.site-settings.destroy',
        ]);
        
        // Messages Inbox
        Route::get('messages', [MessageController::class, 'index'])->name('admin.messages.index');
        Route::post('messages/{id}/toggle-read', [MessageController::class, 'toggleRead'])->name('admin.messages.toggleRead');
        Route::delete('messages/{id}', [MessageController::class, 'destroy'])->name('admin.messages.destroy');
    });
});

// Dynamic CMS pages (must be last)
Route::get('/{slug}', [PageController::class, 'dynamic'])->name('page.dynamic');
