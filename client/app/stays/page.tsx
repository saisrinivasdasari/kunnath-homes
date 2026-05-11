'use client';

import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Container } from '@/Components/ui/Container';
import { Card } from '@/Components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useStays } from '@/hooks/useStays';
import { SectionHeading } from '@/Components/ui/SectionHeading';

export default function FarmStaysPage() {
    const { data: stays, isLoading } = useStays();

    return (
        <div className="py-12 bg-white min-h-screen">
            <Container>
                <SectionHeading
                    badge="✨ Exclusive Stay"
                    subtitle="Experience the perfect blend of luxury and nature. Choose from our curated collection of premium stays."
                >
                    Stays
                </SectionHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading ? (
                        Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="bg-white rounded-2xl h-[400px] animate-pulse border border-gray-100" />
                        ))
                    ) : stays?.map((stay) => (
                        <Link href={`/stays/${stay._id}`} key={stay._id} className="block group">
                            <Card className="overflow-hidden border-none shadow-none hover:shadow-2xl transition-all duration-500 rounded-[32px] bg-white group flex flex-col h-full">
                                <div className="aspect-[4/3] relative overflow-hidden rounded-[32px]">
                                    <img
                                        src={stay.images[0]}
                                        alt={stay.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-gray-900 uppercase">
                                        Premium
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-black text-xl text-gray-900 leading-tight">
                                            {stay.name} <span className="text-gray-400 font-medium">Farm stay</span>
                                        </h3>
                                        {/* <div className="flex items-center gap-1">
                                            <Star size={14} className="fill-primary text-primary" />
                                            <span className="text-sm font-bold">4.9</span>
                                        </div> */}
                                    </div>
                                    <p className="text-gray-400 text-xs font-medium mb-6">
                                        Up to {stay.capacity} guests · Instant Booking
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Starts from</span>
                                            <span className="text-lg font-black text-gray-900">{formatCurrency(stay.price)}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                            <ArrowRight size={20} />
                                        </div>
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
