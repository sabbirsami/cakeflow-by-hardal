import { Cake, Calendar, ImageIcon, Layers, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CakeOrder } from './cake-order-funnel';

type OrderSummaryProps = {
  order: CakeOrder;
  currentStep: number;
};

export function OrderSummary({ order, currentStep }: OrderSummaryProps) {
  return (
    <div className="border-s- border-border bg-card p-8 shadow-sm">
      <motion.h3
        className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground "
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        Your Cake
      </motion.h3>
      <motion.p
        className="text-sm text-muted-foreground mb-8"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
      >
        Your Order Summary
      </motion.p>

      <div className="space-y-6">
        {/* Shape */}
        {order.shape && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <Cake className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Shape
                </p>
                <p className="text-base text-foreground font-medium capitalize">{order.shape}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Layers */}
        {order.layers && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <Layers className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Layers
                </p>
                <p className="text-base text-foreground font-medium">
                  {order.layers} {order.layers === 1 ? 'layer' : 'layers'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tastes */}
        {order.tastes && order.tastes.length > 0 && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <Cake className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Flavors
                </p>
                <p className="text-base text-foreground font-medium">{order.tastes.join(', ')}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Text */}
        {order.text && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Cake Text
                </p>
                <p className="text-base text-foreground font-medium italic">&ldquo;{order.text}&rdquo;</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Image */}
        {order.imageUrl && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <ImageIcon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Reference Image
                </p>
                <p className="text-base text-foreground font-medium">Image uploaded</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Info */}
        {order.name && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Name
                </p>
                <p className="text-base text-foreground font-medium">{order.name}</p>
              </div>
            </div>
          </motion.div>
        )}

        {order.email && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Email
                </p>
                <p className="text-base text-foreground font-medium break-all">{order.email}</p>
              </div>
            </div>
          </motion.div>
        )}

        {order.phone && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Phone
                </p>
                <p className="text-base text-foreground font-medium">{order.phone}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Date & Time */}
        {order.date && (
          <motion.div
            className="border-b border-border pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Pickup Date
                </p>
                <p className="text-base text-foreground font-medium">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {order.time && ` at ${order.time}`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!order.shape && currentStep === 1 && (
          <div className=" py-12">
            <Cake className="h-12 w-12 text-muted-foreground/30  mb-4" />
            <p className="text-muted-foreground text-sm">
              Your selections will appear here as you progress through the steps
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
