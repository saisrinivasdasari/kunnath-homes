import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

export interface Sport {
  _id: string;
  name: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  icon: string;
}

export function useSports() {
  return useQuery({
    queryKey: ['sports'],
    queryFn: async () => {
      const { data } = await api.get<Sport[]>('/sports');
      return data;
    },
  });
}

export function useCreateSport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sportData: Omit<Sport, '_id'>) => {
      const { data } = await api.post<Sport>('/admin/sports', sportData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports'] });
    },
  });
}

export function useUpdateSport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, sportData }: { id: string, sportData: Partial<Sport> }) => {
      const { data } = await api.put<Sport>(`/admin/sports/${id}`, sportData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports'] });
    },
  });
}

export function useSportById(id: string) {
  return useQuery({
    queryKey: ['sport', id],
    queryFn: async () => {
      const { data } = await api.get<Sport>(`/sports/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
