import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import { Sport } from './useSports';

export interface SportBooking {
  _id: string;
  user: any;
  sport: Sport;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  userDetails: {
    name: string;
    email: string;
    phone: string;
    note?: string;
  };
}

export function useSportAvailability(sportId: string, date: string) {
  return useQuery({
    queryKey: ['sportAvailability', sportId, date],
    queryFn: async () => {
      if (!sportId || !date) return { bookedSlots: [] };
      const { data } = await api.get<{ bookedSlots: string[] }>(`/sport-bookings/availability/${sportId}/${date}`);
      return data;
    },
    enabled: !!sportId && !!date,
  });
}

export function useCreateSportBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data } = await api.post('/sport-bookings', bookingData);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sportAvailability', variables.sport, variables.date] });
      queryClient.invalidateQueries({ queryKey: ['mySportBookings'] });
    },
  });
}

export function useMySportBookings() {
  return useQuery({
    queryKey: ['mySportBookings'],
    queryFn: async () => {
      const { data } = await api.get<SportBooking[]>('/sport-bookings/my-bookings');
      return data;
    },
  });
}

// Admin: unread sport bookings count for notification badge
export const useUnreadSportBookingCount = () => {
  return useQuery({
    queryKey: ['unreadSportBookingCount'],
    queryFn: async () => {
      const { data } = await api.get<{ count: number }>('/admin/sport-bookings/unread-count');
      return data.count;
    },
    refetchInterval: 30000,
  });
};

// Admin: mark all sport bookings as read
export const useMarkSportBookingsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.put('/admin/sport-bookings/mark-read');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSportBookings'] });
      queryClient.invalidateQueries({ queryKey: ['unreadSportBookingCount'] });
    },
  });
};
