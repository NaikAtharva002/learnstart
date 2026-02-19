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
// 4 preloaded businesses with sample videos
export const videos: Video[] = [
    // ── FREELANCING VIDEOS ──
    // Foundation
    { id: 'vid-free-1', phaseId: 'phase-freelancing-1', youtubeUrl: 'https://youtube.com/watch?v=qHgyezFz9B4', youtubeId: 'qHgyezFz9B4', title: 'How to Start Freelancing for Beginners', description: 'Complete beginner guide covering mindset, platforms, and first steps to freelancing success.', duration: '18:32', order: 1, difficulty: 'beginner' },
    { id: 'vid-free-2', phaseId: 'phase-freelancing-1', youtubeUrl: 'https://youtube.com/watch?v=68Li7ukGBzA', youtubeId: '68Li7ukGBzA', title: 'Finding Your Freelance Niche', description: 'How to pick the right niche that matches your skills and market demand.', duration: '12:45', order: 2, difficulty: 'beginner' },
    // Validation
    { id: 'vid-free-3', phaseId: 'phase-freelancing-2', youtubeUrl: 'https://youtube.com/watch?v=LZpiJrLP1V0', youtubeId: 'LZpiJrLP1V0', title: 'Getting Your First Freelance Clients', description: 'Step-by-step outreach strategy to land your first paying clients in under 7 days.', duration: '22:10', order: 1, difficulty: 'beginner' },
    // Product Creation
    { id: 'vid-free-4', phaseId: 'phase-freelancing-3', youtubeUrl: 'https://youtube.com/watch?v=NOBNHQWkUf0', youtubeId: 'NOBNHQWkUf0', title: 'Building a Freelance Portfolio That Converts', description: 'Create a portfolio that wins clients even without experience.', duration: '15:20', order: 1, difficulty: 'beginner' },
    // Setup
    { id: 'vid-free-5', phaseId: 'phase-freelancing-4', youtubeUrl: 'https://youtube.com/watch?v=V7ORbeGdaXo', youtubeId: 'V7ORbeGdaXo', title: 'Pricing Your Freelance Services', description: 'Frameworks for pricing your services so you earn what you deserve.', duration: '16:50', order: 1, difficulty: 'intermediate' },
    // Scaling
    { id: 'vid-free-6', phaseId: 'phase-freelancing-8', youtubeUrl: 'https://youtube.com/watch?v=6O_qJasSm1A', youtubeId: '6O_qJasSm1A', title: 'Scaling Freelancing Into an Agency', description: 'How to transition from solo freelancer to running a profitable agency.', duration: '20:15', order: 1, difficulty: 'advanced' },

    // ── T-SHIRT PRINTING VIDEOS ──
    // Foundation
    { id: 'vid-tshirt-1', phaseId: 'phase-t-shirt-printing-1', youtubeUrl: 'https://youtube.com/watch?v=OFrFa3sRjSY', youtubeId: 'OFrFa3sRjSY', title: 'Types of T-Shirt Printing Methods Explained', description: 'DTG, screen printing, heat press, sublimation — which method is right for you.', duration: '14:10', order: 1, difficulty: 'beginner' },
    { id: 'vid-tshirt-2', phaseId: 'phase-t-shirt-printing-1', youtubeUrl: 'https://youtube.com/watch?v=ZnDHK-P0bxk', youtubeId: 'ZnDHK-P0bxk', title: 'Finding a Profitable Clothing Niche', description: 'Research techniques to find niches people will pay for.', duration: '11:35', order: 2, difficulty: 'beginner' },
    // Product Creation
    { id: 'vid-tshirt-3', phaseId: 'phase-t-shirt-printing-3', youtubeUrl: 'https://youtube.com/watch?v=iV1grhAfgAc', youtubeId: 'iV1grhAfgAc', title: 'Canva T-Shirt Design Tutorial', description: 'Create professional t-shirt designs for free using Canva.', duration: '21:45', order: 1, difficulty: 'beginner' },
    // Setup
    { id: 'vid-tshirt-4', phaseId: 'phase-t-shirt-printing-4', youtubeUrl: 'https://youtube.com/watch?v=PbKkv8JJ3Ww', youtubeId: 'PbKkv8JJ3Ww', title: 'Shopify Clothing Store Setup', description: 'Complete Shopify store launch walkthrough for clothing brands.', duration: '25:30', order: 1, difficulty: 'beginner' },
    // Marketing
    { id: 'vid-tshirt-5', phaseId: 'phase-t-shirt-printing-5', youtubeUrl: 'https://youtube.com/watch?v=r4jnSMQ6-7I', youtubeId: 'r4jnSMQ6-7I', title: 'Clothing Brand Marketing — Reels Strategy', description: 'Use Instagram Reels and TikTok to market your clothing brand for free.', duration: '16:15', order: 1, difficulty: 'intermediate' },

    // ── E-COMMERCE VIDEOS ──
    // Foundation
    { id: 'vid-ecom-1', phaseId: 'phase-e-commerce-1', youtubeUrl: 'https://youtube.com/watch?v=ePuqwNHuFzc', youtubeId: 'ePuqwNHuFzc', title: 'How to Start a Shopify Store Step by Step', description: 'From zero to live store — complete beginner Shopify tutorial.', duration: '28:40', order: 1, difficulty: 'beginner' },
    // Validation
    { id: 'vid-ecom-2', phaseId: 'phase-e-commerce-2', youtubeUrl: 'https://youtube.com/watch?v=XgF8d_EGKGI', youtubeId: 'XgF8d_EGKGI', title: 'Product Research Methods That Work', description: 'Find winning products using data-driven research methods.', duration: '19:15', order: 1, difficulty: 'beginner' },
    // Marketing
    { id: 'vid-ecom-3', phaseId: 'phase-e-commerce-5', youtubeUrl: 'https://youtube.com/watch?v=YO8uqcqFjK0', youtubeId: 'YO8uqcqFjK0', title: 'Facebook & Instagram Ads Basics', description: 'Learn to run your first profitable social media ad campaigns.', duration: '24:30', order: 1, difficulty: 'intermediate' },
    // Sales
    { id: 'vid-ecom-4', phaseId: 'phase-e-commerce-6', youtubeUrl: 'https://youtube.com/watch?v=RqC1rlLWz1g', youtubeId: 'RqC1rlLWz1g', title: 'E-Commerce Conversion Optimization', description: 'Tips to increase your store conversion rate and average order value.', duration: '17:20', order: 1, difficulty: 'intermediate' },
    // Operations
    { id: 'vid-ecom-5', phaseId: 'phase-e-commerce-7', youtubeUrl: 'https://youtube.com/watch?v=qPLvDAE3afE', youtubeId: 'qPLvDAE3afE', title: 'Order Fulfillment Workflow', description: 'End-to-end order fulfillment — from order received to customer delivered.', duration: '13:50', order: 1, difficulty: 'beginner' },

    // ── AGENCY VIDEOS ──
    // Foundation
    { id: 'vid-agency-1', phaseId: 'phase-digital-marketing-agency-1', youtubeUrl: 'https://youtube.com/watch?v=Fol7df0qAQY', youtubeId: 'Fol7df0qAQY', title: 'Starting a Digital Marketing Agency', description: 'How to start a profitable agency from scratch with zero experience.', duration: '22:00', order: 1, difficulty: 'beginner' },
    // Validation
    { id: 'vid-agency-2', phaseId: 'phase-digital-marketing-agency-2', youtubeUrl: 'https://youtube.com/watch?v=T0hfOSd0JHQ', youtubeId: 'T0hfOSd0JHQ', title: 'Getting Your First Agency Clients', description: 'Outreach templates and strategies to sign your first 3 clients.', duration: '18:30', order: 1, difficulty: 'beginner' },
    // Product Creation
    { id: 'vid-agency-3', phaseId: 'phase-digital-marketing-agency-3', youtubeUrl: 'https://youtube.com/watch?v=uB009ypKJBo', youtubeId: 'uB009ypKJBo', title: 'Building Agency Service Packages', description: 'How to package your services into tiers clients actually want.', duration: '15:45', order: 1, difficulty: 'intermediate' },
    // Operations
    { id: 'vid-agency-4', phaseId: 'phase-digital-marketing-agency-7', youtubeUrl: 'https://youtube.com/watch?v=m3gGavSLo_A', youtubeId: 'm3gGavSLo_A', title: 'Client Communication Systems', description: 'Build systems for onboarding, reporting, and client management.', duration: '16:10', order: 1, difficulty: 'intermediate' },
    // Scaling
    { id: 'vid-agency-5', phaseId: 'phase-digital-marketing-agency-8', youtubeUrl: 'https://youtube.com/watch?v=0jh3mMxjl7M', youtubeId: '0jh3mMxjl7M', title: 'Scaling Your Agency with a Team', description: 'Hiring, delegating, and growing your agency beyond yourself.', duration: '20:40', order: 1, difficulty: 'advanced' },
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
        videoIds: ['vid-agency-5', 'vid-free-6'],
    },
];
