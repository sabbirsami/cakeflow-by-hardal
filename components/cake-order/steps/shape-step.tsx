'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { CakeOrder } from '../cake-order-funnel';

interface ShapeStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

const SHAPES = [
  { id: 'round', name: 'Round', icon: '⭕' },
  { id: 'square', name: 'Square', icon: '⬜' },
  { id: 'rectangle', name: 'Rectangle', icon: '▭' },
  { id: 'heart', name: 'Heart', icon: '♥' },
  { id: 'custom', name: 'Custom Shape', icon: '✨' },
];

export function ShapeStep({ order, onNext, onBack, isFirstStep }: ShapeStepProps) {
  const [selectedShape, setSelectedShape] = useState(order.shape || '');

  const handleNext = () => {
    if (selectedShape) {
      onNext({ shape: selectedShape });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">
          Choose Your Cake Shape
        </h3>
        <p className="mt-2 text-muted-foreground">Select the shape that best fits your vision</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHAPES.map((shape) => (
          <Card
            key={shape.id}
            className={`cursor-pointer border-2 p-6 transition-all hover:border-accent ${
              selectedShape === shape.id ? 'border-accent bg-accent/5' : 'border-border bg-card'
            }`}
            onClick={() => setSelectedShape(shape.id)}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">{shape.icon}</span>
              <span className="font-semibold text-foreground">{shape.name}</span>
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
          disabled={!selectedShape}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
