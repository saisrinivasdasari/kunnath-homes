'use client';

import React from 'react';
import { Container } from '@/Components/ui/Container';
import { Card } from '@/Components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useStays } from '@/hooks/useStays';

export default function FarmStaysPage() {
    const { data: stays, isLoading } = useStays();

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Luxury Farm Stays</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the perfect blend of luxury and nature. Choose from our curated collection of premium stays.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="bg-white rounded-2xl h-[400px] animate-pulse border border-gray-100" />
                        ))
                    ) : stays?.map((stay) => (
                        <Link href={`/stays/${stay._id}`} key={stay._id} className="block group">
                            <Card hoverable className="cursor-pointer h-full overflow-hidden">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={stay.images[0]}
                                        alt={stay.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wider">
                                        {stay.bedrooms} BHK
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">{stay.name}</h3>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Up to {stay.capacity} guests • {stay.beds} beds • {stay.bathrooms} baths
                                    </p>
                                    
                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Weekdays</span>
                                            <span className="font-bold text-gray-900">{formatCurrency(stay.price)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Weekends</span>
                                            <span className="font-bold text-gray-900">{formatCurrency(stay.weekendPrice || 0)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6">
                                        <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold group-hover:bg-primary transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
}
