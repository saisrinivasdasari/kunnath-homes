import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

export interface FarmStay {
  _id: string;
  name: string;
  slug: string;
  price: number;
  weekendPrice: number;
  beds: number;
  capacity: number;
  bathrooms: number;
  bedrooms: number;
  halls: number;
  maxGuests: number;
  extraGuestCharge: number;
  securityDeposit: number;
  bookingAdvance: number;
  images: string[];
  amenities: string[];
  foodOptions: string[];
  addOns: { name: string; price: number }[];
  description: string;
}

export const useStays = () => {
  return useQuery({
    queryKey: ['stays'],
    queryFn: async () => {
      const { data } = await api.get<FarmStay[]>('/stays');
      return data;
    },
  });
};

export const useStayDetails = (id: string) => {
  return useQuery({
    queryKey: ['stay', id],
    queryFn: async () => {
      const { data } = await api.get<FarmStay>(`/stays/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateStay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stayData: Partial<FarmStay>) => {
      const { data } = await api.post<FarmStay>('/admin/stays', stayData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stays'] });
    },
  });
};

export const useUpdateStay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, stayData }: { id: string; stayData: Partial<FarmStay> }) => {
      const { data } = await api.put<FarmStay>(`/admin/stays/${id}`, stayData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stays'] });
    },
  });
};

export const useDeleteStay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/admin/stays/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stays'] });
    },
  });
};
