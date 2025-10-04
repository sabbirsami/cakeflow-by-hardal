'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CakeOrder } from '../cake-order-funnel';

interface ContactStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export function ContactStep({ order, onNext, onBack, isFirstStep }: ContactStepProps) {
  const [name, setName] = useState(order.name || '');
  const [email, setEmail] = useState(order.email || '');
  const [phone, setPhone] = useState(order.phone || '');

  const isValid = name.trim() && email.trim() && phone.trim();

  const handleNext = () => {
    if (isValid) {
      onNext({ name, email, phone });
    }
  };

  return (
    <div className="space-y-3">
      <div className="pb-3">
        <h3 className="text-sm text-foreground">Your Contact Information</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Full Name *
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-border bg-card text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-border bg-card text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+49 123 456 7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border-border bg-card text-foreground"
          />
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
          Continue
        </Button>
      </div>
    </div>
  );
}
