<?php

namespace App\Http\Controllers;

use App\Models\{
    InfrastructureFeature,
    TechPartner,
    CareerValue,
    CareerTech,
    Job,
    LegalSection,
    Page,
    SiteSetting
};

class PageController extends Controller
{
    public function infrastructure()
    {
        $data = [
            'title' => 'Altyapı Hizmetleri - I/ONET Teknoloji',
            'description' => 'Kurumsal altyapı çözümleri ve teknoloji hizmetleri',
            'features' => InfrastructureFeature::orderBy('order_index')->get(),
            'techPartners' => TechPartner::orderBy('order_index')->get(),
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.infrastructure', $data);
    }

    public function careers()
    {
        $data = [
            'title' => 'Kariyer - I/ONET Teknoloji',
            'description' => 'Ekibimize katılın, teknoloji ile geleceği inşa edin',
            'jobs' => Job::orderBy('created_at', 'desc')->get(),
            'values' => CareerValue::orderBy('order_index')->get(),
            'techStack' => CareerTech::orderBy('order_index')->get(),
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.careers', $data);
    }

    public function references()
    {
        $data = [
            'title' => 'Referanslar - I/ONET Teknoloji',
            'description' => 'Birlikte çalıştığımız değerli müşterilerimiz',
            'techPartners' => TechPartner::orderBy('order_index')->get(),
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.references', $data);
    }

    public function legal()
    {
        $data = [
            'title' => 'Yasal Bilgiler - I/ONET Teknoloji',
            'description' => 'Gizlilik politikası ve yasal bilgiler',
            'sections' => LegalSection::orderBy('order_index')->get(),
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.legal', $data);
    }

    public function dynamic($slug)
    {
        $page = Page::where('slug', $slug)->first();

        if (!$page) {
            abort(404);
        }

        $data = [
            'title' => $page->title . ' - I/ONET Teknoloji',
            'description' => $page->meta_description ?? $page->title,
            'page' => $page,
            'settings' => SiteSetting::pluck('value', 'ckey'),
        ];

        return view('pages.dynamic', $data);
    }
}
