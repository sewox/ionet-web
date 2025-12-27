<?php

namespace App\Http\Controllers;

use App\Models\{
    HomeFeature,
    HomeService,
    Testimonial,
    TechPartner,
    SiteSetting
};

class HomeController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Ana Sayfa - I/ONET Teknoloji',
            'description' => 'Teknolojiyi işletmeniz için bir yük olmaktan çıkarıp, en güçlü rekabet avantajınız haline getiriyoruz.',
            'features' => HomeFeature::orderBy('order_index')->get(),
            'services' => HomeService::orderBy('order_index')->get(),
            'testimonials' => Testimonial::orderBy('order_index')->get(),
            'techPartners' => TechPartner::orderBy('order_index')->get(),
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.home', $data);
    }
}
