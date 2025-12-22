#!/usr/bin/env node

/**
 * Database Seeder Script
 * 
 * This script populates the database with sample data for development and testing.
 * 
 * Usage:
 *   node server/seed.cjs [environment]
 * 
 * Examples:
 *   node server/seed.cjs development
 *   node server/seed.cjs staging
 *   node server/seed.cjs production
 */

const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
const args = process.argv.slice(2);
const environment = args[0] || 'development';
const envFile = path.resolve(__dirname, `../.env.${environment}`);

if (fs.existsSync(envFile)) {
    require('dotenv').config({ path: envFile });
    console.log(`✓ Loaded environment from: .env.${environment}`);
} else {
    console.error(`❌ Environment file not found: ${envFile}`);
    process.exit(1);
}

const getDb = require('./db.cjs');

const sampleData = {
    // Site Settings
    site_settings: [
        { id: uuidv4(), ckey: 'site_title', value: 'I/ONET Teknoloji', group_name: 'general', type: 'text' },
        { id: uuidv4(), ckey: 'site_description', value: 'Kurumsal IT Çözümleri ve Bulut Hizmetleri', group_name: 'general', type: 'text' },
        { id: uuidv4(), ckey: 'site_url', value: 'https://www.ionet.com.tr', group_name: 'general', type: 'text' },
        { id: uuidv4(), ckey: 'contact_email', value: 'info@ionet.com.tr', group_name: 'contact', type: 'email' },
        { id: uuidv4(), ckey: 'contact_phone', value: '+90 (212) 555 00 00', group_name: 'contact', type: 'text' },
        { id: uuidv4(), ckey: 'contact_address', value: 'Teknopark İstanbul, Sanayi Mah. 34906 Pendik/İstanbul', group_name: 'contact', type: 'textarea' },
        { id: uuidv4(), ckey: 'header_logo_text', value: 'I/ONET', group_name: 'branding', type: 'text' },
        { id: uuidv4(), ckey: 'footer_desc', value: 'Teknolojiyi işletmeniz için bir yük olmaktan çıkarıp, en güçlü rekabet avantajınız haline getiriyoruz.', group_name: 'branding', type: 'textarea' },
    ],

    // Menu Items
    menu_items: [
        { id: uuidv4(), label: 'Ana Sayfa', url: '/', order_index: 1 },
        { id: uuidv4(), label: 'Hizmetlerimiz', url: '/infrastructure', order_index: 2 },
        { id: uuidv4(), label: 'Referanslar', url: '/references', order_index: 3 },
        { id: uuidv4(), label: 'Kariyer', url: '/careers', order_index: 4 },
        { id: uuidv4(), label: 'Blog', url: '/blog', order_index: 5 },
        { id: uuidv4(), label: 'İletişim', url: '/contact', order_index: 6 },
    ],

    // Home Features
    home_features: [
        { id: uuidv4(), title: '7/24 Destek', description: 'Her zaman yanınızdayız, teknik destek ekibimiz 7/24 hizmetinizde.', icon: 'support_agent', order_index: 1 },
        { id: uuidv4(), title: 'Güvenilir Altyapı', description: 'Enterprise seviyesinde güvenli ve stabil altyapı çözümleri.', icon: 'security', order_index: 2 },
        { id: uuidv4(), title: 'Hızlı Çözüm', description: 'Sorunlarınıza hızlı ve etkili çözümler sunuyoruz.', icon: 'speed', order_index: 3 },
        { id: uuidv4(), title: 'Uygun Fiyat', description: 'Bütçenize uygun, rekabetçi fiyatlarla en iyi hizmeti alın.', icon: 'attach_money', order_index: 4 },
    ],

    // Home Services
    home_services: [
        { id: uuidv4(), title: 'Bulut Çözümleri', description: 'AWS, Azure ve Google Cloud platformlarında profesyonel bulut altyapı yönetimi.', icon: 'cloud', link: '/infrastructure', order_index: 1 },
        { id: uuidv4(), title: 'Siber Güvenlik', description: 'Kurumsal seviyede güvenlik çözümleri ve penetrasyon testleri.', icon: 'shield', link: '/infrastructure', order_index: 2 },
        { id: uuidv4(), title: 'DevOps & CI/CD', description: 'Modern yazılım geliştirme süreçleri ve otomasyon çözümleri.', icon: 'integration_instructions', link: '/infrastructure', order_index: 3 },
        { id: uuidv4(), title: 'Managed Services', description: '7/24 proaktif izleme ve yönetilen IT hizmetleri.', icon: 'monitor_heart', link: '/infrastructure', order_index: 4 },
    ],

    // Infrastructure Features
    infrastructure_features: [
        { id: uuidv4(), title: 'Bulut Altyapı', description: 'Ölçeklenebilir ve güvenli bulut altyapısı', icon: 'cloud_queue', points: 'AWS Certified\nAzure Expert\nGoogle Cloud Partner\n99.9% Uptime SLA', order_index: 1 },
        { id: uuidv4(), title: 'Güvenlik', description: 'Kapsamlı siber güvenlik çözümleri', icon: 'security', points: 'Penetrasyon Testi\nGüvenlik Duvarı\nDDoS Koruma\n7/24 Monitoring', order_index: 2 },
        { id: uuidv4(), title: 'Yedekleme', description: 'Otomatik yedekleme ve felaket kurtarma', icon: 'backup', points: 'Günlük Otomatik Yedek\nCoğrafi Dağılım\nAnlık Geri Yükleme\nŞifreli Depolama', order_index: 3 },
    ],

    // Tech Partners
    tech_partners: [
        { id: uuidv4(), name: 'AWS', icon: 'aws-logo', order_index: 1 },
        { id: uuidv4(), name: 'Microsoft Azure', icon: 'azure-logo', order_index: 2 },
        { id: uuidv4(), name: 'Google Cloud', icon: 'gcp-logo', order_index: 3 },
        { id: uuidv4(), name: 'Docker', icon: 'docker-logo', order_index: 4 },
        { id: uuidv4(), name: 'Kubernetes', icon: 'k8s-logo', order_index: 5 },
    ],

    // Testimonials
    testimonials: [
        { id: uuidv4(), name: 'Ahmet Yılmaz', title: 'CTO, TechCorp', quote: 'I/ONET ile çalışmak bizim için oyun değiştirici oldu. Altyapımız artık çok daha stabil ve güvenli.', image: null, order_index: 1 },
        { id: uuidv4(), name: 'Ayşe Demir', title: 'IT Müdürü, FinTech A.Ş.', quote: 'Profesyonel yaklaşımları ve 7/24 desteği sayesinde sisteminlerimiz hiç aksama yaşamıyor.', image: null, order_index: 2 },
        { id: uuidv4(), name: 'Mehmet Kaya', title: 'CEO, StartupX', quote: 'Bulut altyapımızı sorunsuz bir şekilde yönettikleri için çok memnunuz. Kesinlikle tavsiye ederim.', image: null, order_index: 3 },
    ],

    // Career Values
    career_values: [
        { id: uuidv4(), title: 'İnovasyon', description: 'Sürekli yenilik ve gelişim odaklı çalışıyoruz', icon: 'lightbulb', order_index: 1 },
        { id: uuidv4(), title: 'Takım Çalışması', description: 'Birlikte başarmanın gücüne inanıyoruz', icon: 'groups', order_index: 2 },
        { id: uuidv4(), title: 'Gelişim', description: 'Çalışanlarımızın kariyer gelişimini destekliyoruz', icon: 'trending_up', order_index: 3 },
        { id: uuidv4(), title: 'Esneklik', description: 'Hibrit çalışma ve esnek saatler', icon: 'schedule', order_index: 4 },
    ],

    // Career Tech Stack
    career_tech_stack: [
        { id: uuidv4(), name: 'React', icon: 'react-icon', order_index: 1 },
        { id: uuidv4(), name: 'Node.js', icon: 'nodejs-icon', order_index: 2 },
        { id: uuidv4(), name: 'Python', icon: 'python-icon', order_index: 3 },
        { id: uuidv4(), name: 'Docker', icon: 'docker-icon', order_index: 4 },
        { id: uuidv4(), name: 'Kubernetes', icon: 'k8s-icon', order_index: 5 },
        { id: uuidv4(), name: 'AWS', icon: 'aws-icon', order_index: 6 },
    ],

    // Jobs
    jobs: [
        { id: uuidv4(), title: 'Senior DevOps Engineer', type: 'Tam Zamanlı', location: 'İstanbul / Hibrit', time: '2024-12-01', exp: '5+ yıl', department: 'Mühendislik' },
        { id: uuidv4(), title: 'Cloud Architect', type: 'Tam Zamanlı', location: 'İstanbul / Uzaktan', time: '2024-12-01', exp: '7+ yıl', department: 'Mimari' },
        { id: uuidv4(), title: 'Frontend Developer', type: 'Tam Zamanlı', location: 'İstanbul / Ofis', time: '2024-12-15', exp: '3+ yıl', department: 'Yazılım' },
    ],

    // Blog Posts
    blog_posts: [
        {
            id: uuidv4(),
            title: 'Bulut Bilişime Geçiş: 2025 Trendleri',
            category: 'Bulut',
            date: '2024-12-20',
            summary: 'Bulut bilişim teknolojilerinin 2025 yılında beklenen gelişmeleri ve işletmelere etkileri.',
            image: null,
            content: '<h2>Bulut Bilişimin Geleceği</h2><p>2025 yılında bulut teknolojileri daha da önemli hale gelecek...</p>'
        },
        {
            id: uuidv4(),
            title: 'Kubernetes ile Container Yönetimi',
            category: 'DevOps',
            date: '2024-12-15',
            summary: 'Kubernetes kullanarak containerlarınızı nasıl verimli yönetebileceğinizi öğrenin.',
            image: null,
            content: '<h2>Kubernetes Nedir?</h2><p>Kubernetes, container orchestration için en popüler araçtır...</p>'
        },
        {
            id: uuidv4(),
            title: 'Siber Güvenlik: 2024 Tehdit Raporu',
            category: 'Güvenlik',
            date: '2024-12-10',
            summary: '2024 yılında en çok karşılaşılan siber güvenlik tehditleri ve korunma yöntemleri.',
            image: null,
            content: '<h2>Güncel Tehditler</h2><p>Siber saldırılar her geçen gün daha sofistike hale geliyor...</p>'
        },
    ],

    // Projects/References
    projects: [
        { id: uuidv4(), title: 'Banka X - Bulut Migrasyonu', category: 'Fintech', description: 'On-premise altyapıdan AWS bulut ortamına tam migrasyon projesi. 200+ sunucu, sıfır downtime.', image: null },
        { id: uuidv4(), title: 'E-Ticaret Y - DevOps Dönüşümü', category: 'E-commerce', description: 'CI/CD pipeline kurulumu ve Kubernetes ile microservices mimarisi.', image: null },
        { id: uuidv4(), title: 'Holding Z - Güvenlik Audit', category: 'Security', description: 'Kapsamlı penetrasyon testi ve güvenlik denetimi projesi.', image: null },
    ],

    // Legal Sections
    legal_sections: [
        {
            id: uuidv4(),
            title: 'Gizlilik Politikası',
            content: '<h2>Gizlilik Politikası</h2><p>Kişisel verilerinizin korunması bizim için önemlidir...</p>',
            anchor: 'privacy',
            order_index: 1
        },
        {
            id: uuidv4(),
            title: 'Kullanım Şartları',
            content: '<h2>Kullanım Şartları</h2><p>Web sitemizi kullanarak aşağıdaki şartları kabul etmiş olursunuz...</p>',
            anchor: 'terms',
            order_index: 2
        },
        {
            id: uuidv4(),
            title: 'KVKK Aydınlatma Metni',
            content: '<h2>KVKK Aydınlatma Metni</h2><p>6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca...</p>',
            anchor: 'kvkk',
            order_index: 3
        },
    ],

    // Pages (Dynamic content)
    pages: [
        {
            id: uuidv4(),
            slug: 'hakkimizda',
            title: 'Hakkımızda',
            content: '<h1>Hakkımızda</h1><p>I/ONET Teknoloji olarak 2015 yılından beri kurumsal IT çözümleri sunuyoruz...</p>',
            created_at: new Date().toISOString()
        },
        {
            id: uuidv4(),
            slug: 'neden-biz',
            title: 'Neden Biz?',
            content: '<h1>Neden I/ONET?</h1><p>Deneyimli ekibimiz, modern teknolojiler ve müşteri memnuniyeti odaklı yaklaşımımız...</p>',
            created_at: new Date().toISOString()
        },
    ],
};

