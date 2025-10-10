'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { CakeOrder } from '../cake-order-funnel';
import { generateHardalOrderPdf } from '../pdf/generate-order-pdf';

interface ConfirmationStepProps {
  order: CakeOrder;
}

export function ConfirmationStep({ order }: ConfirmationStepProps) {
  const handleDownloadPdf = () => {
    generateHardalOrderPdf(order);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
              Hardal Patisserie
            </h1>
            <Button
              variant="outline"
              onClick={handleDownloadPdf}
              className="border-border text-foreground hover:bg-accent/10"
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-10 w-10 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="space-y-3 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground">
              Order Confirmed!
            </h2>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We&rsquo;ve received your custom cake request and will be in touch soon.
            </p>
          </div>

          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
              Order Summary
            </h3>
            <dl className="space-y-3 text-sm text-foreground">
              <div className="flex items-start justify-between gap-6 border-b border-border pb-2">
                <dt className="text-muted-foreground">Size</dt>
                <dd className="font-medium capitalize">{order.size ?? '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-border pb-2">
                <dt className="text-muted-foreground">Shape</dt>
                <dd className="font-medium capitalize">{order.shape ?? '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-border pb-2">
                <dt className="text-muted-foreground">Layers</dt>
                <dd className="font-medium">{order.layers ?? '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-border pb-2">
                <dt className="text-muted-foreground">Flavors</dt>
                <dd className="font-medium capitalize">
                  {order.tastes && order.tastes.length > 0 ? order.tastes.join(', ') : '—'}
                </dd>
              </div>
              {order.text && (
                <div className="flex items-start justify-between gap-6 border-b border-border pb-2">
                  <dt className="text-muted-foreground">Message</dt>
                  <dd className="font-medium text-right">{order.text}</dd>
                </div>
              )}
              {order.specialWishes && (
                <div className="flex items-start justify-between gap-6 border-b border-border pb-2">
                  <dt className="text-muted-foreground">Special Wishes</dt>
                  <dd className="whitespace-pre-line text-right text-sm font-medium">
                    {order.specialWishes}
                  </dd>
                </div>
              )}
              <div className="flex items-start justify-between gap-6">
                <dt className="text-muted-foreground">Pickup Date</dt>
                <dd className="font-medium">{order.date ?? '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-6">
                <dt className="text-muted-foreground">Pickup Time</dt>
                <dd className="font-medium">{order.time ?? '—'}</dd>
              </div>
            </dl>
          </Card>

          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
              Contact Information
            </h3>
            <dl className="space-y-3 text-sm text-foreground">
              <div className="flex items-start justify-between gap-6">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">{order.name ?? '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-6">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium">{order.email ?? '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-6">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{order.phone ?? '—'}</dd>
              </div>
            </dl>
          </Card>

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

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Button
              onClick={handleDownloadPdf}
              variant="outline"
              className="border-border text-foreground hover:bg-accent/10"
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Create Another Order
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
