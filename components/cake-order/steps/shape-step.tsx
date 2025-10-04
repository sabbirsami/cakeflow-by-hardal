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
import { CakeOrder } from '../cake-order-funnel';
import { CAKE_SHAPE_OPTIONS, CakeShapeId } from '../shape-data';

interface ShapeStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  onShapeChange?: (shape: CakeShapeId | undefined) => void;
}

export function ShapeStep({ order, onNext, onBack, isFirstStep, onShapeChange }: ShapeStepProps) {
  const [selectedShape, setSelectedShape] = useState<CakeShapeId | ''>(
    (order.shape as CakeShapeId) || '',
  );

  useEffect(() => {
    if (order.shape) {
      setSelectedShape(order.shape as CakeShapeId);
    }
  }, [order.shape]);

  useEffect(() => {
    onShapeChange?.(selectedShape || undefined);
  }, [onShapeChange, selectedShape]);

  const handleNext = () => {
    if (selectedShape) {
      onNext({ shape: selectedShape });
    }
  };

  return (
    <div className="space-y-3">
      <div className="pb-3">
        <h3 className="text-sm text-primary">Choose Your Cake Shape</h3>
      </div>

      <div className="relative">
        <Carousel
          opts={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}
          className="w-full"
        >
          <CarouselContent className="py-2">
            {CAKE_SHAPE_OPTIONS.map((shape) => {
              const isSelected = selectedShape === shape.id;

              return (
                <CarouselItem
                  key={shape.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                >
                  <Card
                    role="button"
                    tabIndex={0}
                    className={`h-full cursor-pointer border-2 p-5 text-center transition-all hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 ${
                      isSelected ? 'border-accent bg-accent/10' : 'border-border bg-card'
                    }`}
                    onClick={() => setSelectedShape(shape.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedShape(shape.id);
                      }
                    }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                      <div className="flex items-center justify-center" aria-hidden>
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-foreground">
                          <div
                            className="h-14 w-14"
                            dangerouslySetInnerHTML={{ __html: shape.svg }}
                          />
                        </div>
                      </div>
                      <span className="font-semibold text-foreground">{shape.name}</span>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
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
          disabled={!selectedShape}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
