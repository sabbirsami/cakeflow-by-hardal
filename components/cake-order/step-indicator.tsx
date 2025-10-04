import { motion, type Variants } from 'framer-motion';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  vertical?: boolean;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
} satisfies Variants;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
} satisfies Variants;

export function StepIndicator({ steps, currentStep, vertical = false }: StepIndicatorProps) {
  if (vertical) {
    return (
      <motion.div
        className="flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <motion.div key={step.id} className="flex items-center gap-3" variants={itemVariants} custom={index}>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  const progressWidth =
    steps.length > 1 ? ((currentStep - 1) / (steps.length - 1)) * 100 : currentStep > 1 ? 100 : 0;

  return (
    <div className="relative">
      <div className="absolute left-0 top-5 h-0.5 w-full bg-border">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      <motion.div
        className="relative flex justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <motion.div key={step.id} className="flex flex-col items-center" variants={itemVariants} custom={index}>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
