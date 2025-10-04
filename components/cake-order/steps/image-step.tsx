'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="space-y-3">
      <div className="pb-3">
        <motion.h3
          className="text-sm text-primary"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          Upload Reference Image
        </motion.h3>
      </div>

      <div className="space-y-4">
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
                <Image
                  width={200}
                  height={200}
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
                    <motion.span
                      className="text-accent hover:underline"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      Click to upload
                    </motion.span>
                    <motion.span
                      className="text-muted-foreground"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
                    >
                      {' '}or drag and drop
                    </motion.span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </div>
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  PNG, JPG, GIF up to 10MB
                </motion.p>
              </div>
            )}
          </div>
        </div>
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
