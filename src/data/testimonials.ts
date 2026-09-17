import { TestimonialItem } from '../types';

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'School Principal',
    company: 'Greenwood International School',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: "Very professional work! Our school website looks amazing and we've already received many enquiries through it.",
    rating: 5,
    projectType: 'School Website',
    isSample: true
  },
  {
    id: 'dr-amit-verma',
    name: 'Dr. Amit Verma',
    role: 'Clinic Owner',
    company: 'City Care Hospital & Clinics',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    quote: "Great communication and on-time delivery. Highly recommended for anyone looking for a professional website.",
    rating: 5,
    projectType: 'Hospital Website',
    isSample: true
  },
  {
    id: 'rahul-mehta',
    name: 'Rahul Mehta',
    role: 'Restaurant Owner',
    company: 'Tasty Bites Bistro & Grill',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: "Our restaurant website is beautiful and easy to manage. It has helped us get more customers. Thank you!",
    rating: 5,
    projectType: 'Restaurant Website',
    isSample: true
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Managing Broker',
    company: 'Harbor Real Estate Group',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: "The speed and mobile experience exceeded our expectations. Our property listings look crisp and our agents get instant leads on WhatsApp.",
    rating: 5,
    projectType: 'Real Estate Website',
    isSample: true
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Founder & Creative Director',
    company: 'StyleUp Fashion Apparel',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: "DevByShukla delivered our e-commerce store right on schedule. The checkout process is seamless and the brand aesthetics are spot on.",
    rating: 5,
    projectType: 'E-commerce Store',
    isSample: true
  }
];

export const clientExpectations = [
  {
    title: '100% Honest Communication',
    desc: 'You deal directly with me, your developer. No bloated account managers, no game of telephone.',
    icon: 'MessageSquare'
  },
  {
    title: 'Fixed Timelines & Delivery',
    desc: 'We agree on exact launch milestones before starting, ensuring your website goes live on time.',
    icon: 'Clock'
  },
  {
    title: 'Mobile & Speed First',
    desc: 'Every website is tested on real phones and tablets to guarantee fast loading and smooth navigation.',
    icon: 'Smartphone'
  },
  {
    title: 'Post-Launch Handover',
    desc: 'You receive full ownership of your code, domain, and video walkthroughs on how to make updates.',
    icon: 'Key'
  }
];
