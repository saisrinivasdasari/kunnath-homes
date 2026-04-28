// 'use client';

// import React from 'react';
// import { Container } from '@/Components/ui/Container';
// import { Button } from '@/Components/ui/Button';
// import { Card } from '@/Components/ui/Card';
// import { Star, Wifi, Droplet, Coffee, Car, Wind, ChevronDown } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';
// import { useStayDetails } from '@/hooks/useStays';
// import { useState } from 'react';
// import { useCreateBooking } from '@/hooks/useBookings';
// import { useAuthStore } from '@/store/authStore';

// export default function StayDetailsPage() {
//   const params = useParams();
//   const stayId = params.id as string;
//   const router = useRouter();
//   const { user } = useAuthStore();

//   const { data: stayData, isLoading } = useStayDetails(stayId);
//   const { mutate: createBooking, isPending } = useCreateBooking();

//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [guests, setGuests] = useState(1);

//   if (isLoading) {
//     return <div className="py-20 text-center text-gray-500">Loading stay details...</div>;
//   }

//   if (!stayData) {
//     return <div className="py-20 text-center text-gray-500">Stay not found</div>;
//   }

//   const dummyAmenities = [
//       { name: 'Fast Wifi', icon: <Wifi size={24} className="text-gray-700" /> },
//       { name: 'Private Pool', icon: <Droplet size={24} className="text-gray-700" /> },
//       { name: 'Kitchen', icon: <Coffee size={24} className="text-gray-700" /> },
//       { name: 'Free Parking', icon: <Car size={24} className="text-gray-700" /> },
//       { name: 'Air Conditioning', icon: <Wind size={24} className="text-gray-700" /> },
//     ];

//   return (
//     <div className="py-8 pb-24">
//       <Container>
//         {/* Title and Info */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{stayData.name}</h1>
//           <div className="flex items-center text-sm text-gray-600 space-x-4">
//             <span className="flex items-center font-medium text-gray-900">
//               <Star size={16} className="mr-1 fill-current" /> {stayData.rating}
//             </span>
//             <span className="underline cursor-pointer hover:text-gray-900">{stayData.reviews} reviews</span>
//             <span>·</span>
//             <span className="underline cursor-pointer hover:text-gray-900">Kunnath House, India</span>
//           </div>
//         </div>

//         {/* Image Gallery (Airbnb Style) */}
//         <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 mb-10 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
//           <div className="md:col-span-2 md:row-span-2 relative cursor-pointer hover:opacity-90 transition-opacity">
//             <img src={stayData.images[0]} alt="Main" className="w-full h-full object-cover" />
//           </div>
//           <div className="hidden md:block relative cursor-pointer hover:opacity-90 transition-opacity">
//             <img src={stayData.images[1]} alt="Gallery 1" className="w-full h-full object-cover" />
//           </div>
//           <div className="hidden md:block relative cursor-pointer hover:opacity-90 transition-opacity">
//             <img src={stayData.images[2]} alt="Gallery 2" className="w-full h-full object-cover" />
//           </div>
//           <div className="hidden md:block relative cursor-pointer hover:opacity-90 transition-opacity">
//             <img src={stayData.images[3]} alt="Gallery 3" className="w-full h-full object-cover" />
//           </div>
//           <div className="hidden md:block relative cursor-pointer hover:opacity-90 transition-opacity">
//             <img src={stayData.images[4]} alt="Gallery 4" className="w-full h-full object-cover" />
//           </div>
//         </div>

//         {/* Content Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

//           {/* Left Column (Details) */}
//           <div className="lg:col-span-2 space-y-10">
//             {/* Hosted by summary */}
//             <div className="flex justify-between items-center pb-6 border-b border-gray-200">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Entire farm stay hosted by Kunnath</h2>
//                 <p className="text-gray-600 mt-1">{stayData.capacity} guests · {stayData.beds} beds · 4 baths</p>
//               </div>
//               <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
//                 <span className="font-bold text-gray-500">KH</span>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="pb-8 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">About this space</h2>
//               <p className="text-gray-600 leading-relaxed">
//                 {stayData.description}
//               </p>
//             </div>

