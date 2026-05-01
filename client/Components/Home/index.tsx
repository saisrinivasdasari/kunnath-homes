
'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStays } from '@/hooks/useStays';
import { useHashScroll } from '@/hooks/useHashScroll';

export default function Home() {
    const { data: stays, isLoading } = useStays();
    useHashScroll();

    const dummyActivities = [
        { name: 'Box Cricket', price: '₹1000/hr', icon: '🏏', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop' },
        { name: 'Beach Volleyball', price: '₹400/hr', icon: '🏐', image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop' },
        { name: 'ATV Ride', price: '₹300/lap', icon: '🏎️', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop' },
        { name: 'Cricket Net', price: '₹100/session', icon: '🏏', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <div className="pb-16">
            {/* 1. HERO SECTION */}
            {/* <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop)' }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center mt-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 drop-shadow-lg font-display">
                        Escape. Indulge. Reconnect.
                    </h1>
                    <p className="text-xl text-white/90 text-center mb-12 max-w-2xl drop-shadow-md">
                        Experience the ultimate luxury farm stay. Disconnect from the city and immerse yourself in nature.
                    </p>

                   
                    <div className="bg-white rounded-full p-2 w-full max-w-4xl shadow-xl flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="flex-1 w-full px-6 py-3 hover:bg-gray-50 rounded-full cursor-pointer transition-colors">
                            <div className="text-xs font-bold text-gray-800">Location</div>
                            <div className="text-sm text-gray-500">Kunnath House</div>
                        </div>
                        <div className="flex-1 w-full px-6 py-3 hover:bg-gray-50 rounded-full cursor-pointer transition-colors">
                            <div className="text-xs font-bold text-gray-800">Check in</div>
                            <div className="text-sm text-gray-500">Add dates</div>
                        </div>
                        <div className="flex-1 w-full px-6 py-3 hover:bg-gray-50 rounded-full cursor-pointer transition-colors">
                            <div className="text-xs font-bold text-gray-800">Check out</div>
                            <div className="text-sm text-gray-500">Add dates</div>
                        </div>
                        <div className="flex-1 w-full pl-6 pr-2 py-2 flex items-center justify-between hover:bg-gray-50 rounded-full cursor-pointer transition-colors">
                            <div>
                                <div className="text-xs font-bold text-gray-800">Guests</div>
                                <div className="text-sm text-gray-500">Add guests</div>
                            </div>
                            <button className="bg-primary hover:bg-primary-hover text-white p-4 rounded-full transition-colors shadow-md">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* 2. FARM STAYS PREVIEW */}
            <section id="stays" className="pt-20 pb-10">

                <Container>
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Luxury Stays</h2>
                            <p className="text-gray-500">Discover your perfect escape</p>
                        </div>
                        {/* <Link href="/stays" className="text-primary font-medium hover:underline flex items-center">
                            View all <ArrowRight size={16} className="ml-1" />
                        </Link> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            <div className="col-span-4 text-center py-10">Loading luxury stays...</div>
                        ) : stays?.map((stay) => (
                            <Link href={`/stays/${stay._id}`} key={stay._id} className="block group">
                                <Card hoverable className="cursor-pointer h-full">
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <img
                                            src={stay.images[0]}
                                            alt={stay.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-gray-900">{stay.name}</h3>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <span>★ 4.9</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-4">
                                            {stay.beds} beds • Up to {stay.capacity} guests
                                        </p>
                                        <div className="flex items-center">
                                            <span className="font-semibold text-lg text-gray-900">₹{stay.price.toLocaleString()}</span>
                                            <span className="text-gray-500 ml-1">/ night</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 3. SPORTS & ACTIVITIES */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sports & Activities</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Elevate your stay with our premium outdoor sports facilities.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dummyActivities.map((activity, idx) => (
                            <Link href="/sports" key={idx} className="block group">
                                <div className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-hover transition-all cursor-pointer border border-gray-100">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={activity.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5 text-center">
                                        <div className="text-3xl mb-2">{activity.icon}</div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">{activity.name}</h3>
                                        <p className="text-primary font-medium">{activity.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 4. EVENTS PREVIEW */}
            <section className="py-20">
                <Container>
                    <div className="bg-gray-900 rounded-3xl overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 z-0 opacity-40">
                            <img
                                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop"
                                alt="Events"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 max-w-3xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                                Host Your Dream Event
                            </h2>
                            <p className="text-lg text-gray-200 mb-8">
                                Weddings • Corporate Retreats • Private Parties
                                <br />
                                Create unforgettable memories at Kunnath House.
                            </p>
                            {/* <Link href="/events">
                                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold border-0">
                                    Inquire Now
                                </Button>
                            </Link> */}
                            <Link
                                href="/events"
                                style={{
                                    display: "inline-block",
                                    padding: "12px 24px",
                                    backgroundColor: "#ffffff",
                                    color: "#111827",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    borderRadius: "6px",
                                    border: "none"
                                }}
                            >
                                Inquire Now
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 5. CTA SECTION */}
            <section className="py-16 text-center">
                <Container>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to disconnect?</h2>
                    <Link href="/stays">
                        <Button size="lg" className="px-10">
                            Book Your Stay
                        </Button>
                    </Link>
                </Container>
            </section>
        </div>
    );
}