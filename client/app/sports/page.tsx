'use client';

import React, { useState } from 'react';
import { Container } from '@/Components/ui/Container';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import { useSports, Sport } from '@/hooks/useSports';
import BookingModal from '@/Components/sports/BookingModal';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function SportsPage() {
  const { data: sports, isLoading, isError } = useSports();
  const { user } = useAuthStore();
  const router = useRouter();
  
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = (sport: Sport) => {
    if (!user) {
      router.push('/login?redirect=/sports');
      return;
    }
    setSelectedSport(sport);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="py-24 text-center">Loading sports...</div>;
  }

  if (isError) {
    return <div className="py-24 text-center text-red-500">Failed to load sports. Please try again.</div>;
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Sports & Activities
          </h1>
          <p className="text-lg text-gray-600">
            Elevate your stay with our premium outdoor activities. Whether you're looking for high-octane thrills or a relaxed game with friends, we have something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sports?.map((sport) => (
            <Card key={sport._id} className="overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300">
              <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={sport.image} 
                  alt={sport.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-2xl shadow-sm">
                  {sport.icon}
                </div>
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{sport.name}</h3>
                    <span className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-sm">
                      ₹{sport.price.toLocaleString()} / {sport.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {sport.description}
                  </p>
                </div>
                <Button 
                  onClick={() => handleBookNow(sport)}
                  className="w-full sm:w-auto self-start"
                >
                  Book Slot
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      <BookingModal 
        sport={selectedSport} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
