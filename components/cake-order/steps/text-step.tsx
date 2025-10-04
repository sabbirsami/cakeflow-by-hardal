'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CakeOrder } from '../cake-order-funnel';

interface TextStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  onTextChange?: (text: string) => void;
}

export function TextStep({ order, onNext, onBack, isFirstStep, onTextChange }: TextStepProps) {
  const [text, setText] = useState(order.text || '');

  useEffect(() => {
    onTextChange?.(text);
  }, [text, onTextChange]);

  const handleNext = () => {
    onNext({ text });
  };

  const handleSkip = () => {
    setText('');
    onNext({ text: '' });
  };

  return (
    <div className="space-y-3">
      <div className="pb-3">
        <motion.h3
          className="text-sm text-primary"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          Add a Personal Message
        </motion.h3>
      </div>

      <div className=" space-y-4">
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
            className="border-border bg-card text-foreground !py-5"
          />
          <motion.p
            className="text-sm text-end text-muted-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {text.length}/50 characters
          </motion.p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <strong className="text-foreground">Preview:</strong>{' '}
            {text || 'Your message will appear here'}
          </motion.p>
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
