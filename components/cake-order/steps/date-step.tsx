'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { addDays, format, parseISO, startOfToday } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CakeOrder } from '../cake-order-funnel';

interface DateStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

const OPENING_HOUR = 9;
const CLOSING_HOUR = 18;
const TIME_INTERVAL_MINUTES = 30;

const toLabel = (hours: number, minutes: number) =>
  format(new Date().setHours(hours, minutes, 0, 0), 'h:mm a');

type TimeOption = { value: string; label: string };

export function DateStep({ order, onNext, onBack, isFirstStep }: DateStepProps) {
  const initialDate = order.date ? parseISO(order.date) : undefined;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [selectedTime, setSelectedTime] = useState(order.time || '');
  const [specialWishes, setSpecialWishes] = useState(order.specialWishes || '');

  const isValid = Boolean(selectedDate && selectedTime);

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    onNext({
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      specialWishes: specialWishes.trim() ? specialWishes.trim() : undefined,
    });
  };

  const tomorrow = addDays(startOfToday(), 1);

  const timeOptions = useMemo<TimeOption[]>(() => {
    const slots: TimeOption[] = [];
    for (let hour = OPENING_HOUR; hour <= CLOSING_HOUR; hour++) {
      for (let minutes = 0; minutes < 60; minutes += TIME_INTERVAL_MINUTES) {
        if (hour === CLOSING_HOUR && minutes > 0) {
          break;
        }

        const value = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const label = toLabel(hour, minutes);
        slots.push({ value, label });
      }
    }

    return slots;
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <motion.h3
          className="text-base font-semibold text-primary"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          When Would You Like Your Cake?
        </motion.h3>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
        >
          Choose a pickup date at least 24 hours in advance and a time during our opening hours.
        </motion.p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Pickup Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'justify-start gap-2 rounded-full border-border text-left font-normal text-foreground',
                  'hover:border-accent/80 hover:bg-accent/5',
                  !selectedDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="size-4" />
                {selectedDate ? format(selectedDate, 'PPP') : 'Select a pickup date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                disabled={[{ before: tomorrow }, (date: Date) => date.getDay() === 1]}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Pickup Time *</Label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="rounded-full border-border bg-card">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Select a pickup time" />
              </div>
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-lg">
              {timeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {option.label}
                  </motion.span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground" htmlFor="special-wishes">
          Special Wishes (optional)
        </Label>
        <textarea
          id="special-wishes"
          value={specialWishes}
          onChange={(event) => setSpecialWishes(event.target.value)}
          placeholder="Let us know about decorations, allergies, or any extra details."
          className="min-h-[120px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
        />
      </div>

      <motion.div
        className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <span className="font-medium text-foreground">Note:</span> Our patisserie is open Tuesday to
        Sunday, 9:00 AM – 6:00 PM. We are closed on Mondays.
      </motion.div>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep}
          className="border-border bg-transparent text-foreground"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
}
