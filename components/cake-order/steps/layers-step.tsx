'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import type { CakeOrder } from '../cake-order-funnel';

interface LayersStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

const LAYER_OPTIONS = [1, 2, 3, 4, 5];

export function LayersStep({ order, onNext, onBack, isFirstStep }: LayersStepProps) {
  const [selectedLayers, setSelectedLayers] = useState(order.layers || 0);

  const handleNext = () => {
    if (selectedLayers > 0) {
      onNext({ layers: selectedLayers });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">
          How Many Layers?
        </h3>
        <p className="mt-2 text-muted-foreground">Choose the number of layers for your cake</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {LAYER_OPTIONS.map((layers) => (
          <Card
            key={layers}
            className={`cursor-pointer border-2 p-8 transition-all hover:border-accent ${
              selectedLayers === layers ? 'border-accent bg-accent/5' : 'border-border bg-card'
            }`}
            onClick={() => setSelectedLayers(layers)}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground">
                {layers}
              </span>
              <span className="text-sm text-muted-foreground">
                {layers === 1 ? 'Layer' : 'Layers'}
              </span>
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
          disabled={selectedLayers === 0}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
