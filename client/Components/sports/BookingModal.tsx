import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Sport } from '@/hooks/useSports';
import { useSportAvailability, useCreateSportBooking } from '@/hooks/useSportBookings';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/Components/ui/Button';

interface BookingModalProps {
  sport: Sport | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ sport, isOpen, onClose }: BookingModalProps) {
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    note: ''
  });

  const { data: availability, isLoading: checkingAvailability } = useSportAvailability(
    sport?._id || '', 
    selectedDate
  );

  const { mutate: createBooking, isPending: isBooking } = useCreateSportBooking();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
    }
  }, [isOpen]);

  if (!isOpen || !sport) return null;

  // Generate next 14 days
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  // Generate 24 hour slots (00:00 to 23:00)
  const timeSlots = Array.from({ length: 24 }).map((_, i) => {
    return `${i.toString().padStart(2, '0')}:00`;
  });

  const isSlotDisabled = (slot: string) => {
    if (availability?.bookedSlots?.includes(slot)) return true;
    
    // Check if slot is in the past for today
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate === today) {
      const currentHour = new Date().getHours();
      const slotHour = parseInt(slot.split(':')[0]);
      if (slotHour <= currentHour) return true;
    }
    return false;
  };

  const handleBooking = () => {
    if (!user) return; // Add login prompt in a real app if !user
    
    createBooking(
      {
        sport: sport._id,
        date: selectedDate,
        timeSlot: selectedTime,
        totalPrice: sport.price,
        userDetails: formData
      },
      {
        onSuccess: () => setStep(4),
        onError: (error: any) => {
          alert(error.response?.data?.message || 'Failed to complete booking. Please try again.');
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold font-display text-gray-900">Book {sport.name}</h2>
            <p className="text-sm text-gray-500">{sport.duration} • ₹{sport.price.toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-primary" /> Select Date
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {dates.map((d) => (
                    <button
                      key={d.date}
                      onClick={() => { setSelectedDate(d.date); setSelectedTime(''); }}
                      className={`flex-shrink-0 w-20 p-3 rounded-xl border-2 snap-center transition-all ${
                        selectedDate === d.date 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-gray-100 hover:border-primary/30 text-gray-600'
                      }`}
                    >
                      <div className="text-xs uppercase font-medium">{d.dayName}</div>
                      <div className="text-2xl font-bold my-1">{d.dayNumber}</div>
                      <div className="text-xs">{d.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-primary" /> Select Time ({sport.duration})
                  </h3>
                  {checkingAvailability ? (
                    <div className="text-center py-8 text-gray-500">Checking availability...</div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {timeSlots.map((slot) => {
                        const disabled = isSlotDisabled(slot);
                        return (
                          <button
                            key={slot}
                            disabled={disabled}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2 rounded-lg text-sm font-medium border transition-all ${
                              disabled 
                                ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed opacity-50' 
                                : selectedTime === slot
                                  ? 'bg-primary text-white border-primary shadow-md'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <Button 
                className="w-full mt-6" 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h3 className="text-lg font-semibold">Your Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="email"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="tel"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Any special requests? (Optional)</label>
                  <textarea 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none min-h-[100px]"
                    value={formData.note}
                    onChange={(e) => setFormData({...formData, note: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button 
                  className="flex-1" 
                  disabled={!formData.name || !formData.email || !formData.phone}
                  onClick={() => setStep(3)}
                >
                  Review Booking
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h3 className="text-lg font-semibold">Booking Summary</h3>
              
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Sport</p>
                    <p className="font-semibold text-gray-900">{sport.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold text-primary text-xl">₹{sport.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{selectedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-900">{selectedTime}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Guest Details</p>
                  <p className="font-medium text-gray-900">{formData.name}</p>
                  <p className="text-sm text-gray-600">{formData.email}</p>
                  <p className="text-sm text-gray-600">{formData.phone}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button 
                  className="flex-1" 
                  isLoading={isBooking}
                  onClick={handleBooking}
                >
                  Confirm & Pay
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-500 mb-6">
                Your slot for {sport.name} on {selectedDate} at {selectedTime} has been successfully reserved.
              </p>
              <Button onClick={onClose} className="w-full sm:w-auto">
                Return to Sports
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
