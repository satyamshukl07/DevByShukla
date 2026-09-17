import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'business-websites',
    title: 'Business Websites',
    category: 'Corporate & Lead Generation',
    shortDesc: 'Professional websites designed to establish your brand and generate customer enquiries.',
    fullDesc: 'Modern, high-converting websites tailored for corporate brands, consultancies, professional firms, and local service companies looking to build credibility and win high-value clients.',
    iconName: 'Building2',
    iconBgColor: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
    iconTextColor: 'text-emerald-500',
    features: [
      'Custom Brand Identity Alignment',
      'High-Conversion Lead Capture Forms',
      'Mobile-First Responsive Layouts',
      'Technical SEO & Google Indexing',
      'Fast Cloudflare/Vercel Performance'
    ],
    suitableFor: 'Consultants, agencies, law firms, financial advisors, and small-to-medium businesses.',
    startingPrice: 'From ₹19,999 / $499',
    turnaround: '1-2 Weeks'
  },
  {
    id: 'ecommerce-stores',
    title: 'E-commerce Stores',
    category: 'Retail & Digital Commerce',
    shortDesc: 'Start selling your products online with ease, secure payments, and modern catalogs.',
    fullDesc: 'Robust online storefronts built with seamless checkout funnels, inventory syncing, payment gateway integrations (Stripe, Razorpay, PayPal), and mobile-optimized purchasing flows.',
    iconName: 'ShoppingCart',
    iconBgColor: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
    iconTextColor: 'text-amber-500',
    features: [
      'Catalog & Inventory Management',
      'One-Click Checkout & Apple/Google Pay',
      'Automated Order & Shipping Notifications',
      'Discount Codes & Promotional Banners',
      'Customer Accounts & Order History'
    ],
    suitableFor: 'Fashion brands, specialty shops, artisans, and direct-to-consumer product manufacturers.',
    startingPrice: 'From ₹34,999 / $899',
    turnaround: '2-3 Weeks'
  },
  {
    id: 'school-education',
    title: 'School & Education',
    category: 'Institutions & Academies',
    shortDesc: 'Modern websites for schools, colleges, coaching institutes, and educational organizations.',
    fullDesc: 'Informative, accessible, and welcoming educational portals featuring online admission inquiries, faculty showcases, curriculum downloads, academic calendars, and student announcement boards.',
    iconName: 'GraduationCap',
    iconBgColor: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
    iconTextColor: 'text-blue-500',
    features: [
      'Online Admission Application Forms',
      'Notice Board & Events Calendar',
      'Curriculum & Faculty Directory',
      'Photo & Campus Video Galleries',
      'Mobile-Friendly Parent Portals'
    ],
    suitableFor: 'Schools, higher education academies, preschools, tutoring centers, and online ed-tech providers.',
    startingPrice: 'From ₹24,999 / $599',
    turnaround: '2 Weeks'
  },
  {
    id: 'hospital-clinic',
    title: 'Hospital & Clinic',
    category: 'Healthcare & Wellness',
    shortDesc: 'Professional healthcare websites with services, doctors, contact and appointment enquiry features.',
    fullDesc: 'Trust-building medical websites engineered to display specialist profiles, department listings, clinic locations, operating hours, and seamless appointment booking or inquiry flows.',
    iconName: 'HeartPulse',
    iconBgColor: 'bg-sky-500/10 text-sky-600 border border-sky-500/20',
    iconTextColor: 'text-sky-500',
    features: [
      'Doctor & Specialist Profiles',
      'Online Appointment Inquiry Forms',
      'Department & Treatment Overviews',
      'Emergency Contact & Map Integration',
      'HIPAA / Privacy Compliant Structure'
    ],
    suitableFor: 'Hospitals, dental clinics, specialty doctors, diagnostic labs, and wellness centers.',
    startingPrice: 'From ₹29,999 / $699',
    turnaround: '2 Weeks'
  },
  {
    id: 'hotel-restaurant',
    title: 'Hotel & Restaurant',
    category: 'Hospitality & Dining',
    shortDesc: 'Attractive websites with booking, digital menu, table reservation, and location features.',
    fullDesc: 'Mouth-watering, visually vibrant websites designed to entice hungry patrons, showcase room accommodations, display interactive digital food menus, and drive direct reservations without high marketplace fees.',
    iconName: 'UtensilsCrossed',
    iconBgColor: 'bg-purple-500/10 text-purple-600 border border-purple-500/20',
    iconTextColor: 'text-purple-500',
    features: [
      'Interactive Mobile Digital Menus',
      'Table Reservation & Room Inquiry Forms',
      'Direct WhatsApp Ordering Integration',
      'High-Resolution Dish & Ambiance Galleries',
      'Google Maps & Parking Directions'
    ],
    suitableFor: 'Restaurants, boutique cafes, bistro chains, hotels, resorts, and vacation rentals.',
    startingPrice: 'From ₹22,999 / $549',
    turnaround: '1-2 Weeks'
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    category: 'Property & Development',
    shortDesc: 'Property listing websites with enquiry forms, interactive filters, and virtual walkthroughs.',
    fullDesc: 'Sleek, high-converting real estate portals built for brokers, property developers, and agencies to showcase residential or commercial listings, floor plans, neighborhood highlights, and lead inquiries.',
    iconName: 'Building',
    iconBgColor: 'bg-teal-500/10 text-teal-600 border border-teal-500/20',
    iconTextColor: 'text-teal-500',
    features: [
      'Property Filter (Beds, Price, Type)',
      'Floor Plans & Interactive Photo Sliders',
      'Virtual Tour & Video Embed Support',
      'Instant WhatsApp & Phone Lead Connect',
      'Agent Contact & Booking Call-to-Actions'
    ],
    suitableFor: 'Real estate agencies, independent property brokers, luxury developers, and rental portals.',
    startingPrice: 'From ₹31,999 / $799',
    turnaround: '2-3 Weeks'
  },
  {
    id: 'custom-web-apps',
    title: 'Custom Web Apps',
    category: 'Full-Stack & Cloud Solutions',
    shortDesc: 'Tailored web solutions for your unique business needs, client portals, and dashboards.',
    fullDesc: 'Full-stack web applications constructed with modern React, Node.js, Express, databases, and secure APIs to automate workflows, manage business operations, or provide custom member portals.',
    iconName: 'Terminal',
    iconBgColor: 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20',
    iconTextColor: 'text-indigo-500',
    features: [
      'Custom React + Node/Express Stack',
      'Database Architecture & CRUD APIs',
      'Authentication & User Role Dashboards',
      'Third-Party API & Webhook Integrations',
      'Cloud Deployment & Automated Backups'
    ],
    suitableFor: 'Startups, businesses needing internal tools, customer portals, or specialized calculators.',
    startingPrice: 'From ₹49,999 / $1,200',
    turnaround: '3-5 Weeks'
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    category: 'Optimization & Revamp',
    shortDesc: 'Give your old website a modern, fast, and fresh look that converts visitors into customers.',
    fullDesc: 'Transform outdated, slow, or non-responsive websites into lightning-fast, modern assets that reinforce brand credibility, improve Google rankings, and significantly boost visitor inquiries.',
    iconName: 'Sparkles',
    iconBgColor: 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20',
    iconTextColor: 'text-cyan-500',
    features: [
      'Complete Visual UI/UX Modernization',
      'Core Web Vitals Speed Boost (< 1.5s load)',
      'SEO Migration (Zero Lost Rankings)',
      'Mobile Usability Overhaul',
      'Modern Conversion Funnel Architecture'
    ],
    suitableFor: 'Established businesses with aging websites, poor mobile experience, or declining search ranks.',
    startingPrice: 'From ₹16,999 / $449',
    turnaround: '1-2 Weeks'
  }
];
