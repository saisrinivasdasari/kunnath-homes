import React from 'react';
import { Container } from '@/Components/ui/Container';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Check } from 'lucide-react';

export default function MembershipPage() {
  const tiers = [
    {
      name: 'Silver',
      price: '₹50,000',
      duration: 'per year',
      description: 'Perfect for occasional visitors looking for priority access.',
      features: [
        '10% discount on all Farm Stays',
        'Complimentary breakfast during stays',
        '5 hours of free sports access monthly',
        'Priority booking window (7 days)'
      ],
      highlight: false
    },
    {
      name: 'Gold',
      price: '₹1,20,000',
      duration: 'per year',
      description: 'Our most popular tier. Designed for regular weekend escapes.',
      features: [
        '25% discount on all Farm Stays',
        '1 Free weekend stay (2 nights)',
        'Unlimited free sports access',
        'Priority booking window (30 days)',
        'Exclusive access to members-only events'
      ],
      highlight: true
    },
    {
      name: 'Platinum',
      price: '₹3,00,000',
      duration: 'per year',
      description: 'The ultimate Kunnath House experience with unparalleled luxury.',
      features: [
        '50% discount on all Farm Stays',
        '3 Free weekend stays (2 nights each)',
        'Dedicated 24/7 concierge service',
        'Guaranteed availability',
        'Free airport transfers for guests'
      ],
      highlight: false
    }
  ];

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Exclusive Access</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Kunnath House Memberships
          </h1>
          <p className="text-xl text-gray-600">
            Join an exclusive community of luxury enthusiasts. Enjoy unparalleled access, massive discounts, and priority bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden flex flex-col ${tier.highlight ? 'border-primary shadow-2xl scale-105 z-10' : 'border-gray-200'}`}
            >
              {tier.highlight && (
                <div className="bg-primary text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-500 mb-6 h-12">{tier.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500 ml-2">/ {tier.duration}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={20} className="text-primary shrink-0 mr-3 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <Button 
                  fullWidth 
                  variant={tier.highlight ? 'primary' : 'outline'}
                  className={tier.highlight ? '' : 'hover:bg-gray-50'}
                >
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
