'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import type { CakeOrder } from '../cake-order-funnel';

interface LayersStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  onLayersChange?: (layers: number) => void;
}

const LAYER_OPTIONS = [1, 2, 3, 4, 5];

export function LayersStep({
  order,
  onNext,
  onBack,
  isFirstStep,
  onLayersChange,
}: LayersStepProps) {
  const [selectedLayers, setSelectedLayers] = useState(order.layers || 0);

  useEffect(() => {
    if (selectedLayers > 0) {
      onLayersChange?.(selectedLayers);
    }
  }, [selectedLayers, onLayersChange]);

  const handleNext = () => {
    if (selectedLayers > 0) {
      onNext({ layers: selectedLayers });
    }
  };

  return (
    <div className="space-y-3">
      <div className="pb-3">
        <h3 className="text-sm text-primary">How Many Layers?</h3>
      </div>

      <div className="relative">
        <Carousel
          opts={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}
          className="w-full"
        >
          <CarouselContent className="py-2 ">
            {LAYER_OPTIONS.map((layers) => (
              <CarouselItem
                key={layers}
                className="flex-[0_0_calc(100%/3)] sm:flex-[0_0_calc(100%/3)] lg:flex-[0_0_calc(100%/5)] xl:flex-[0_0_calc(100%/5)]"
              >
                <Card
                  className={`h-full cursor-pointer border-2 p-8 transition-all hover:border-accent ${
                    selectedLayers === layers
                      ? 'border-accent bg-accent/5'
                      : 'border-border bg-card'
                  }`}
                  onClick={() => setSelectedLayers(layers)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedLayers(layers);
                    }
                  }}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
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
          disabled={selectedLayers === 0}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
