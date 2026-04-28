'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import { SportBooking, useMarkSportBookingsRead } from '@/hooks/useSportBookings';

export default function AdminSportBookingsPage() {
  const queryClient = useQueryClient();
  const { mutate: markRead } = useMarkSportBookingsRead();

  // Mark all sport bookings as read when page opens
  useEffect(() => {
    markRead();
  }, [markRead]);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['adminSportBookings'],
    queryFn: async () => {
      const { data } = await api.get<SportBooking[]>('/admin/sport-bookings');
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await api.put(`/admin/sport-bookings/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSportBookings'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/sport-bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSportBookings'] });
    }
  });

  if (isLoading) return <div className="py-12 text-center text-gray-500">Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900">Manage Sport Bookings</h1>
        <p className="text-gray-500">View and manage all customer sports reservations</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold">User Details</th>
                <th className="p-4 font-semibold">Sport</th>
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings?.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{booking.userDetails?.name || booking.user?.name}</div>
                    <div className="text-xs">{booking.userDetails?.email || booking.user?.email}</div>
                    <div className="text-xs">{booking.userDetails?.phone}</div>
                  </td>
                  <td className="p-4 font-medium">{booking.sport?.name || 'Deleted Sport'}</td>
                  <td className="p-4">
                    <div>{booking.date}</div>
                    <div className="text-xs text-gray-500">{booking.timeSlot}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {booking.status !== 'confirmed' && (
                        <button 
                          onClick={() => updateStatusMutation.mutate({ id: booking._id, status: 'confirmed' })}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark Confirmed"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button 
                          onClick={() => updateStatusMutation.mutate({ id: booking._id, status: 'cancelled' })}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Mark Cancelled"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          if(window.confirm('Delete this booking permanently?')) {
                            deleteMutation.mutate(booking._id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
