'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { CakeOrder } from '../cake-order-funnel';

interface TasteStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

const TASTES = [
  { id: 'vanilla', name: 'Vanilla', description: 'Classic and elegant' },
  { id: 'chocolate', name: 'Chocolate', description: 'Rich and decadent' },
  { id: 'strawberry', name: 'Strawberry', description: 'Fresh and fruity' },
  { id: 'lemon', name: 'Lemon', description: 'Light and zesty' },
  { id: 'red-velvet', name: 'Red Velvet', description: 'Smooth and luxurious' },
  { id: 'caramel', name: 'Caramel', description: 'Sweet and buttery' },
  { id: 'pistachio', name: 'Pistachio', description: 'Nutty and refined' },
  { id: 'coffee', name: 'Coffee', description: 'Bold and aromatic' },
];

export function TasteStep({ order, onNext, onBack, isFirstStep }: TasteStepProps) {
  const [selectedTastes, setSelectedTastes] = useState<string[]>(order.tastes || []);

  const toggleTaste = (tasteId: string) => {
    setSelectedTastes((prev) =>
      prev.includes(tasteId) ? prev.filter((id) => id !== tasteId) : [...prev, tasteId],
    );
  };

  const handleNext = () => {
    if (selectedTastes.length > 0) {
      onNext({ tastes: selectedTastes });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">
          Select Your Flavors
        </h3>
        <p className="mt-2 text-muted-foreground">
          Choose one or more flavors for your cake layers
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TASTES.map((taste) => (
          <Card
            key={taste.id}
            className={`cursor-pointer border-2 p-6 transition-all hover:border-accent ${
              selectedTastes.includes(taste.id)
                ? 'border-accent bg-accent/5'
                : 'border-border bg-card'
            }`}
            onClick={() => toggleTaste(taste.id)}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 flex h-5 w-5 items-center justify-center rounded border-2 ${
                  selectedTastes.includes(taste.id) ? 'border-accent bg-accent' : 'border-border'
                }`}
              >
                {selectedTastes.includes(taste.id) && (
                  <svg
                    className="h-3 w-3 text-accent-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{taste.name}</h4>
                <p className="text-sm text-muted-foreground">{taste.description}</p>
              </div>
            </div>
          </Card>
        ))}
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
        <Button
          onClick={handleNext}
          disabled={selectedTastes.length === 0}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
