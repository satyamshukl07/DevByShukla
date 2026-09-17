import { ProcessStep } from '../types';

export const processStepsData: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Discovery & Requirements',
    subtitle: 'Understanding Your Business Goals',
    description: 'We start with a thorough consultation to uncover your business goals, target audience, brand aesthetic, competitor landscape, and specific technical requirements.',
    deliverables: [
      'Project Scope & Feature Specification Document',
      'Target Audience & Value Proposition Definition',
      'Fixed Transparent Quote & Milestone Timeline'
    ],
    icon: 'Compass',
    duration: '1-2 Days'
  },
  {
    stepNumber: 2,
    title: 'Architecture & Planning',
    subtitle: 'Structuring for Performance and Conversions',
    description: 'We organize your website structure, sitemap, user navigation pathways, and content requirements so visitors find information effortlessly and take action.',
    deliverables: [
      'Website Information Architecture & Sitemap',
      'Conversion Funnel & Call-to-Action Blueprint',
      'Content & Asset Collection Checklist'
    ],
    icon: 'Layers',
    duration: '2-3 Days'
  },
  {
    stepNumber: 3,
    title: 'UI/UX Visual Design',
    subtitle: 'Crafting a Distinctive Brand Impression',
    description: 'We design modern, high-contrast layouts with custom typography, clean card structures, responsive spacing, and intuitive interactions tailored to your industry.',
    deliverables: [
      'Interactive Design Concepts & Color Palette',
      'Desktop & Mobile Responsive Layout Previews',
      'Review & Collaborative Feedback Iteration'
    ],
    icon: 'Palette',
    duration: '3-5 Days'
  },
  {
    stepNumber: 4,
    title: 'Clean Code Development',
    subtitle: 'Building Fast, Production-Ready Code',
    description: 'We write clean, modular React, TypeScript, and modern CSS code. No bloated page builders—just lightning-fast performance, semantic SEO tags, and robust form workflows.',
    deliverables: [
      'Modular React Components & Responsive CSS',
      'Contact Forms & WhatsApp Lead Integration',
      'Database, API & Payment Connections (if applicable)'
    ],
    icon: 'Code2',
    duration: '5-10 Days'
  },
  {
    stepNumber: 5,
    title: 'Quality Testing & Launch',
    subtitle: 'Ensuring Perfection Across Every Device',
    description: 'We run rigorous cross-browser and mobile device checks, verify Core Web Vitals performance, test form delivery, configure SSL certificates, and point your custom domain live.',
    deliverables: [
      'Cross-Browser & Device Responsiveness Audit',
      'Lighthouse Performance & SEO Checklist Validation',
      'DNS Domain Hookup & Free SSL Certificate Activation'
    ],
    icon: 'Rocket',
    duration: '2-3 Days'
  },
  {
    stepNumber: 6,
    title: 'Handover & Ongoing Support',
    subtitle: 'Full Code Ownership & Peace of Mind',
    description: 'You receive full ownership of your code and credentials, plus 30 days of complimentary bug support and optional ongoing website maintenance care.',
    deliverables: [
      'Full Source Code & Admin Credentials Handover',
      'Quick Video Guide on Updating Content',
      '30 Days Free Post-Launch Guarantee'
    ],
    icon: 'ShieldCheck',
    duration: 'Ongoing'
  }
];
