'use client';

import React from 'react';
import { Star, ArrowRight, BedDouble, Users } from 'lucide-react';
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
                {/* <SectionHeading
                    badge="✨ Exclusive Stay"
                    subtitle="Experience the perfect blend of luxury and nature. Choose from our curated collection of premium stays."
                >
                    Stays
                </SectionHeading> */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading ? (
                        Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="bg-white rounded-2xl h-[400px] animate-pulse border border-gray-100" />
                        ))
                    ) : stays?.map((stay) => (
                        <Link href={`/stays/${stay._id}`} key={stay._id} className="block group">
                            <Card className="overflow-hidden border border-gray-100 bg-white group flex flex-col h-full transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 rounded-[40px]">
                                <div className="aspect-[4/3] relative overflow-hidden rounded-[32px] m-3">
                                    <img
                                        src={stay.images[0]}
                                        alt={stay.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-gray-900 uppercase shadow-sm">
                                        Premium
                                    </div>
                                </div>
                                <div className="p-8 pt-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="h-px w-8 bg-primary/30"></span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Farm Stay</span>
                                    </div>

                                    <h3 className="text-3xl font-black tracking-tighter text-primary leading-none mb-4 group-hover:text-primary/80 transition-colors duration-500">
                                        {stay.name}
                                    </h3>

                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="flex items-center gap-1.5">
                                            <BedDouble size={14} className="text-gray-400" />
                                            <span className="text-xs font-bold text-gray-500">{stay.bedrooms} BHK</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users size={14} className="text-gray-400" />
                                            <span className="text-xs font-bold text-gray-500">Up to {stay.capacity} Guests</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto space-y-2.5">
                                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 border border-gray-100 transition-all duration-300 group-hover:bg-white group-hover:shadow-sm">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weekdays</span>
                                            <span className="text-lg font-black text-gray-900">{formatCurrency(stay.price)}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 border border-gray-100 transition-all duration-300 group-hover:bg-white group-hover:shadow-sm">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weekends</span>
                                            <span className="text-lg font-black text-gray-900">{formatCurrency(stay.weekendPrice || 0)}</span>
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
