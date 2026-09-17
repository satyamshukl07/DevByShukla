import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'greenwood-international-school',
    slug: 'greenwood-international-school',
    name: 'Greenwood International School',
    category: 'School',
    categoryLabel: 'School Website',
    shortDesc: 'Modern educational portal featuring digital admission inquiry, curriculum guides, and campus showcase.',
    clientGoal: 'Create an engaging, trust-building web presence for prospective parents, highlighting academic excellence, campus infrastructure, and simplified online admission registration.',
    solution: 'Engineered a warm, accessible website with clear navigation, downloadable syllabus briefs, faculty spotlights, and an instant inquiry form that automatically alerts the admissions desk.',
    heroHeading: 'Learning Today for a Brighter Tomorrow',
    heroSubheading: 'Nurturing academic curiosity, creative leadership, and global citizenship from Kindergarten to Grade 12.',
    primaryColor: '#059669', // Emerald
    accentColor: '#10b981',
    isDemo: true,
    technologies: ['React', 'Tailwind CSS', 'Lucide Icons', 'Form Validation API', 'Responsive Layouts'],
    keyFeatures: [
      'Interactive Admissions Inquiry Funnel',
      'Downloadable Prospectus & Academic Calendar',
      'Interactive Campus Virtual Tour Gallery',
      'Faculty Directory & Principal Welcome Note',
      'Mobile-Friendly Parent Notice Board'
    ],
    resultsDelivered: [
      '3.5x Faster loading speed compared to legacy educational CMS systems',
      'Streamlined parent inquiry submission in under 45 seconds',
      '100% Mobile responsiveness across smartphones and tablets'
    ],
    imageType: 'school'
  },
  {
    id: 'city-care-hospital',
    slug: 'city-care-hospital',
    name: 'City Care Hospital',
    category: 'Hospital',
    categoryLabel: 'Hospital Website',
    shortDesc: 'Comprehensive healthcare portal with doctor search, specialty departments, and fast appointment booking.',
    clientGoal: 'Build an empathetic, easy-to-navigate healthcare platform where patients can rapidly locate doctors, verify insurance, and schedule clinical consultations.',
    solution: 'Designed an ultra-clean, clinical-grade interface with high-contrast readability, 1-click emergency calling, department directories, and verified doctor profile cards.',
    heroHeading: 'Your Health Our Priority',
    heroSubheading: 'World-class multidisciplinary clinical care, certified medical specialists, and 24/7 emergency response.',
    primaryColor: '#0284c7', // Sky
    accentColor: '#38bdf8',
    isDemo: true,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Interactive Booking Dialogs', 'Accessibility WCAG AA'],
    keyFeatures: [
      'Specialist Doctor Directory with Experience & Fees',
      'Multi-department Consultation Request System',
      '24/7 Emergency Helpline Quick Connect Bar',
      'Patient Guides & Diagnostic Lab Preparation Notes',
      'Interactive Clinic Location & Parking Map'
    ],
    resultsDelivered: [
      'Zero-confusion navigation designed for patients of all ages',
      'Direct WhatsApp and Phone emergency integration',
      'Instant appointment request logging with automated confirmations'
    ],
    imageType: 'hospital'
  },
  {
    id: 'tasty-bites-restaurant',
    slug: 'tasty-bites-restaurant',
    name: 'Tasty Bites Restaurant',
    category: 'Restaurant',
    categoryLabel: 'Restaurant Website',
    shortDesc: 'Appetizing culinary showcase with interactive digital menu, table reservation, and direct order links.',
    clientGoal: 'Eliminate 30% third-party marketplace commissions by driving direct table bookings and takeaway orders through a dedicated, visually stunning brand website.',
    solution: 'Crafted an atmospheric, high-contrast dark dining layout featuring high-definition gourmet photography, allergen-tagged digital menus, and instant table reservation forms.',
    heroHeading: 'Good Food Good Mood',
    heroSubheading: 'Authentic chef-curated flavors, farm-to-table organic ingredients, and unforgettable dining ambiance.',
    primaryColor: '#d97706', // Amber
    accentColor: '#f59e0b',
    isDemo: true,
    technologies: ['React', 'Tailwind CSS', 'Interactive Tabs', 'Direct WhatsApp API', 'Optimized WebP Graphics'],
    keyFeatures: [
      'Interactive Categorized Food & Beverage Menu',
      'Instant Table Booking & Guest Party Selector',
      'Chef Signature Dish High-Def Visual Showcase',
      'One-Tap Google Maps Directions & Parking Advice',
      'Direct WhatsApp Ordering for Takeaway Pickups'
    ],
    resultsDelivered: [
      'Direct customer ordering with 0% third-party intermediary fees',
      'Instant menu accessibility without requiring bulky PDF downloads',
      'Smooth mobile dining experience right from table QR codes'
    ],
    imageType: 'restaurant'
  },
  {
    id: 'dream-home-real-estate',
    slug: 'dream-home-real-estate',
    name: 'Dream Home Real Estate',
    category: 'Real Estate',
    categoryLabel: 'Real Estate Website',
    shortDesc: 'Luxury residential and commercial property showcase with interactive filter, floor plans, and agent chat.',
    clientGoal: 'Attract affluent property buyers and investors with high-resolution architectural listings, virtual tours, and prompt WhatsApp agent connections.',
    solution: 'Constructed an elegant, magazine-style property platform with dynamic category filtering (Villas, Penthouses, Apartments), detailed property spec cards, and scheduling for on-site viewings.',
    heroHeading: 'Find Your Dream Home',
    heroSubheading: 'Curated luxury villas, prime metropolitan penthouses, and peaceful suburban sanctuaries designed for modern living.',
    primaryColor: '#0f766e', // Teal
    accentColor: '#14b8a6',
    isDemo: true,
    technologies: ['React', 'Tailwind CSS', 'Stateful Property Filter', 'Dynamic Lightbox', 'SEO Microdata'],
    keyFeatures: [
      'Interactive Property Filter by Budget, Bedrooms & Location',
      'High-Resolution Gallery & Architectural Floor Plans',
      'Schedule a Private Viewing Form with Date Selector',
      'Neighborhood Insights, School Ratings & Transit Links',
      'Direct WhatsApp Agent Lead Routing'
    ],
    resultsDelivered: [
      'High-conversion property inquiry layout with sticky agent action bar',
      'Seamless multi-image browsing optimized for mobile touchscreens',
      'SEO-structured property markup ready for Google Real Estate search'
    ],
    imageType: 'real-estate'
  },
  {
    id: 'global-travel-agency',
    slug: 'global-travel-agency',
    name: 'Global Travel Agency',
    category: 'Travel',
    categoryLabel: 'Travel Website',
    shortDesc: 'Inspiring international holiday packages, curated tour itineraries, and bespoke vacation planning.',
    clientGoal: 'Evoke wanderlust in travelers and turn dream trip ideas into confirmed vacation inquiries with transparent day-by-day itineraries.',
    solution: 'Designed a luminous, wanderlust-inducing travel portal with destination guides, transparent day-by-day itineraries, flight/hotel inclusions, and instant custom itinerary request forms.',
    heroHeading: 'Explore The World',
    heroSubheading: 'Unforgettable holiday packages, private guided excursions, and tailor-made expeditions across 50+ countries.',
    primaryColor: '#2563eb', // Blue
    accentColor: '#3b82f6',
    isDemo: true,
    technologies: ['React', 'Tailwind CSS', 'Itinerary Accordion', 'Package Calculator', 'Responsive Grid'],
    keyFeatures: [
      'Destination Packages with Included Amenities & Flights',
      'Day-by-Day Interactive Trip Itinerary Breakdown',
      'Bespoke Holiday Quote Request Customizer',
      'Traveler Reviews, Tips & Visa Requirement Checklist',
      'Urgent Inquiry & WhatsApp Concierge Connect'
    ],
    resultsDelivered: [
      'Clear transparent itinerary presentation eliminating email back-and-forth',
      'Vivid visual aesthetic showcasing landscapes and cultural highlights',
      'Multi-currency and custom duration request support'
    ],
    imageType: 'travel'
  },
  {
    id: 'styleup-fashion-store',
    slug: 'styleup-fashion-store',
    name: 'StyleUp Fashion Store',
    category: 'E-commerce',
    categoryLabel: 'E-commerce Website',
    shortDesc: 'Chic fashion apparel e-commerce store with product collections, instant bag checkout, and size guides.',
    clientGoal: 'Build a premium boutique fashion online shopping experience that loads instantly on mobile devices and drives high average order value.',
    solution: 'Engineered a modern minimalist storefront with high-impact editorial typography, color/size swatch pickers, sticky "Add to Bag", and trust badges for secure checkout.',
    heroHeading: 'New Style New You',
    heroSubheading: 'Curated seasonal arrivals, sustainable wardrobe staples, and elevated luxury essentials for every occasion.',
    primaryColor: '#4f46e5', // Indigo
    accentColor: '#6366f1',
    isDemo: true,
    technologies: ['React', 'Tailwind CSS', 'Cart State Management', 'Color Swatch Selectors', 'Stripe UI Flow'],
    keyFeatures: [
      'Seasonal Lookbooks & Trend Collections',
      'Size Guide Modal & Fabric Care Specifications',
      'Interactive Product Gallery with Zoom Effect',
      'Slide-over Shopping Cart with Free Shipping Progress Bar',
      'Secure Checkout Badges & Express Payment Options'
    ],
    resultsDelivered: [
      'Sub-second collection browsing designed for impulse mobile shopping',
      'Transparent size guide reducing potential product returns',
      'Clean frictionless cart checkout UI'
    ],
    imageType: 'ecommerce'
  },
  {
    id: 'apex-corporate-consulting',
    slug: 'apex-corporate-consulting',
    name: 'Apex Strategy & Capital',
    category: 'Business',
    categoryLabel: 'Business Website',
    shortDesc: 'Corporate advisory website with client case studies, executive team showcase, and consultation booking.',
    clientGoal: 'Establish immediate institutional authority for a financial advisory firm seeking multinational enterprise clients.',
    solution: 'Built a commanding, high-contrast dark corporate presence featuring clean data points, thought-leadership whitepapers, and confidential executive meeting scheduling.',
    heroHeading: 'Strategic Clarity for Enterprise Growth',
    heroSubheading: 'Guiding market leaders through mergers, digital transformation, and strategic capital allocation.',
    primaryColor: '#1e293b',
    accentColor: '#3b82f6',
    isDemo: true,
    technologies: ['React', 'Tailwind CSS', 'Executive Booking Form', 'SVG Data Visualizers'],
    keyFeatures: [
      'Executive Leadership Bios with LinkedIn verification',
      'Case Study Impact Metrics & PDF Whitepaper downloads',
      'Confidential Meeting Scheduler with Google Calendar sync ready',
      'Enterprise Compliance & ISO/Cybersecurity Trust Badges'
    ],
    resultsDelivered: [
      'Corporate-grade institutional credibility that commands premium retainer rates',
      'Zero fluff, high-impact executive value proposition',
      'Confidential lead capture funnel'
    ],
    imageType: 'school' // fallback style
  }
];