//             {/* Amenities */}
//             <div className="pb-8 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">What this place offers</h2>
//               <div className="grid grid-cols-2 gap-y-4">
//                 {dummyAmenities.map((amenity, idx) => (
//                   <div key={idx} className="flex items-center space-x-4">
//                     {amenity.icon}
//                     <span className="text-gray-700">{amenity.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column (Sticky Booking Card) */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-28">
//               <Card className="p-6 shadow-xl border-gray-200">
//                 <div className="mb-6">
//                   <span className="text-2xl font-bold text-gray-900">₹{stayData.price.toLocaleString()}</span>
//                   <span className="text-gray-500"> / night</span>
//                 </div>

//                 <div className="border border-gray-300 rounded-xl mb-4 overflow-hidden">
//                   <div className="flex border-b border-gray-300">
//                     <div className="flex-1 p-3 border-r border-gray-300 focus-within:bg-gray-50">
//                       <div className="text-[10px] uppercase font-bold text-gray-800">Check-in</div>
//                       <input 
//                         type="date" 
//                         className="w-full text-sm text-gray-700 bg-transparent outline-none mt-1 cursor-pointer"
//                         value={checkIn}
//                         onChange={(e) => setCheckIn(e.target.value)}
//                         min={new Date().toISOString().split('T')[0]}
//                       />
//                     </div>
//                     <div className="flex-1 p-3 focus-within:bg-gray-50">
//                       <div className="text-[10px] uppercase font-bold text-gray-800">Check-out</div>
//                       <input 
//                         type="date" 
//                         className="w-full text-sm text-gray-700 bg-transparent outline-none mt-1 cursor-pointer"
//                         value={checkOut}
//                         onChange={(e) => setCheckOut(e.target.value)}
//                         min={checkIn || new Date().toISOString().split('T')[0]}
//                       />
//                     </div>
//                   </div>
//                   <div className="p-3 w-full flex justify-between items-center hover:bg-gray-50 transition-colors">
//                     <div className="w-full">
//                       <div className="text-[10px] uppercase font-bold text-gray-800">Guests</div>
//                       <select 
//                         className="w-full text-sm text-gray-700 bg-transparent outline-none mt-1 appearance-none cursor-pointer"
//                         value={guests}
//                         onChange={(e) => setGuests(Number(e.target.value))}
//                       >
//                         {[...Array(stayData.capacity || 1)].map((_, i) => (
//                           <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'guest' : 'guests'}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <ChevronDown size={20} className="text-gray-600 pointer-events-none" />
//                   </div>
//                 </div>

//                 {(() => {
//                   const calculateNights = () => {
//                     if (!checkIn || !checkOut) return 1;
//                     const start = new Date(checkIn);
//                     const end = new Date(checkOut);
//                     const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
//                     return diffDays > 0 ? diffDays : 1;
//                   };

//                   const nights = calculateNights();
//                   const basePrice = stayData.price * nights;
//                   const cleaningFee = 2000;
//                   const serviceFee = 1500;

//                   let discountAmount = 0;
//                   let discountPercent = 0;

//                   if (user?.isMember) {
//                     if (user.membershipType === 'silver') discountPercent = 10;
//                     else if (user.membershipType === 'gold') discountPercent = 20;
//                     else if (user.membershipType === 'premium') discountPercent = 30;

//                     discountAmount = (basePrice * discountPercent) / 100;
//                   }

//                   const subTotal = basePrice - discountAmount;
//                   const totalPrice = subTotal + cleaningFee + serviceFee;

