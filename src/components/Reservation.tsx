import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, Mail, Phone, User, CheckCircle2 } from 'lucide-react';

// Form validation schema with Zod
const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^\+?[0-9\s-]{7,15}$/, { message: 'Please enter a valid phone number.' }),
  date: z.string().min(1, { message: 'Date selection is required.' }),
  time: z.string().min(1, { message: 'Time selection is required.' }),
  guests: z.string().min(1, { message: 'Number of guests is required.' }),
  tableId: z.string().min(1, { message: 'Please select a table on the visual map.' }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface TableItem {
  id: string;
  name: string;
  capacity: number;
  type: 'Window View' | 'Central Lounge' | 'Cozy Corner' | 'VIP Sofa';
  isOccupied: boolean;
}

export const Reservation: React.FC = () => {
  const [successData, setSuccessData] = useState<BookingFormValues | null>(null);

  // Mock luxury table dataset
  const tables: TableItem[] = [
    { id: 'W1', name: 'Window 1', capacity: 2, type: 'Window View', isOccupied: false },
    { id: 'W2', name: 'Window 2', capacity: 2, type: 'Window View', isOccupied: true },
    { id: 'W3', name: 'Window 3', capacity: 4, type: 'Window View', isOccupied: false },
    { id: 'W4', name: 'Window 4', capacity: 4, type: 'Window View', isOccupied: false },
    { id: 'C1', name: 'Center 1', capacity: 6, type: 'Central Lounge', isOccupied: false },
    { id: 'C2', name: 'Center 2', capacity: 6, type: 'Central Lounge', isOccupied: true },
    { id: 'CO1', name: 'Corner 1', capacity: 2, type: 'Cozy Corner', isOccupied: false },
    { id: 'CO2', name: 'Corner 2', capacity: 2, type: 'Cozy Corner', isOccupied: false },
    { id: 'VIP1', name: 'VIP Couch 1', capacity: 8, type: 'VIP Sofa', isOccupied: false },
    { id: 'VIP2', name: 'VIP Couch 2', capacity: 8, type: 'VIP Sofa', isOccupied: false },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: '2',
      tableId: '',
    },
  });

  const selectedTableId = watch('tableId');

  const onSubmit = (data: BookingFormValues) => {
    // Simulate API call success
    setSuccessData(data);
    reset();
  };

  return (
    <section id="reservations" className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      {/* Background radial overlays */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-coffee-dark/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest font-mono uppercase">Private Dining</span>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-cream mt-2 tracking-wide">
            Secure Your Table
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reservation Booking Form (Col-span 7) */}
          <div className="lg:col-span-7 bg-matte-gray/30 p-8 rounded-3xl border border-gold/5 backdrop-blur-md">
            <h3 className="text-2xl font-playfair font-semibold text-gold mb-6">Reservation Details</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-4 h-4 text-gold/60" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register('name')}
                      className="w-full pl-11 pr-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gold/60" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register('email')}
                      className="w-full pl-11 pr-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gold/60" />
                    <input
                      type="text"
                      placeholder="+1 (555) 786-2537"
                      {...register('phone')}
                      className="w-full pl-11 pr-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Guests */}
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-3.5 w-4 h-4 text-gold/60" />
                    <select
                      {...register('guests')}
                      className="w-full pl-11 pr-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors appearance-none"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8 Guests</option>
                    </select>
                  </div>
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                </div>

                {/* Date */}
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-gold/60" />
                    <input
                      type="date"
                      {...register('date')}
                      className="w-full pl-11 pr-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors text-cream scheme-dark"
                    />
                  </div>
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>

                {/* Time */}
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Time Slot</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-3.5 w-4 h-4 text-gold/60" />
                    <select
                      {...register('time')}
                      className="w-full pl-11 pr-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors appearance-none"
                    >
                      <option value="">Select Time</option>
                      <option value="07:30">07:30 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                      <option value="20:30">08:30 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </select>
                  </div>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                </div>

              </div>

              {/* Table selection input error check */}
              {errors.tableId && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-xs">
                  {errors.tableId.message}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-coffee-light to-gold text-matte-black font-semibold rounded-xl hover:scale-[1.01] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs shadow-lg cursor-pointer"
              >
                Confirm Seating Reservation
              </button>
            </form>
          </div>

          {/* Interactive Luxury Table Selection Map (Col-span 5) */}
          <div className="lg:col-span-5 bg-matte-gray/30 p-8 rounded-3xl border border-gold/5 backdrop-blur-md flex flex-col justify-between h-[510px]">
            <div>
              <h3 className="text-2xl font-playfair font-semibold text-gold mb-2">Visual Table Map</h3>
              <p className="text-cream-dark text-xs mb-6 font-inter leading-relaxed">
                Click an available table (cream outline) to select it. Occupied tables are marked in deep red.
              </p>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-xs font-mono uppercase mb-8">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-matte-black border border-gold/20"></span>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-gold"></span>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-red-900/50 border border-red-500/25"></span>
                  <span>Occupied</span>
                </div>
              </div>

              {/* Floor Layout Grid */}
              <div className="grid grid-cols-5 gap-3 border border-gold/10 p-5 rounded-2xl bg-matte-black/50 relative">
                
                {/* Top View Stage Window Marker */}
                <div className="col-span-5 text-center text-[9px] uppercase tracking-widest text-gold/40 border-b border-gold/10 pb-2 mb-2 font-mono">
                  ✨ Window View Boulevard ✨
                </div>

                {tables.map((table) => {
                  const isSelected = selectedTableId === table.id;
                  
                  return (
                    <button
                      key={table.id}
                      type="button"
                      disabled={table.isOccupied}
                      onClick={() => setValue('tableId', table.id)}
                      className={`h-16 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                        table.isOccupied
                          ? 'bg-red-950/40 border border-red-500/20 text-red-500/55 cursor-not-allowed'
                          : isSelected
                          ? 'bg-gradient-to-tr from-coffee-light to-gold text-matte-black font-semibold border-gold scale-105 shadow-lg shadow-gold/20'
                          : 'bg-matte-gray/50 border border-gold/20 hover:border-gold hover:text-gold text-cream-dark'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">{table.id}</span>
                      <span className="text-[9px] opacity-75">{table.capacity}p</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected feedback info banner */}
            <div className="mt-6 border-t border-gold/10 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-cream-dark">SELECTED TABLE:</span>
              <span className="text-gold font-bold">{selectedTableId ? selectedTableId : 'NONE'}</span>
            </div>

          </div>

        </div>

      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {successData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-matte-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-matte-gray max-w-md w-full p-8 rounded-3xl border border-gold/30 text-center space-y-6 shadow-2xl"
            >
              <div className="flex justify-center text-emerald-400">
                <CheckCircle2 className="w-16 h-16" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-playfair font-bold text-cream">Booking Confirmed!</h3>
                <p className="text-sm text-cream-dark font-inter leading-relaxed">
                  Thank you, <span className="text-gold font-semibold">{successData.name}</span>. Your table <span className="text-gold font-semibold">{successData.tableId}</span> has been reserved for <span className="text-gold font-semibold">{successData.guests} guests</span> on <span className="text-gold font-semibold">{successData.date}</span> at <span className="text-gold font-semibold">{successData.time}</span>.
                </p>
                <p className="text-xs text-gold font-mono mt-4">
                  A confirmation email has been sent to {successData.email}.
                </p>
              </div>

              <button
                onClick={() => setSuccessData(null)}
                className="w-full py-3 bg-gradient-to-r from-coffee-light to-gold text-matte-black font-semibold rounded-xl uppercase tracking-wider text-xs"
              >
                Close Window
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
