import React from 'react';
import { Container } from '@/Components/ui/Container';
import { Button } from '@/Components/ui/Button';

export default function EventsPage() {
  const events = [
    {
      title: 'Luxury Weddings',
      description: 'Host your dream wedding amidst the serene landscapes of Kunnath House. We offer expansive lawns, premium catering partnerships, and a dedicated events team.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Corporate Retreats',
      description: 'Elevate your team building. Our estate offers the perfect balance of focused meeting spaces and relaxing outdoor activities to rejuvenate your workforce.',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Private Celebrations',
      description: 'From milestone birthdays to exclusive family reunions, our premium villas and private pools provide an unforgettable backdrop for your special moments.',
      image: 'https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop" 
            alt="Events at Kunnath House" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Unforgettable Events
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Create memories that last a lifetime. Exclusive hosting at Kunnath House.
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-transparent shadow-xl">
            Inquire Now
          </Button>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-20">
        <Container>
          <div className="space-y-24">
            {events.map((event, index) => (
              <div key={index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold font-display text-gray-900">{event.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                  <ul className="space-y-3 pb-4">
                    <li className="flex items-center text-gray-700"><span className="text-primary mr-2">✓</span> Dedicated Event Manager</li>
                    <li className="flex items-center text-gray-700"><span className="text-primary mr-2">✓</span> Custom Catering Options</li>
                    <li className="flex items-center text-gray-700"><span className="text-primary mr-2">✓</span> Exclusive Estate Access</li>
                  </ul>
                  <Button variant="outline">Download Brochure</Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