//                   const handleReserve = () => {
//                     if (!checkIn || !checkOut) {
//                       alert('Please select check-in and check-out dates.');
//                       return;
//                     }
//                     createBooking({ stayId, checkIn, checkOut, guests, totalPrice }, {
//                       onSuccess: () => {
//                         alert('Booking confirmed successfully!');
//                         router.push('/');
//                       },
//                       onError: (error: any) => {
//                         alert(error.response?.data?.message || 'Error creating booking. Are you logged in?');
//                       }
//                     });
//                   };

//                   return (
//                     <>
//                       <Button 
//                         size="lg" 
//                         fullWidth 
//                         className="mb-4" 
//                         onClick={handleReserve}
//                         disabled={isPending}
//                       >
//                         {isPending ? 'Reserving...' : 'Reserve'}
//                       </Button>

//                       <p className="text-center text-sm text-gray-500 mb-6">
//                         You won't be charged yet
//                       </p>

//                       <div className="space-y-4 pb-4 border-b border-gray-200">
//                         <div className="flex justify-between text-gray-600">
//                           <span className="underline cursor-pointer">₹{stayData.price.toLocaleString()} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
//                           <span>₹{basePrice.toLocaleString()}</span>
//                         </div>

//                         {user?.isMember && discountAmount > 0 && (
//                           <div className="flex justify-between text-green-600 font-medium">
//                             <span>{user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} Discount ({discountPercent}%)</span>
//                             <span>-₹{discountAmount.toLocaleString()}</span>
//                           </div>
//                         )}

//                         <div className="flex justify-between text-gray-600">
//                           <span className="underline cursor-pointer">Cleaning fee</span>
//                           <span>₹{cleaningFee.toLocaleString()}</span>
//                         </div>
//                         <div className="flex justify-between text-gray-600">
//                           <span className="underline cursor-pointer">Kunnath service fee</span>
//                           <span>₹{serviceFee.toLocaleString()}</span>
//                         </div>
//                       </div>

//                       <div className="flex justify-between pt-4 font-bold text-gray-900 text-lg">
//                         <span>Total before taxes</span>
//                         <span>₹{totalPrice.toLocaleString()}</span>
//                       </div>
//                     </>
//                   );
//                 })()}
//               </Card>
//             </div>
//           </div>

//         </div>
//       </Container>
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/Components/ui/Container';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import {
  Star, Wifi, Droplet, Coffee, Car, Wind, Tv, Snowflake, Utensils,
  Waves, Dumbbell, Flame, Briefcase, Shield, Calendar as CalendarIcon,
  MapPin, ChevronDown, ChevronUp, Heart, Share, Home, Clock,
  CheckCircle, X, Maximize2, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useStayDetails } from '@/hooks/useStays';
import { useCreateBooking } from '@/hooks/useBookings';
import { useAuthStore } from '@/store/authStore';

// ---------- TIMEZONE-SAFE DATE HELPERS ----------
function getTodayLocal(): string {
  const today = new Date();
  return today.toLocaleDateString('en-CA');
}

