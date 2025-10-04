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
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CakeOrder } from '../cake-order-funnel';

interface TasteStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  onTastesChange?: (tastes: string[]) => void;
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

export function TasteStep({ order, onNext, onBack, isFirstStep, onTastesChange }: TasteStepProps) {
  const [selectedTastes, setSelectedTastes] = useState<string[]>(order.tastes || []);

  const toggleTaste = (tasteId: string) => {
    setSelectedTastes((prev) =>
      prev.includes(tasteId) ? prev.filter((id) => id !== tasteId) : [...prev, tasteId],
    );
  };

  useEffect(() => {
    onTastesChange?.(selectedTastes);
  }, [selectedTastes, onTastesChange]);

  const handleNext = () => {
    if (selectedTastes.length > 0) {
      onNext({ tastes: selectedTastes });
    }
  };

  return (
    <div className="space-y-3">
      <div className="pb-3">
        <h3 className="text-sm text-foreground"> Select Your Flavors</h3>
      </div>

      <div className="relative">
        <Carousel
          opts={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}
          className="w-full"
        >
          <CarouselContent className="py-2">
            {TASTES.map((taste) => {
              const isSelected = selectedTastes.includes(taste.id);

              return (
                <CarouselItem
                  key={taste.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                >
                  <Card
                    role="button"
                    tabIndex={0}
                    className={`h-full cursor-pointer border-2 p-5 transition-all hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 ${
                      isSelected ? 'border-accent bg-accent/10' : 'border-border bg-card'
                    }`}
                    onClick={() => toggleTaste(taste.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleTaste(taste.id);
                      }
                    }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? 'border-accent bg-accent text-accent-foreground'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {isSelected && <Check className="h-5 w-5" strokeWidth={3} />}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">{taste.name}</h4>
                        <p className="text-sm text-muted-foreground">{taste.description}</p>
                      </div>
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
          disabled={selectedTastes.length === 0}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
