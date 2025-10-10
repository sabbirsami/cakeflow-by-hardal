'use client';

import { useEffect, useRef, useState } from 'react';

import { Cake } from 'lucide-react';
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
import { SizeStep } from './steps/size-step';
import { TasteStep } from './steps/taste-step';
import { TextStep } from './steps/text-step';
import { AnimatePresence, motion } from 'framer-motion';

export type CakeOrder = {
  sizeOption?: '18cm' | '24cm' | '28cm' | 'other';
  sizeCustom?: string;
  size?: string;
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
  specialWishes?: string;
};

const STEPS = [
  { id: 1, title: 'Size', component: SizeStep },
  { id: 2, title: 'Shape', component: ShapeStep },
  { id: 3, title: 'Layers', component: LayersStep },
  { id: 4, title: 'Taste', component: TasteStep },
  { id: 5, title: 'Text', component: TextStep },
  { id: 6, title: 'Image', component: ImageStep },
  { id: 7, title: 'Contact', component: ContactStep },
  { id: 8, title: 'Date', component: DateStep },
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
  const stepContentRef = useRef<HTMLDivElement | null>(null);
  const desktopPreviewRef = useRef<HTMLDivElement | null>(null);
  const mobilePreviewRef = useRef<HTMLDivElement | null>(null);

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

  // Step content animation handled by Framer Motion via motion.div

  // Preview animation handled by Framer Motion via motion.div

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
  const isShapeStep = CurrentStepComponent === ShapeStep;
  const isLayersStep = CurrentStepComponent === LayersStep;
  const isTasteStep = CurrentStepComponent === TasteStep;
  const isTextStep = CurrentStepComponent === TextStep;
  const isSizeStep = CurrentStepComponent === SizeStep;

  const stepContent = isSizeStep ? (
    <SizeStep order={order} onNext={handleNext} onBack={handleBack} isFirstStep={currentStep === 1} />
  ) : isShapeStep ? (
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
      <div className="container mx-auto px-4 pb-16 pt-10 sm:pt-12 lg:pb-0 lg:pt-0">
        <div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start lg:h-[calc(100vh-6rem)]">
            {/* Left Column - Step Navigation */}
            <div className="hidden lg:block col-span-2 h-full border-e border-border/60 pr-6 pt-10">
              <div className="sticky top-16">
                <StepIndicator steps={STEPS} currentStep={currentStep} vertical />
              </div>
            </div>

            {/* Mobile Step Indicator - Horizontal */}
            <div className="lg:hidden col-span-full -mx-2 rounded-xl border border-border/50 bg-card/40 p-3">
              <StepIndicator steps={STEPS} currentStep={currentStep} />
            </div>

            {/* Middle Column - Form Content */}
            <div className="w-full col-span-full lg:col-span-7 px-1 sm:px-3 lg:px-6">
              <div className="flex flex-col gap-8 lg:min-h-[540px]">
                <motion.div
                  ref={desktopPreviewRef}
                  key={`${previewShape}-${previewLayers}-${previewMessage}-${(previewTastes ?? []).join(',')}-desktop`}
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="hidden lg:flex items-center justify-center border-b px-10 py-8 text-foreground/90"
                >
                  {previewShape ? (
                    <ShapePreview
                      shape={previewShape}
                      layers={previewLayers ?? order.layers ?? 1}
                      tastes={previewTastes ?? order.tastes ?? []}
                      message={previewMessage ?? order.text ?? ''}
                      className="w-full max-w-[360px]"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Cake className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
                      Select a shape to preview your cake
                    </div>
                  )}
                </motion.div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    ref={stepContentRef}
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mt-8 lg:mt-auto"
                  >
                    {stepContent}
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.div
                className="mt-8 lg:hidden"
                ref={mobilePreviewRef}
                key={`${previewShape}-${previewLayers}-${previewMessage}-${(previewTastes ?? []).join(',')}-mobile`}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-center rounded-3xl border border-border/60 bg-card/60 p-6 text-foreground/90">
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
              </motion.div>
            </div>

            {/* Right Column - Order Summary (Sticky) */}
            <div className="hidden lg:block col-span-3 h-full border-s border-border/60 pl-6">
              <div className="sticky top-16">
                <OrderSummary order={order} currentStep={currentStep} />
              </div>
            </div>
          </div>

          {/* Mobile Summary - Show at bottom on mobile */}
          <div className="lg:hidden mt-10">
            <OrderSummary order={order} currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
