'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { OrderSummary } from './order-summary';
import { CakeShapeId } from './shape-data';
import ShapePreview from './shape-preview';
import { StepIndicator } from './step-indicator';
import { ConfirmationStep } from './steps/confirmation-step';
import { ContactStep } from './steps/contact-step';
import { DateStep } from './steps/date-step';
import { ImageStep } from './steps/image-step';
import { LayersStep } from './steps/layers-step';
import { ShapeStep } from './steps/shape-step';
import { TasteStep } from './steps/taste-step';
import { TextStep } from './steps/text-step';

export type CakeOrder = {
  shape?: string;
  layers?: number;
  tastes?: string[];
  text?: string;
  imageUrl?: string;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
};

const STEPS = [
  { id: 1, title: 'Shape', component: ShapeStep },
  { id: 2, title: 'Layers', component: LayersStep },
  { id: 3, title: 'Taste', component: TasteStep },
  { id: 4, title: 'Text', component: TextStep },
  { id: 5, title: 'Image', component: ImageStep },
  { id: 6, title: 'Contact', component: ContactStep },
  { id: 7, title: 'Date', component: DateStep },
];
export function CakeOrderFunnel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState<CakeOrder>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewShape, setPreviewShape] = useState<CakeShapeId | undefined>(
    order.shape as CakeShapeId | undefined,
  );
  const [previewLayers, setPreviewLayers] = useState<number | undefined>(order.layers);
  const [previewTastes, setPreviewTastes] = useState<string[] | undefined>(order.tastes);
  const [previewMessage, setPreviewMessage] = useState<string | undefined>(order.text);

  useEffect(() => {
    setPreviewShape(order.shape as CakeShapeId | undefined);
  }, [order.shape]);

  useEffect(() => {
    setPreviewLayers(order.layers);
  }, [order.layers]);

  useEffect(() => {
    if (order.layers) {
      setPreviewLayers(order.layers);
    }
  }, [order.layers]);

  useEffect(() => {
    setPreviewTastes(order.tastes);
  }, [order.tastes]);

  useEffect(() => {
    setPreviewMessage(order.text);
  }, [order.text]);

  const handleNext = (data: Partial<CakeOrder>) => {
    const updatedOrder = { ...order, ...data };
    setOrder(updatedOrder);

    if (data.shape) {
      setPreviewShape(data.shape as CakeShapeId);
    }

    if (data.layers) {
      setPreviewLayers(data.layers);
    }

    if (data.tastes) {
      setPreviewTastes(data.tastes);
    }

    if (typeof data.text === 'string') {
      setPreviewMessage(data.text);
    }

    if (currentStep === STEPS.length) {
      // Submit the order
      handleSubmit(updatedOrder);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (finalOrder: CakeOrder) => {
    console.log('[v0] Submitting order:', finalOrder);
    // Here you would send the order to your backend/calendar system
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ConfirmationStep order={order} />;
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const isShapeStep = currentStep === 1;
  const isLayersStep = currentStep === 2;
  const isTasteStep = currentStep === 3;
  const isTextStep = currentStep === 4;

  const stepContent = isShapeStep ? (
    <ShapeStep
      order={order}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={currentStep === 1}
      onShapeChange={(shape) => setPreviewShape(shape)}
    />
  ) : isLayersStep ? (
    <LayersStep
      order={order}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={false}
      onLayersChange={(n: number) => setPreviewLayers(n)}
    />
  ) : isTasteStep ? (
    <TasteStep
      order={order}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={false}
      onTastesChange={(t: string[]) => setPreviewTastes(t)}
    />
  ) : isTextStep ? (
    <TextStep
      order={order}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={false}
      onTextChange={(text) => setPreviewMessage(text)}
    />
  ) : (
    <CurrentStepComponent
      order={order}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={currentStep === 1}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground flex items-center gap-2">
            <Image
              className="rotate-6 -mb-3"
              src={'/logo-dark.webp'}
              alt="Hardal Patisserie"
              width={100}
              height={100}
            />{' '}
            <span>Patisserie</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 pt-16">
        <div className="">
          {/* Title */}
          {/* <div className="mb-12 border-b border-border pb-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-foreground md:text-5xl text-balance">
              Create Your Custom Cake
            </h2>
            <p className="ps-1 text-muted-foreground">
              Design your perfect cake in just a few simple steps
            </p>
          </div> */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
            {/* Left Column - Step Navigation */}
            <div className="hidden lg:block col-span-2">
              <div className="sticky top-8">
                <StepIndicator steps={STEPS} currentStep={currentStep} vertical />
              </div>
            </div>

            {/* Mobile Step Indicator - Horizontal */}
            <div className="lg:hidden col-span-full">
              <StepIndicator steps={STEPS} currentStep={currentStep} />
            </div>

            {/* Middle Column - Form Content */}
            <div className="w-full col-span-full lg:col-span-7 px-0 lg:px-10">
              <div className="flex flex-col gap-8 lg:min-h-[540px]">
                <div className="hidden lg:flex items-center justify-center text-foreground/90">
                  {previewShape ? (
                    <ShapePreview
                      shape={previewShape}
                      layers={previewLayers ?? order.layers ?? 1}
                      tastes={previewTastes ?? order.tastes ?? []}
                      message={previewMessage ?? order.text ?? ''}
                      className="w-full max-w-[350px]"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Select a shape to preview your cake
                    </div>
                  )}
                </div>
                <div className="mt-6 lg:mt-auto">{stepContent}</div>
              </div>
              <div className="mt-6 lg:hidden">
                <div className="flex items-center justify-center  p-5 text-foreground/90">
                  {previewShape ? (
                    <ShapePreview
                      shape={previewShape}
                      layers={previewLayers ?? order.layers ?? 1}
                      tastes={previewTastes ?? order.tastes ?? []}
                      message={previewMessage ?? order.text ?? ''}
                      className="w-full max-w-[160px]"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Select a shape to preview your cake
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary (Sticky) */}
            <div className="hidden lg:block col-span-3">
              <div className="sticky top-8">
                <OrderSummary order={order} currentStep={currentStep} />
              </div>
            </div>
          </div>

          {/* Mobile Summary - Show at bottom on mobile */}
          <div className="lg:hidden mt-8">
            <OrderSummary order={order} currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
