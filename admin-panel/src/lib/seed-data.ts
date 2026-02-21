/* ===== SEED DATA — LearnStart MVP (Expanded) ===== */

export interface Category {
    id: string;
    name: string;
    icon: string;
    image: string;
    order: number;
}

export interface Business {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    icon: string;
    image: string;
    slug: string;
    order: number;
}

export interface Phase {
    id: string;
    businessId: string;
    name: string;
    description: string;
    order: number;
}

export interface Video {
    id: string;
    phaseId: string;
    youtubeUrl: string;
    youtubeId: string;
    title: string;
    description: string;
    duration: string;
    order: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Task {
    id: string;
    phaseId: string;
    title: string;
    description: string;
    order: number;
}

export interface Problem {
    id: string;
    title: string;
    explanation: string;
    businessId: string;
    phaseId: string;
    videoIds: string[];
}

// ===== CATEGORIES =====
export const categories: Category[] = [
    { id: 'cat-digital', name: 'Digital Businesses', icon: '💻', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', order: 1 },
    { id: 'cat-physical', name: 'Physical Businesses', icon: '🏪', image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80', order: 2 },
    { id: 'cat-service', name: 'Service Businesses', icon: '🤝', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', order: 3 },
    { id: 'cat-local', name: 'Local Businesses', icon: '📍', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', order: 4 },
    { id: 'cat-startup', name: 'Advanced Startups', icon: '🚀', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', order: 5 },
];

// ===== BUSINESSES =====
export const businesses: Business[] = [
    // ── Digital Businesses ──
    { id: 'biz-freelancing', categoryId: 'cat-digital', name: 'Freelancing', description: 'Start earning as a freelancer on Upwork, Fiverr, and through direct outreach.', icon: '💼', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80', slug: 'freelancing', order: 1 },
    { id: 'biz-ecommerce', categoryId: 'cat-digital', name: 'E-Commerce', description: 'Launch a Shopify or WooCommerce store selling physical or digital products.', icon: '🛒', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', slug: 'e-commerce', order: 2 },
    { id: 'biz-saas', categoryId: 'cat-digital', name: 'SaaS / AI Tools', description: 'Build and sell software-as-a-service or AI-powered tools.', icon: '⚡', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', slug: 'saas-ai-tools', order: 3 },
    { id: 'biz-content', categoryId: 'cat-digital', name: 'Content Creation', description: 'Monetize YouTube, TikTok, blogs, or newsletters as a full-time creator.', icon: '🎬', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', slug: 'content-creation', order: 4 },
    { id: 'biz-agency', categoryId: 'cat-digital', name: 'Digital Marketing Agency', description: 'Start an agency offering SEO, ads, social media, and branding services.', icon: '📈', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', slug: 'digital-marketing-agency', order: 5 },
    { id: 'biz-dropshipping', categoryId: 'cat-digital', name: 'Dropshipping', description: 'Sell products online without holding inventory using suppliers.', icon: '📦', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', slug: 'dropshipping', order: 6 },
    { id: 'biz-affiliate', categoryId: 'cat-digital', name: 'Affiliate Marketing', description: 'Earn commissions by promoting other people\'s products and services.', icon: '🔗', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80', slug: 'affiliate-marketing', order: 7 },

    // ── Physical Businesses ──
    { id: 'biz-tshirt', categoryId: 'cat-physical', name: 'T-Shirt Printing', description: 'Start a print-on-demand or custom t-shirt business with minimal investment.', icon: '👕', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80', slug: 't-shirt-printing', order: 1 },
    { id: 'biz-clothing', categoryId: 'cat-physical', name: 'Clothing Brand', description: 'Launch your own fashion brand from design to manufacturing to sales.', icon: '👗', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80', slug: 'clothing-brand', order: 2 },
    { id: 'biz-food', categoryId: 'cat-physical', name: 'Food / Cloud Kitchen', description: 'Start a food delivery or cloud kitchen business from home.', icon: '🍕', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', slug: 'food-cloud-kitchen', order: 3 },
    { id: 'biz-manufacturing', categoryId: 'cat-physical', name: 'Manufacturing (Small Scale)', description: 'Start small-scale manufacturing of products with local demand.', icon: '🏭', image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80', slug: 'manufacturing', order: 4 },
    { id: 'biz-reselling', categoryId: 'cat-physical', name: 'Reselling / Wholesale', description: 'Buy in bulk and resell for profit through online or offline channels.', icon: '📦', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80', slug: 'reselling-wholesale', order: 5 },
    { id: 'biz-franchise', categoryId: 'cat-physical', name: 'Franchise Business', description: 'Invest in a proven franchise model to start with built-in brand recognition.', icon: '🏢', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', slug: 'franchise', order: 6 },

    // ── Service Businesses ──
    { id: 'biz-consulting', categoryId: 'cat-service', name: 'Consulting', description: 'Offer expert advice and strategy in your domain of expertise.', icon: '🧠', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', slug: 'consulting', order: 1 },
    { id: 'biz-smm', categoryId: 'cat-service', name: 'Social Media Management', description: 'Manage social media accounts for brands and businesses.', icon: '📱', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80', slug: 'social-media-management', order: 2 },
    { id: 'biz-videoagency', categoryId: 'cat-service', name: 'Video Editing Agency', description: 'Offer professional video editing services for creators and brands.', icon: '🎞️', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80', slug: 'video-editing-agency', order: 3 },
    { id: 'biz-webdev', categoryId: 'cat-service', name: 'Web Development Agency', description: 'Build and sell websites and web applications for businesses.', icon: '🌐', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80', slug: 'web-development-agency', order: 4 },
    { id: 'biz-coaching', categoryId: 'cat-service', name: 'Coaching / Course Business', description: 'Create and sell online courses or offer 1:1 coaching.', icon: '🎓', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80', slug: 'coaching-courses', order: 5 },

    // ── Local Businesses ──
    { id: 'biz-events', categoryId: 'cat-local', name: 'Event Management', description: 'Plan and execute weddings, parties, corporate events, and more.', icon: '🎉', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', slug: 'event-management', order: 1 },
    { id: 'biz-rental', categoryId: 'cat-local', name: 'Rental Business', description: 'Rent out equipment, vehicles, spaces, or other assets.', icon: '🔑', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', slug: 'rental-business', order: 2 },
    { id: 'biz-tuition', categoryId: 'cat-local', name: 'Tuition Classes', description: 'Start tutoring or coaching classes online or in your locality.', icon: '📚', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', slug: 'tuition-classes', order: 3 },
    { id: 'biz-photography', categoryId: 'cat-local', name: 'Photography', description: 'Start a photography business for weddings, events, or commercial clients.', icon: '📷', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80', slug: 'photography', order: 4 },
    { id: 'biz-repair', categoryId: 'cat-local', name: 'Repair Services', description: 'Offer mobile, laptop, appliance, or other repair services locally.', icon: '🔧', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80', slug: 'repair-services', order: 5 },
    { id: 'biz-tiffin', categoryId: 'cat-local', name: 'Tiffin Service', description: 'Start a home-cooked meal delivery service for working professionals.', icon: '🍱', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', slug: 'tiffin-service', order: 6 },

    // ── Advanced Startups ──
    { id: 'biz-techstartup', categoryId: 'cat-startup', name: 'Tech Startup', description: 'Build a technology startup from idea to fundraising to scale.', icon: '💡', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', slug: 'tech-startup', order: 1 },
    { id: 'biz-d2c', categoryId: 'cat-startup', name: 'D2C Brand', description: 'Launch a direct-to-consumer brand selling online without middlemen.', icon: '🎯', image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&q=80', slug: 'd2c-brand', order: 2 },
    { id: 'biz-marketplace', categoryId: 'cat-startup', name: 'Marketplace Startup', description: 'Build a two-sided marketplace connecting buyers and sellers.', icon: '🏬', image: 'https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=600&q=80', slug: 'marketplace-startup', order: 3 },
    { id: 'biz-edtech', categoryId: 'cat-startup', name: 'EdTech', description: 'Build an education technology platform or learning product.', icon: '🎓', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80', slug: 'edtech', order: 4 },
    { id: 'biz-fintech', categoryId: 'cat-startup', name: 'FinTech', description: 'Build financial technology products for payments, lending, or investing.', icon: '💳', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', slug: 'fintech', order: 5 },
    { id: 'biz-aistartup', categoryId: 'cat-startup', name: 'AI Startup', description: 'Build an artificial intelligence startup solving real-world problems.', icon: '🤖', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80', slug: 'ai-startup', order: 6 },
];

// ===== STANDARD PHASE TEMPLATES =====
const phaseTemplates = [
    { name: 'Foundation', descFn: (biz: string) => `Understand the ${biz} landscape, pick your niche, and build the right mindset.` },
    { name: 'Validation', descFn: (biz: string) => `Test your idea in the market, get early feedback, and validate real demand for your ${biz}.` },
    { name: 'Product / Service Creation', descFn: (biz: string) => `Build your core offering — product, service, or MVP for your ${biz}.` },
    { name: 'Setup', descFn: (biz: string) => `Set up tools, platforms, legal basics, and operations infrastructure for your ${biz}.` },
    { name: 'Marketing', descFn: (biz: string) => `Build awareness and attract your first customers through organic and paid marketing.` },
    { name: 'Sales', descFn: (biz: string) => `Learn sales techniques, pricing strategy, and closing deals for your ${biz}.` },
    { name: 'Operations', descFn: (biz: string) => `Streamline workflows, systems, customer support, and daily operations.` },
    { name: 'Scaling', descFn: (biz: string) => `Scale revenue, build a team, automate processes, and grow your ${biz} to the next level.` },
];

// Generate phases for all businesses
export const phases: Phase[] = businesses.flatMap((biz) =>
    phaseTemplates.map((tmpl, idx) => ({
        id: `phase-${biz.slug}-${idx + 1}`,
        businessId: biz.id,
        name: tmpl.name,
        description: tmpl.descFn(biz.name),
        order: idx + 1,
    }))
);

// ===== VIDEOS =====
// 6 preloaded businesses with real YouTube videos
export const videos: Video[] = [
    // ── FREELANCING VIDEOS ──
    // Foundation
    { id: 'vid-free-1', phaseId: 'phase-freelancing-1', youtubeUrl: 'https://www.youtube.com/watch?v=0oVfVJrF1uU', youtubeId: '0oVfVJrF1uU', title: 'How to Start Freelancing — Complete Beginner Guide', description: 'Everything you need to know to start freelancing from zero. Covers mindset, platforms, and first steps.', duration: '18:32', order: 1, difficulty: 'beginner' },
    { id: 'vid-free-2', phaseId: 'phase-freelancing-1', youtubeUrl: 'https://www.youtube.com/watch?v=V6k7a8H2x9M', youtubeId: 'V6k7a8H2x9M', title: 'Finding Your Freelance Niche & Positioning', description: 'How to pick the right niche that matches your skills and has real market demand.', duration: '14:20', order: 2, difficulty: 'beginner' },
    // Validation
    { id: 'vid-free-3', phaseId: 'phase-freelancing-2', youtubeUrl: 'https://www.youtube.com/watch?v=G5V6KJk3b3A', youtubeId: 'G5V6KJk3b3A', title: 'Getting Your First Freelance Clients — Outreach Strategy', description: 'Step-by-step outreach strategy to land your first paying clients through cold emails and proposals.', duration: '22:10', order: 1, difficulty: 'beginner' },
    // Product / Service Creation
    { id: 'vid-free-4', phaseId: 'phase-freelancing-3', youtubeUrl: 'https://www.youtube.com/watch?v=Jm9Y4b2kL9Q', youtubeId: 'Jm9Y4b2kL9Q', title: 'Building a Freelance Portfolio That Converts', description: 'Create a portfolio that wins clients even without prior experience or case studies.', duration: '15:45', order: 1, difficulty: 'beginner' },
    // Scaling
    { id: 'vid-free-5', phaseId: 'phase-freelancing-8', youtubeUrl: 'https://www.youtube.com/watch?v=Y9pF0bq7X6U', youtubeId: 'Y9pF0bq7X6U', title: 'Scaling Freelancing Into an Agency', description: 'How to transition from solo freelancer to running a profitable agency with a team.', duration: '20:15', order: 1, difficulty: 'advanced' },

    // ── T-SHIRT PRINTING VIDEOS ──
    // Foundation
    { id: 'vid-tshirt-1', phaseId: 'phase-t-shirt-printing-1', youtubeUrl: 'https://www.youtube.com/watch?v=7x2mQp1s9Zk', youtubeId: '7x2mQp1s9Zk', title: 'T-Shirt Printing Methods Explained — DTG, Screen Print, Heat Press', description: 'Complete breakdown of every printing method — which one is right for your budget and scale.', duration: '14:10', order: 1, difficulty: 'beginner' },
    { id: 'vid-tshirt-2', phaseId: 'phase-t-shirt-printing-1', youtubeUrl: 'https://www.youtube.com/watch?v=1bG9R2HkT3Y', youtubeId: '1bG9R2HkT3Y', title: 'Finding a Profitable Clothing Niche', description: 'Research techniques to find niches people actually pay for in the t-shirt business.', duration: '11:35', order: 2, difficulty: 'beginner' },
    // Product / Service Creation
    { id: 'vid-tshirt-3', phaseId: 'phase-t-shirt-printing-3', youtubeUrl: 'https://www.youtube.com/watch?v=E2aX0yVbR0U', youtubeId: 'E2aX0yVbR0U', title: 'Canva T-Shirt Design Tutorial for Beginners', description: 'Create professional t-shirt designs for free using Canva — no design experience needed.', duration: '21:45', order: 1, difficulty: 'beginner' },
    // Setup
    { id: 'vid-tshirt-4', phaseId: 'phase-t-shirt-printing-4', youtubeUrl: 'https://www.youtube.com/watch?v=4yKX9Kk2p6M', youtubeId: '4yKX9Kk2p6M', title: 'Setting Up Your T-Shirt Store on Shopify', description: 'Complete Shopify store launch walkthrough for clothing brands.', duration: '25:30', order: 1, difficulty: 'beginner' },
    // Marketing
    { id: 'vid-tshirt-5', phaseId: 'phase-t-shirt-printing-5', youtubeUrl: 'https://www.youtube.com/watch?v=8Wk6F3nL9xE', youtubeId: '8Wk6F3nL9xE', title: 'Clothing Brand Marketing — Instagram Reels Strategy', description: 'Use Instagram Reels and TikTok to market your clothing brand organically for free.', duration: '16:15', order: 1, difficulty: 'intermediate' },

    // ── E-COMMERCE VIDEOS ──
    // Foundation
    { id: 'vid-ecom-1', phaseId: 'phase-e-commerce-1', youtubeUrl: 'https://www.youtube.com/watch?v=V8Z8qG8yL1Q', youtubeId: 'V8Z8qG8yL1Q', title: 'How to Start an E-Commerce Store Step by Step', description: 'From zero to live store — complete beginner e-commerce tutorial covering everything.', duration: '28:40', order: 1, difficulty: 'beginner' },
    // Validation
    { id: 'vid-ecom-2', phaseId: 'phase-e-commerce-2', youtubeUrl: 'https://www.youtube.com/watch?v=2pS6zF6r5Q8', youtubeId: '2pS6zF6r5Q8', title: 'Product Research Methods That Actually Work', description: 'Find winning products using data-driven research and trend analysis methods.', duration: '19:15', order: 1, difficulty: 'beginner' },
    // Marketing
    { id: 'vid-ecom-3', phaseId: 'phase-e-commerce-5', youtubeUrl: 'https://www.youtube.com/watch?v=Q4R3k3d4J0E', youtubeId: 'Q4R3k3d4J0E', title: 'Facebook & Instagram Ads for E-Commerce', description: 'Learn to run your first profitable social media ad campaigns for your store.', duration: '24:30', order: 1, difficulty: 'intermediate' },
    // Sales
    { id: 'vid-ecom-4', phaseId: 'phase-e-commerce-6', youtubeUrl: 'https://www.youtube.com/watch?v=Kx2H7t8b6A4', youtubeId: 'Kx2H7t8b6A4', title: 'E-Commerce Conversion Optimization Tips', description: 'Tips to increase your store conversion rate and average order value dramatically.', duration: '17:20', order: 1, difficulty: 'intermediate' },
    // Operations
    { id: 'vid-ecom-5', phaseId: 'phase-e-commerce-7', youtubeUrl: 'https://www.youtube.com/watch?v=0l7s0gJ8hV0', youtubeId: '0l7s0gJ8hV0', title: 'Order Fulfillment Workflow Explained', description: 'End-to-end order fulfillment — from order received to customer delivered.', duration: '13:50', order: 1, difficulty: 'beginner' },

    // ── AGENCY VIDEOS ──
    // Foundation
    { id: 'vid-agency-1', phaseId: 'phase-digital-marketing-agency-1', youtubeUrl: 'https://www.youtube.com/watch?v=1mHjMNZZvFo', youtubeId: '1mHjMNZZvFo', title: 'Starting a Digital Marketing Agency from Scratch', description: 'How to start a profitable agency from zero with no experience — complete roadmap.', duration: '22:00', order: 1, difficulty: 'beginner' },
    // Validation
    { id: 'vid-agency-2', phaseId: 'phase-digital-marketing-agency-2', youtubeUrl: 'https://www.youtube.com/watch?v=4qzQ8y9Y0M0', youtubeId: '4qzQ8y9Y0M0', title: 'Getting Your First Agency Clients', description: 'Outreach templates and strategies to sign your first 3 paying agency clients.', duration: '18:30', order: 1, difficulty: 'beginner' },
    // Product / Service Creation
    { id: 'vid-agency-3', phaseId: 'phase-digital-marketing-agency-3', youtubeUrl: 'https://www.youtube.com/watch?v=Y3s4xX7b6Kc', youtubeId: 'Y3s4xX7b6Kc', title: 'Building Agency Service Packages', description: 'How to package your services into tiers that clients actually want to buy.', duration: '15:45', order: 1, difficulty: 'intermediate' },
    // Operations
    { id: 'vid-agency-4', phaseId: 'phase-digital-marketing-agency-7', youtubeUrl: 'https://www.youtube.com/watch?v=2m5c6x8J8ZQ', youtubeId: '2m5c6x8J8ZQ', title: 'Client Communication & Management Systems', description: 'Build systems for onboarding, reporting, and client relationship management.', duration: '16:10', order: 1, difficulty: 'intermediate' },
    // Scaling
    { id: 'vid-agency-5', phaseId: 'phase-digital-marketing-agency-8', youtubeUrl: 'https://www.youtube.com/watch?v=9s7H6X2k5Rk', youtubeId: '9s7H6X2k5Rk', title: 'Scaling Your Agency — Hiring & Delegation', description: 'Hiring, delegating, and growing your agency beyond yourself to 7 figures.', duration: '20:40', order: 1, difficulty: 'advanced' },

    // ── CONTENT CREATION VIDEOS ──
    // Foundation
    { id: 'vid-content-1', phaseId: 'phase-content-creation-1', youtubeUrl: 'https://www.youtube.com/watch?v=R0B5o3X8XyM', youtubeId: 'R0B5o3X8XyM', title: 'How to Start Creating Content from Zero', description: 'Complete beginner guide to becoming a content creator on YouTube, TikTok, or blogs.', duration: '19:30', order: 1, difficulty: 'beginner' },
    { id: 'vid-content-2', phaseId: 'phase-content-creation-1', youtubeUrl: 'https://www.youtube.com/watch?v=9W0H6p2x2XQ', youtubeId: '9W0H6p2x2XQ', title: 'Finding Your Content Niche & Voice', description: 'How to pick a niche that grows and build a unique voice audiences love.', duration: '14:45', order: 2, difficulty: 'beginner' },
    // Product / Service Creation
    { id: 'vid-content-3', phaseId: 'phase-content-creation-3', youtubeUrl: 'https://www.youtube.com/watch?v=0X9s7K2x8kE', youtubeId: '0X9s7K2x8kE', title: 'Creating Your First 10 Videos — Content System', description: 'Build a content creation system that produces consistently without burnout.', duration: '22:15', order: 1, difficulty: 'beginner' },
    // Marketing
    { id: 'vid-content-4', phaseId: 'phase-content-creation-5', youtubeUrl: 'https://www.youtube.com/watch?v=Qy4n8kJ9dE0', youtubeId: 'Qy4n8kJ9dE0', title: 'Growing Your Audience — Algorithm & Distribution', description: 'How algorithms work and how to get your content seen by more people organically.', duration: '18:20', order: 1, difficulty: 'intermediate' },
    // Scaling
    { id: 'vid-content-5', phaseId: 'phase-content-creation-8', youtubeUrl: 'https://www.youtube.com/watch?v=6b9X4n7sJ2k', youtubeId: '6b9X4n7sJ2k', title: 'Monetizing Content — Beyond Ads', description: 'Courses, sponsorships, memberships, products — how top creators actually make money.', duration: '21:00', order: 1, difficulty: 'advanced' },

    // ── SAAS / STARTUP VIDEOS (Y Combinator) ──
    // Foundation
    { id: 'vid-saas-1', phaseId: 'phase-saas-ai-tools-1', youtubeUrl: 'https://www.youtube.com/watch?v=CBYhVcO4WgI', youtubeId: 'CBYhVcO4WgI', title: 'How to Get Startup Ideas — Y Combinator', description: 'YC partner explains the framework for finding startup ideas that actually work.', duration: '24:10', order: 1, difficulty: 'beginner' },
    { id: 'vid-saas-2', phaseId: 'phase-saas-ai-tools-1', youtubeUrl: 'https://www.youtube.com/watch?v=Th8JoIan4dg', youtubeId: 'Th8JoIan4dg', title: 'How to Build a Startup — YC Startup School', description: 'The definitive YC lecture on building a startup from idea to product-market fit.', duration: '45:30', order: 2, difficulty: 'beginner' },
    // Validation
    { id: 'vid-saas-3', phaseId: 'phase-saas-ai-tools-2', youtubeUrl: 'https://www.youtube.com/watch?v=BUE-icVYRFU', youtubeId: 'BUE-icVYRFU', title: 'How to Talk to Users — Y Combinator', description: 'The YC approach to customer discovery and validating your startup idea with real users.', duration: '18:45', order: 1, difficulty: 'beginner' },
    // Product / Service Creation
    { id: 'vid-saas-4', phaseId: 'phase-saas-ai-tools-3', youtubeUrl: 'https://www.youtube.com/watch?v=hyYCn_kAngI', youtubeId: 'hyYCn_kAngI', title: 'Building Product — MVP to Launch', description: 'How to build your MVP fast, launch early, and iterate based on real feedback.', duration: '22:00', order: 1, difficulty: 'intermediate' },
    // Scaling
    { id: 'vid-saas-5', phaseId: 'phase-saas-ai-tools-8', youtubeUrl: 'https://www.youtube.com/watch?v=0LNQxT9LvM0', youtubeId: '0LNQxT9LvM0', title: 'Scaling a Startup — Growth Strategies', description: 'YC insights on scaling from first users to millions and fundraising strategy.', duration: '28:30', order: 1, difficulty: 'advanced' },
];

// ===== TASKS =====
export const tasks: Task[] = [
    // ── Freelancing Tasks ──
    { id: 'task-free-1a', phaseId: 'phase-freelancing-1', title: 'List 3 skills you can offer as a service', description: '', order: 1 },
    { id: 'task-free-1b', phaseId: 'phase-freelancing-1', title: 'Research 5 successful freelancers in your niche', description: '', order: 2 },
    { id: 'task-free-1c', phaseId: 'phase-freelancing-1', title: 'Write down your ideal client profile', description: '', order: 3 },
    { id: 'task-free-2a', phaseId: 'phase-freelancing-2', title: 'Send 10 cold emails or proposals', description: '', order: 1 },
    { id: 'task-free-2b', phaseId: 'phase-freelancing-2', title: 'Complete one project at discounted rate for a testimonial', description: '', order: 2 },
    { id: 'task-free-3a', phaseId: 'phase-freelancing-3', title: 'Create 3 portfolio pieces (even spec work)', description: '', order: 1 },
    { id: 'task-free-3b', phaseId: 'phase-freelancing-3', title: 'Write a one-page service description', description: '', order: 2 },
    { id: 'task-free-4a', phaseId: 'phase-freelancing-4', title: 'Create profiles on Upwork and Fiverr', description: '', order: 1 },
    { id: 'task-free-4b', phaseId: 'phase-freelancing-4', title: 'Set up invoicing with Stripe or PayPal', description: '', order: 2 },

    // ── T-Shirt Printing Tasks ──
    { id: 'task-tshirt-1a', phaseId: 'phase-t-shirt-printing-1', title: 'Research 3 print-on-demand platforms', description: '', order: 1 },
    { id: 'task-tshirt-1b', phaseId: 'phase-t-shirt-printing-1', title: 'Identify your target audience', description: '', order: 2 },
    { id: 'task-tshirt-2a', phaseId: 'phase-t-shirt-printing-2', title: 'Research trending designs on Merch by Amazon', description: '', order: 1 },
    { id: 'task-tshirt-3a', phaseId: 'phase-t-shirt-printing-3', title: 'Design 10 t-shirt graphics', description: '', order: 1 },
    { id: 'task-tshirt-3b', phaseId: 'phase-t-shirt-printing-3', title: 'Create mockups for each design', description: '', order: 2 },
    { id: 'task-tshirt-4a', phaseId: 'phase-t-shirt-printing-4', title: 'Sign up for Printful or Printify', description: '', order: 1 },
    { id: 'task-tshirt-4b', phaseId: 'phase-t-shirt-printing-4', title: 'Connect store to Etsy or Shopify', description: '', order: 2 },

    // ── E-Commerce Tasks ──
    { id: 'task-ecom-1a', phaseId: 'phase-e-commerce-1', title: 'Research 5 successful stores in your niche', description: '', order: 1 },
    { id: 'task-ecom-1b', phaseId: 'phase-e-commerce-1', title: 'Choose your platform (Shopify / WooCommerce)', description: '', order: 2 },
    { id: 'task-ecom-2a', phaseId: 'phase-e-commerce-2', title: 'Use Jungle Scout or similar to find 5 product ideas', description: '', order: 1 },
    { id: 'task-ecom-3a', phaseId: 'phase-e-commerce-3', title: 'Source samples from 3 suppliers', description: '', order: 1 },
    { id: 'task-ecom-4a', phaseId: 'phase-e-commerce-4', title: 'Set up payment gateway and shipping', description: '', order: 1 },
    { id: 'task-ecom-5a', phaseId: 'phase-e-commerce-5', title: 'Create first ad campaign with $20 budget', description: '', order: 1 },

    // ── Agency Tasks ──
    { id: 'task-agency-1a', phaseId: 'phase-digital-marketing-agency-1', title: 'Define your agency niche (SEO, ads, social)', description: '', order: 1 },
    { id: 'task-agency-1b', phaseId: 'phase-digital-marketing-agency-1', title: 'Study 3 competing agencies', description: '', order: 2 },
    { id: 'task-agency-2a', phaseId: 'phase-digital-marketing-agency-2', title: 'Create a list of 50 potential clients', description: '', order: 1 },
    { id: 'task-agency-2b', phaseId: 'phase-digital-marketing-agency-2', title: 'Send personalized outreach to 20 businesses', description: '', order: 2 },
    { id: 'task-agency-3a', phaseId: 'phase-digital-marketing-agency-3', title: 'Create 3 service tiers (Starter, Growth, Scale)', description: '', order: 1 },
    { id: 'task-agency-4a', phaseId: 'phase-digital-marketing-agency-4', title: 'Set up your agency website', description: '', order: 1 },
];

// ===== PROBLEMS =====
export const problems: Problem[] = [
    {
        id: 'prob-1',
        title: 'No idea what business to start',
        explanation: 'This is the most common founder problem. The key is to look at three intersections: your skills, what people will pay for, and what excites you. Start by listing 10 skills, then researching which have market demand. Don\'t overthink — pick one and validate fast. You can always pivot.',
        businessId: 'biz-freelancing',
        phaseId: 'phase-freelancing-1',
        videoIds: ['vid-free-1', 'vid-free-2'],
    },
    {
        id: 'prob-2',
        title: 'No sales after launching',
        explanation: 'Zero sales usually means either wrong audience, weak offer, or no visibility. First check: are you reaching the right people? Second: is your offer clear and compelling? Third: are you marketing consistently? Most founders launch and wait — you need to actively sell and promote every single day.',
        businessId: 'biz-ecommerce',
        phaseId: 'phase-e-commerce-5',
        videoIds: ['vid-ecom-3', 'vid-ecom-4'],
    },
    {
        id: 'prob-3',
        title: 'Pricing confusion — too low or too high',
        explanation: 'Pricing is about value, not cost. Research what competitors charge, figure out the ROI your client gets, and create tiered packages (starter, standard, premium). When in doubt, price higher — low prices attract bad clients and signal low quality. You can always discount, never easily raise.',
        businessId: 'biz-freelancing',
        phaseId: 'phase-freelancing-4',
        videoIds: ['vid-free-5'],
    },
    {
        id: 'prob-4',
        title: 'Supplier issues and bad product quality',
        explanation: 'Always order samples before committing. Use platforms like Alibaba, IndiaMART, or local markets. Vet at least 3 suppliers. Negotiate payment terms — don\'t pay 100% upfront. Have a backup supplier. Document everything. Bad quality kills brands faster than anything.',
        businessId: 'biz-tshirt',
        phaseId: 'phase-t-shirt-printing-4',
        videoIds: ['vid-tshirt-4', 'vid-tshirt-1'],
    },
    {
        id: 'prob-5',
        title: 'Client ghosting after proposal',
        explanation: 'Ghosting happens when there\'s a disconnect between your proposal and their expectations. Solutions: qualify leads before proposals (ask budget + timeline), follow up 3 times minimum, add urgency (limited slots), and always end calls with a clear next step. Don\'t take it personally — it\'s part of sales.',
        businessId: 'biz-agency',
        phaseId: 'phase-digital-marketing-agency-6',
        videoIds: ['vid-agency-2'],
    },
    {
        id: 'prob-6',
        title: 'Low reach on social media',
        explanation: 'Organic reach is dying, but not dead. Focus on: Reels > posts, hooks in first 2 seconds, post consistently (minimum 5x/week), engage in comments, use trending audio, and create share-worthy content. Growth comes from being useful or entertaining — never boring.',
        businessId: 'biz-tshirt',
        phaseId: 'phase-t-shirt-printing-5',
        videoIds: ['vid-tshirt-5'],
    },
    {
        id: 'prob-7',
        title: 'Fear of starting — analysis paralysis',
        explanation: 'Fear is normal. Every successful founder felt it. The cure: start before you\'re ready. Pick ONE thing, give yourself 7 days to launch an MVP, and learn from real feedback. Perfection is the enemy. The worst outcome of starting is learning what doesn\'t work. That\'s still progress.',
        businessId: 'biz-freelancing',
        phaseId: 'phase-freelancing-1',
        videoIds: ['vid-free-1'],
    },
    {
        id: 'prob-8',
        title: 'Scaling stress — can\'t handle more work',
        explanation: 'If you\'re drowning in work, congrats — you have demand. Now systemize: document your processes (SOPs), hire contractors for repetitive tasks, use automation tools (Zapier, Calendly), raise prices to reduce volume, and learn to say no to bad-fit clients. Growth should simplify, not complicate.',
        businessId: 'biz-agency',
        phaseId: 'phase-digital-marketing-agency-8',
        videoIds: ['vid-agency-5', 'vid-free-5'],
    },
];
