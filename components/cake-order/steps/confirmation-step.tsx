'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CakeOrder } from '../cake-order-funnel';

interface ConfirmationStepProps {
  order: CakeOrder;
}

export function ConfirmationStep({ order }: ConfirmationStepProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
            Hardal Patisserie
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-10 w-10 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground">
              Order Confirmed!
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for your order. We've received your custom cake request.
            </p>
          </div>

          {/* Order Summary */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
              Order Summary
            </h3>
            <div className="space-y-3 text-foreground">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Shape:</span>
                <span className="font-medium capitalize">{order.shape}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Layers:</span>
                <span className="font-medium">{order.layers}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Flavors:</span>
                <span className="font-medium capitalize">{order.tastes?.join(', ')}</span>
              </div>
              {order.text && (
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Message:</span>
                  <span className="font-medium">{order.text}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Pickup Date:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Pickup Time:</span>
                <span className="font-medium">{order.time}</span>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
              Contact Information
            </h3>
            <div className="space-y-2 text-foreground">
              <p>
                <span className="text-muted-foreground">Name:</span>{' '}
                <span className="font-medium">{order.name}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{' '}
                <span className="font-medium">{order.email}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span>{' '}
                <span className="font-medium">{order.phone}</span>
              </p>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="border-accent/50 bg-accent/5 p-6">
            <h3 className="mb-3 font-semibold text-foreground">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  {"We'll review your order and send you a confirmation email within 24 hours"}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{"You'll receive a final price quote based on your specifications"}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Pick up your beautiful custom cake at the scheduled time</span>
              </li>
            </ul>
          </Card>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => window.location.reload()}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Create Another Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
