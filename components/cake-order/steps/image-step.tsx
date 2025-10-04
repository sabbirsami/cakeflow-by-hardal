'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CakeOrder } from '../cake-order-funnel';

interface ImageStepProps {
  order: CakeOrder;
  onNext: (data: Partial<CakeOrder>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export function ImageStep({ order, onNext, onBack, isFirstStep }: ImageStepProps) {
  const [imageUrl, setImageUrl] = useState(order.imageUrl || '');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleNext = () => {
    onNext({ imageUrl });
  };

  const handleSkip = () => {
    onNext({ imageUrl: '' });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">
          Upload Reference Image
        </h3>
        <p className="mt-2 text-muted-foreground">
          Optional: Share an image of your desired cake design
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label className="text-foreground">Reference Image</Label>
          <div
            className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragging ? 'border-accent bg-accent/5' : 'border-border bg-card'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {imageUrl ? (
              <div className="space-y-4">
                <img
                  src={imageUrl || '/placeholder.svg'}
                  alt="Cake reference"
                  className="mx-auto max-h-64 rounded-lg object-contain"
                />
                <Button
                  variant="outline"
                  onClick={() => setImageUrl('')}
                  className="border-border text-foreground"
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <svg
                    className="h-8 w-8 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-accent hover:underline">Click to upload</span>
                    <span className="text-muted-foreground"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
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
