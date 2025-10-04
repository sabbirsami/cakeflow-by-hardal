'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CakeOrder } from '../cake-order-funnel';

interface TextStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export function TextStep({ order, onNext, onBack, isFirstStep }: TextStepProps) {
  const [text, setText] = useState(order.text || '');

  const handleNext = () => {
    onNext({ text });
  };

  const handleSkip = () => {
    onNext({ text: '' });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">
          Add a Personal Message
        </h3>
        <p className="mt-2 text-muted-foreground">Optional: Add text to be written on your cake</p>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cake-text" className="text-foreground">
            Cake Message
          </Label>
          <Input
            id="cake-text"
            placeholder="e.g., Happy Birthday, Congratulations..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={50}
            className="border-border bg-card text-foreground"
          />
          <p className="text-sm text-muted-foreground">{text.length}/50 characters</p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Preview:</strong>{' '}
            {text || 'Your message will appear here'}
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep}
          className="border-border text-foreground bg-transparent"
        >
          Back
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="border-border text-foreground bg-transparent"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