async function seed() {
    console.log('\n🌱 Starting database seeding...\n');

    let db;
    try {
        db = await getDb();
        console.log('✓ Database connection established\n');

        // Seed each table
        for (const [tableName, records] of Object.entries(sampleData)) {
            console.log(`📝 Seeding ${tableName}...`);

            // Get existing count
            const countResult = await db.get(`SELECT COUNT(*) as count FROM ${tableName}`);
            const existingCount = countResult.count;

            if (existingCount > 0) {
                console.log(`   ⚠ Table ${tableName} already has ${existingCount} records`);
                console.log(`   Do you want to clear and reseed? (y/N)`);
                // For non-interactive seeding, skip tables with existing data
                console.log(`   Skipping ${tableName}...\n`);
                continue;
            }

            // Insert records
            for (const record of records) {
                const fields = Object.keys(record);
                const placeholders = fields.map(() => '?').join(',');
                const values = fields.map(f => record[f]);

                const query = `INSERT INTO ${tableName} (${fields.join(',')}) VALUES (${placeholders})`;
                await db.run(query, ...values);
            }

            console.log(`   ✓ Inserted ${records.length} records into ${tableName}\n`);
        }

        console.log('🎉 Database seeding completed successfully!\n');
        console.log('Sample data includes:');
        for (const [tableName, records] of Object.entries(sampleData)) {
            console.log(`   - ${records.length} ${tableName}`);
        }
        console.log('');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        if (db) {
            await db.close();
        }
    }
}

// Run seeder
seed();
