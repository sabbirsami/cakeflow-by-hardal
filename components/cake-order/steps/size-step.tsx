'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { CakeOrder } from '../cake-order-funnel';

const SIZE_OPTIONS = [
  {
    id: '18cm' as const,
    label: '18 cm',
    description: 'Perfect for 6 – 8 servings',
  },
  {
    id: '24cm' as const,
    label: '24 cm',
    description: 'Ideal for 10 – 12 servings',
  },
  {
    id: '28cm' as const,
    label: '28 cm',
    description: 'Great for 14 – 16 servings',
  },
  {
    id: 'other' as const,
    label: 'Other size',
    description: 'Specify a different diameter',
  },
];

interface SizeStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export function SizeStep({ order, onNext, onBack, isFirstStep }: SizeStepProps) {
  const [selectedOption, setSelectedOption] = useState<CakeOrder['sizeOption']>(() => {
    if (order.sizeOption) {
      return order.sizeOption;
    }

    if (order.size) {
      const matchedOption = SIZE_OPTIONS.find(
        (option) => option.label.toLowerCase() === order.size!.toLowerCase(),
      );
      return matchedOption?.id ?? 'other';
    }

    return '18cm';
  });
  const [customSize, setCustomSize] = useState(() => {
    if (order.sizeOption === 'other') {
      return order.sizeCustom || order.size || '';
    }

    if (!order.sizeOption && order.size) {
      const matchedOption = SIZE_OPTIONS.find(
        (option) => option.label.toLowerCase() === order.size!.toLowerCase(),
      );
      return matchedOption ? '' : order.size;
    }

    return '';
  });

  useEffect(() => {
    if (order.sizeOption) {
      setSelectedOption(order.sizeOption);
      if (order.sizeOption === 'other') {
        setCustomSize(order.sizeCustom || order.size || '');
      }
      return;
    }

    if (order.size) {
      const matchedOption = SIZE_OPTIONS.find(
        (option) => option.label.toLowerCase() === order.size!.toLowerCase(),
      );

      setSelectedOption(matchedOption?.id ?? 'other');
      if (!matchedOption) {
        setCustomSize(order.size);
      }
    }
  }, [order.size, order.sizeCustom, order.sizeOption]);

  const isOther = selectedOption === 'other';
  const resolvedSize = useMemo(() => {
    if (!selectedOption) {
      return '';
    }

    if (selectedOption === 'other') {
      return customSize.trim();
    }

    const matchedOption = SIZE_OPTIONS.find((option) => option.id === selectedOption);
    return matchedOption?.label ?? '';
  }, [customSize, selectedOption]);

  const isValid = Boolean(resolvedSize);

  const handleNext = () => {
    if (!isValid) {
      return;
    }

    onNext({
      sizeOption: selectedOption,
      sizeCustom: isOther ? customSize.trim() : undefined,
      size: resolvedSize,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="space-y-1.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h3 className="text-base font-semibold text-primary">Choose Your Cake Size</h3>
        <p className="text-sm text-muted-foreground">
          Select one of our recommended diameters or specify your own size.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {SIZE_OPTIONS.map((option) => {
          const isSelected = selectedOption === option.id;

          return (
            <Card
              key={option.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelectedOption(option.id);
                if (option.id !== 'other') {
                  setCustomSize('');
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedOption(option.id);
                  if (option.id !== 'other') {
                    setCustomSize('');
                  }
                }
              }}
              className={cn(
                'border-2 p-5 transition-all hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2',
                isSelected ? 'border-accent bg-accent/10' : 'border-border bg-card',
              )}
            >
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: isSelected ? 1 : 0.85 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col gap-2"
              >
                <span className="text-lg font-semibold text-foreground">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.description}</span>
              </motion.div>
            </Card>
          );
        })}
      </div>

      {isOther && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground" htmlFor="custom-size">
            Enter your preferred size
          </label>
          <Input
            id="custom-size"
            placeholder="e.g. 32 cm, multi-tier"
            value={customSize}
            onChange={(event) => setCustomSize(event.target.value)}
            className="border-border bg-card text-foreground"
          />
        </motion.div>
      )}

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
          Continue
        </Button>
      </div>
    </div>
  );
}