function localDateFromString(ymd: string): Date {
  const [year, month, day] = ymd.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatLocalYMD(date: Date): string {
  return date.toLocaleDateString('en-CA');
}

function calculateNightsLocal(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = localDateFromString(checkIn);
  const end = localDateFromString(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

function isDateBooked(ymd: string, bookedDates: string[]): boolean {
  return bookedDates.includes(ymd);
}

// ---------- Double Month Availability Calendar (Airbnb Style) ----------
interface AvailabilityCalendarProps {
  bookedDates: string[];
  checkIn: string;
  checkOut: string;
  onDateSelect: (date: string) => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  bookedDates,
  checkIn,
  checkOut,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const todayLocal = getTodayLocal();

  const goPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const goNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Helper to build a month grid (returns array of dates as YYYY-MM-DD or null)
  const getMonthDays = (date: Date): (string | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (string | null)[] = [];
    for (let i = 0; i < startWeekday; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(formatLocalYMD(new Date(year, month, d)));
    }
    while (days.length < 42) days.push(null); // 6 rows
    return days;
  };

  const currentMonthDays = getMonthDays(currentMonth);
  const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  const nextMonthDays = getMonthDays(nextMonthDate);

  const handleDateClick = (ymd: string | null) => {
    if (!ymd) return;
    if (isDateBooked(ymd, bookedDates)) return;
    if (ymd < todayLocal) return;

    if (!checkIn || (checkIn && checkOut)) {
      onDateSelect(ymd);
    } else {
      if (ymd > checkIn) {
        onDateSelect(ymd);
      } else if (ymd < checkIn) {
        onDateSelect(ymd);
      }
    }
  };

  const isSelected = (ymd: string): boolean => ymd === checkIn || ymd === checkOut;
  const isInRange = (ymd: string): boolean => {
    if (!checkIn || !checkOut) return false;
    return ymd > checkIn && ymd < checkOut;
  };
  const isStart = (ymd: string): boolean => ymd === checkIn;
  const isEnd = (ymd: string): boolean => ymd === checkOut;
  const isPast = (ymd: string): boolean => ymd < todayLocal;
  const isBooked = (ymd: string): boolean => isDateBooked(ymd, bookedDates);

  const renderMonth = (monthDate: Date, days: (string | null)[], monthLabel: string) => (
    <div className="flex-1 min-w-[240px]">
      <div className="text-center font-semibold text-gray-800 mb-4">{monthLabel}</div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((ymd, idx) => {
          if (!ymd) return <div key={idx} className="p-2" />;
          const dayNumber = parseInt(ymd.split('-')[2], 10);
          const selected = isSelected(ymd);
          const inRange = isInRange(ymd);
          const start = isStart(ymd);
          const end = isEnd(ymd);
          const past = isPast(ymd);
          const booked = isBooked(ymd);
          const disabled = past || booked;

          let bgClass = '';
          let textClass = 'text-gray-900';
          let roundedClass = '';

          if (selected) {
            bgClass = 'bg-gray-900 text-white';
            textClass = 'text-white';
            roundedClass = 'rounded-full';
          } else if (inRange) {
            bgClass = 'bg-gray-100';
            roundedClass = 'rounded-none';
          }
          if (start) roundedClass = 'rounded-l-full';
          if (end) roundedClass = 'rounded-r-full';

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => handleDateClick(ymd)}
              className={`p-2 text-sm transition-colors hover:bg-gray-200 ${roundedClass} ${bgClass} ${textClass} ${disabled ? 'text-gray-300 line-through cursor-not-allowed' : 'cursor-pointer'
                }`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonthLabel = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  const nextMonthLabel = `${monthNames[nextMonthDate.getMonth()]} ${nextMonthDate.getFullYear()}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Select dates</h3>
        <div className="flex gap-2">
          <button onClick={goPrevMonth} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <button onClick={goNextMonth} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8 justify-between">
        {renderMonth(currentMonth, currentMonthDays, currentMonthLabel)}
        {renderMonth(nextMonthDate, nextMonthDays, nextMonthLabel)}
      </div>
      <div className="flex justify-between mt-6 text-xs text-gray-500 border-t pt-4">
        <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-gray-100 rounded"></span> Selected range</div>
        <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-gray-900 rounded-full"></span> Check-in/out</div>
        <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-gray-300 rounded"></span> Booked</div>
      </div>
    </div>
  );
};

// ---------- Photo Gallery Modal (unchanged) ----------
const PhotoGalleryModal = ({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev, onClose]);
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-6xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10">
          <X size={24} />
        </button>
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70">
          <ArrowLeft size={28} />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70">
          <ArrowRight size={28} />
        </button>
        <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} className="w-full h-auto max-h-[90vh] object-contain" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

// ---------- Main Component (unchanged except calendar import) ----------
export default function StayDetailsPage() {
  const params = useParams();
  const stayId = params.id as string;
  const router = useRouter();
  const { user } = useAuthStore();

  const { data: stayData, isLoading } = useStayDetails(stayId);
  const { mutate: createBooking, isPending } = useCreateBooking();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const [showReviewText, setShowReviewText] = useState<boolean[]>([]);

  // Progressive booking flow state
  const [step, setStep] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  useEffect(() => {
    if (user) {
      setGuestName(user.name || '');
      setGuestEmail(user.email || '');
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-gray-900"></div>
        <p className="mt-4 text-gray-500">Loading stay details...</p>
      </div>
    );
  }

  if (!stayData) {
    return <div className="py-20 text-center text-gray-500">Stay not found</div>;
  }

  const {
    name,
    rating = 4.9,
    reviews = 128,
    images = [],
    price = 5000,
    capacity = 4,
    beds = 2,
    bathrooms = 2,
    description = "Beautiful farm stay with modern amenities.",
    host = {
      name: "Kunnath",
      isSuperhost: true,
      responseRate: 100,
      responseTime: "within an hour",
      joinedDate: "March 2018",
      avatar: null,
    },
    amenitiesList = [
      "Wifi", "Pool", "Kitchen", "Free parking", "Air conditioning", "Heating", "TV", "Washer", "Dryer", "Dedicated workspace",
      "Hair dryer", "Iron", "Hot water", "Indoor fireplace", "Private entrance", "Garden", "Patio", "BBQ grill", "Beach access"
    ],
    reviewList = [
      { author: "Priya", date: "March 2025", rating: 5, text: "Amazing place! Beautiful surroundings and the host was very helpful." },
      { author: "Rahul", date: "February 2025", rating: 5, text: "Absolutely loved the stay. Clean, peaceful, and exactly as described." },
      { author: "Anjali", date: "January 2025", rating: 4, text: "Great experience overall. The pool was a bit cold but everything else perfect." }
    ],
    location = { address: "Kunnath House, Wayanad, Kerala", lat: 11.874, lng: 75.567 },
    houseRules = ["Check-in after 2 PM", "Check-out before 11 AM", "No smoking", "No parties or events", "Pets allowed with prior approval"],
    safetyItems = ["Smoke alarm", "Carbon monoxide alarm", "First aid kit", "Fire extinguisher"],
    cancellationPolicy = "Free cancellation for 48 hours. After that, 50% refund up to 7 days before check-in.",
    unavailableDates = []
  } = stayData;

  // const bookedDates = unavailableDates.length > 0 ? unavailableDates : generateMockBookedDates();
  const bookedDates = unavailableDates || [];
  const allAmenities = amenitiesList.length ? amenitiesList : dummyAmenities.map(a => a.name);
  const displayedAmenities = showAllAmenities ? allAmenities : allAmenities.slice(0, 6);
  const hasMoreAmenities = allAmenities.length > 6;

  const galleryImages = images.length >= 5 ? images : [...images, ...Array(5 - images.length).fill(images[0] || '/placeholder.jpg')];

  const nights = calculateNightsLocal(checkIn, checkOut);
  const basePrice = price * nights;
  const cleaningFee = 2000;
  const serviceFee = 1500;
  let discountPercent = 0;
  if (user?.isMember) {
    if (user.membershipType === 'silver') discountPercent = 10;
    else if (user.membershipType === 'gold') discountPercent = 20;
    else if (user.membershipType === 'premium') discountPercent = 30;
  }
  const discountAmount = (basePrice * discountPercent) / 100;
  const subtotal = basePrice - discountAmount;
  const totalPrice = subtotal + cleaningFee + serviceFee;

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates.');
      return;
    }
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill out all guest details.');
      return;
    }
    createBooking({ stayId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, totalPrice }, {
      onSuccess: () => {
        setStep(4); // Success step
      },
      onError: (error: any) => {
        alert(error.response?.data?.message || 'Error creating booking. Are you logged in?');
      }
    });
  };

  const openGallery = (index: number) => {
    setGalleryStartIndex(index);
    setGalleryModalOpen(true);
  };

  const handleDateSelect = (dateStr: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
    } else {
      if (dateStr > checkIn) {
        setCheckOut(dateStr);
      } else if (dateStr < checkIn) {
        setCheckIn(dateStr);
        setCheckOut('');
      }
    }
  };

  return (
    <div className="py-8 pb-24 bg-white">
      <Container>
        {/* Title & action row */}
        <div className="mb-6 flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{name}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2">
              <div className="flex items-center">
                <Star size={16} className="fill-current text-gray-900 mr-1" />
                <span className="font-medium text-gray-900">{rating}</span>
                <span className="mx-1">·</span>
                <span className="underline cursor-pointer hover:text-gray-900">{reviews} reviews</span>
              </div>
              <span>·</span>
              <span className="underline cursor-pointer hover:text-gray-900">{host.isSuperhost && 'Superhost · '}{host.name}</span>
              <span>·</span>
              <span className="underline cursor-pointer hover:text-gray-900">{location.address}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-sm font-medium underline hover:text-gray-700">
              <Share size={18} /> Share
            </button>
            <button className="flex items-center gap-2 text-sm font-medium underline hover:text-gray-700">
              <Heart size={18} /> Save
            </button>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-1.5 mb-8 rounded-xl overflow-hidden h-[320px] md:h-[480px]">
          <div className="md:col-span-2 md:row-span-2 relative cursor-pointer" onClick={() => openGallery(0)}>
            <img src={galleryImages[0]} alt="Main" className="w-full h-full object-cover hover:opacity-95 transition" />
          </div>
          <div className="hidden md:block relative cursor-pointer" onClick={() => openGallery(1)}>
            <img src={galleryImages[1]} alt="Gallery 1" className="w-full h-full object-cover hover:opacity-95 transition" />
          </div>
          <div className="hidden md:block relative cursor-pointer" onClick={() => openGallery(2)}>
            <img src={galleryImages[2]} alt="Gallery 2" className="w-full h-full object-cover hover:opacity-95 transition" />
          </div>
          <div className="hidden md:block relative cursor-pointer" onClick={() => openGallery(3)}>
            <img src={galleryImages[3]} alt="Gallery 3" className="w-full h-full object-cover hover:opacity-95 transition" />
          </div>
          <div className="hidden md:block relative cursor-pointer" onClick={() => openGallery(4)}>
            <img src={galleryImages[4]} alt="Gallery 4" className="w-full h-full object-cover hover:opacity-95 transition" />
          </div>
          <button
            onClick={() => openGallery(0)}
            className="absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 text-sm font-medium shadow-md flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <Maximize2 size={16} /> Show all photos
          </button>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host card */}
            <div className="flex justify-between items-start pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold">Entire farm stay hosted by {host.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2 text-gray-600">
                  <span>{capacity} guests</span>
                  <span>·</span>
                  <span>{beds} beds</span>
                  <span>·</span>
                  <span>{bathrooms} baths</span>
                </div>
                {host.isSuperhost && (
                  <div className="flex items-center gap-1 mt-3 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-teal-600" />
                    <span className="font-medium">Superhost</span>
                    <span className="text-gray-500">· {host.responseRate}% response rate · {host.responseTime}</span>
                  </div>
                )}
              </div>
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {host.avatar ? (
                  <img src={host.avatar} alt={host.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-gray-600 text-xl">{host.name.charAt(0)}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About this space</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
            </div>

            {/* Amenities */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-5">What this place offers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8">
                {displayedAmenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
              {hasMoreAmenities && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-6 underline font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
                >
                  {showAllAmenities ? 'Show less' : `Show all ${allAmenities.length} amenities`}
                  {showAllAmenities ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>

            {/* Reviews */}
            {reviews > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <Star size={20} className="fill-current text-gray-900" />
                  <span className="text-xl font-semibold">{rating} · {reviews} reviews</span>
                </div>
                <div className="space-y-6">
                  {reviewList.slice(0, showReviewText.length > 0 ? undefined : 4).map((review, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-5">
                      <div className="font-medium">{review.author}</div>
                      <div className="text-sm text-gray-500 mb-2">{review.date}</div>
                      <p className="text-gray-700">
                        {showReviewText[idx] ? review.text : `${review.text.substring(0, 180)}${review.text.length > 180 ? '...' : ''}`}
                        {review.text.length > 180 && (
                          <button onClick={() => setShowReviewText(prev => {
                            const newArr = [...prev];
                            newArr[idx] = !newArr[idx];
                            return newArr;
                          })} className="ml-2 font-medium text-gray-700 underline">
                            {showReviewText[idx] ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                {reviewList.length > 4 && !showReviewText.length && (
                  <button className="mt-4 underline font-medium text-gray-700">Show all {reviews} reviews</button>
                )}
              </div>
            )}

            {/* Double Month Availability Calendar */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon size={22} className="text-gray-700" />
                <h2 className="text-xl font-semibold">Availability</h2>
              </div>
              <AvailabilityCalendar
                bookedDates={bookedDates}
                checkIn={checkIn}
                checkOut={checkOut}
                onDateSelect={handleDateSelect}
              />
            </div>

            {/* Location */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
              <p className="text-gray-700 mb-4">{location.address}</p>
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                <MapPin size={36} /> Map view
              </div>
            </div>

            {/* Things to know */}
            <div className="border-t border-gray-200 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Home size={18} /> House rules</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {houseRules.map((rule, i) => <li key={i}>{rule}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Shield size={18} /> Health & safety</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {safetyItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock size={18} /> Cancellation policy</h3>
                <p className="text-sm text-gray-600">{cancellationPolicy}</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="p-6 shadow-xl rounded-2xl border border-gray-200">
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <div className="mb-5">
                      <span className="text-2xl font-bold">{formatCurrency(price)}</span>
                      <span className="text-gray-500"> / night</span>
                    </div>

                    <div className="border border-gray-300 rounded-xl mb-4 overflow-hidden">
                      <div className="flex border-b border-gray-300">
                        <div className="flex-1 p-3 border-r border-gray-300">
                          <div className="text-xs font-bold uppercase text-gray-800">Check-in</div>
                          <input
                            type="date"
                            className="w-full text-sm text-gray-700 bg-transparent outline-none mt-1 cursor-pointer"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={getTodayLocal()}
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="text-xs font-bold uppercase text-gray-800">Check-out</div>
                          <input
                            type="date"
                            className="w-full text-sm text-gray-700 bg-transparent outline-none mt-1 cursor-pointer"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || getTodayLocal()}
                          />
                        </div>
                      </div>
                      <div className="p-3 w-full flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <div className="w-full">
                          <div className="text-xs font-bold uppercase text-gray-800">Guests</div>
                          <select
                            className="w-full text-sm text-gray-700 bg-transparent outline-none mt-1 appearance-none cursor-pointer"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                          >
                            {[...Array(capacity || 8)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'guest' : 'guests'}</option>
                            ))}
                          </select>
                        </div>
                        <ChevronDown size={20} className="text-gray-600 pointer-events-none" />
                      </div>
                    </div>

                    <Button
                      size="lg"
                      fullWidth
                      className="mb-3"
                      onClick={() => {
                        if (!checkIn || !checkOut) alert('Please select dates.');
                        else setStep(2);
                      }}
                    >
                      Reserve
                    </Button>
                    <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                    <button onClick={() => setStep(1)} className="text-sm font-medium underline mb-4 flex items-center gap-1 hover:text-gray-600">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <h3 className="text-xl font-bold mb-4">Guest Details</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>
                    <Button
                      size="lg"
                      fullWidth
                      onClick={() => {
                        if (!guestName || !guestEmail || !guestPhone) alert('Please fill in all details.');
                        else setStep(3);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                    <button onClick={() => setStep(2)} className="text-sm font-medium underline mb-4 flex items-center gap-1 hover:text-gray-600">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <h3 className="text-xl font-bold mb-4">Review & Confirm</h3>

                    <div className="bg-gray-50 p-4 rounded-xl mb-4 text-sm text-gray-800 border border-gray-200">
                      <div className="mb-2"><span className="font-semibold">Dates:</span> {checkIn} to {checkOut}</div>
                      <div className="mb-2"><span className="font-semibold">Guests:</span> {guests}</div>
                      <div><span className="font-semibold">Guest:</span> {guestName}</div>
                    </div>

                    <div className="space-y-3 pb-4 border-b border-gray-200 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>{formatCurrency(price)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                        <span>{formatCurrency(basePrice)}</span>
                      </div>
                      {user?.isMember && discountAmount > 0 && (
                        <div className="flex justify-between text-green-700 font-medium">
                          <span>{user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} discount ({discountPercent}%)</span>
                          <span>-{formatCurrency(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-600">
                        <span>Cleaning fee</span>
                        <span>{formatCurrency(cleaningFee)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Service fee</span>
                        <span>{formatCurrency(serviceFee)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4 pb-6 font-bold text-gray-900 text-lg">
                      <span>Total (INR)</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>

                    <Button size="lg" fullWidth onClick={handleReserve} disabled={isPending}>
                      {isPending ? 'Processing...' : 'Confirm & Pay'}
                    </Button>
                  </div>
                )}

                {step === 4 && (
                  <div className="text-center py-8 animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-600 mb-6">Your reservation at {name} has been successfully secured.</p>
                    <Button variant="outline" onClick={() => router.push('/')} fullWidth>
                      Return to Home
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </Container>

      {galleryModalOpen && (
        <PhotoGalleryModal images={galleryImages} initialIndex={galleryStartIndex} onClose={() => setGalleryModalOpen(false)} />
      )}
    </div>
  );
}

// Helper icon mapping
function getAmenityIcon(name: string): React.ReactNode {
  const lower = name.toLowerCase();
  if (lower.includes('wifi')) return <Wifi size={24} className="text-gray-700" />;
  if (lower.includes('pool')) return <Droplet size={24} className="text-gray-700" />;
  if (lower.includes('kitchen')) return <Utensils size={24} className="text-gray-700" />;
  if (lower.includes('parking')) return <Car size={24} className="text-gray-700" />;
  if (lower.includes('air conditioning') || lower.includes('ac')) return <Wind size={24} className="text-gray-700" />;
  if (lower.includes('tv')) return <Tv size={24} className="text-gray-700" />;
  if (lower.includes('heating')) return <Flame size={24} className="text-gray-700" />;
  if (lower.includes('gym')) return <Dumbbell size={24} className="text-gray-700" />;
  if (lower.includes('beach')) return <Waves size={24} className="text-gray-700" />;
  if (lower.includes('workspace')) return <Briefcase size={24} className="text-gray-700" />;
  return <CheckCircle size={24} className="text-gray-700" />;
}

const dummyAmenities = [
  { name: 'Fast Wifi', icon: <Wifi size={24} className="text-gray-700" /> },
  { name: 'Private Pool', icon: <Droplet size={24} className="text-gray-700" /> },
  { name: 'Kitchen', icon: <Coffee size={24} className="text-gray-700" /> },
  { name: 'Free Parking', icon: <Car size={24} className="text-gray-700" /> },
  { name: 'Air Conditioning', icon: <Wind size={24} className="text-gray-700" /> },
  { name: 'Heating', icon: <Snowflake size={24} className="text-gray-700" /> },
  { name: 'TV', icon: <Tv size={24} className="text-gray-700" /> },
  { name: 'Washer', icon: <Droplet size={24} className="text-gray-700" /> },
];

function generateMockBookedDates(): string[] {
  const booked: string[] = [];
  const today = new Date();
  for (let i = 5; i <= 45; i++) {
    if (Math.random() > 0.7) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      booked.push(formatLocalYMD(date));
    }
  }
  return booked;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}