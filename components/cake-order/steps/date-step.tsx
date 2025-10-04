'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CakeOrder } from '../cake-order-funnel';

interface DateStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export function DateStep({ order, onNext, onBack, isFirstStep }: DateStepProps) {
  const [date, setDate] = useState(order.date || '');
  const [time, setTime] = useState(order.time || '');

  const isValid = date && time;

  const handleNext = () => {
    if (isValid) {
      onNext({ date, time });
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-3">
      <div className="pb-3">
        <h3 className="text-sm text-foreground">When Would You Like Your Cake?</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-foreground">
            Pickup Date *
          </Label>
          <Input
            id="date"
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border-border bg-card text-foreground"
          />
          <p className="text-sm text-muted-foreground">Please order at least 24 hours in advance</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-foreground">
            Pickup Time *
          </Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border-border bg-card text-foreground"
          />
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Our patisserie is open Tuesday to
            Sunday, 9:00 AM - 6:00 PM. We are closed on Mondays.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep}
          className="border-border text-foreground bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
}
