interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  vertical?: boolean;
}

export function StepIndicator({ steps, currentStep, vertical = false }: StepIndicatorProps) {
  if (vertical) {
    return (
      <div className="flex flex-col gap-6">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isCompleted
                    ? 'border-accent bg-accent text-accent-foreground'
                    : isCurrent
                    ? 'border-accent bg-background text-accent'
                    : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <span
                className={`text-sm ${
                  isCurrent ? 'font-semibold text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal layout for mobile
  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute left-0 top-5 h-0.5 w-full bg-border">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  isCompleted
                    ? 'border-accent bg-accent text-accent-foreground'
                    : isCurrent
                    ? 'border-accent bg-background text-accent'
                    : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 hidden text-sm md:block ${
                  isCurrent ? 'font-semibold text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
