import { Cake, Calendar, ImageIcon, Layers, Mail, MessageSquare, Phone, User } from 'lucide-react';
import type { CakeOrder } from './cake-order-funnel';

type OrderSummaryProps = {
  order: CakeOrder;
  currentStep: number;
};

export function OrderSummary({ order, currentStep }: OrderSummaryProps) {
  return (
    <div className="border-s- border-border bg-card p-8 shadow-sm">
      <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground ">
        Your Cake
      </h3>
      <p className="text-sm text-muted-foreground mb-8">Your Order Summary</p>

      <div className="space-y-6">
        {/* Shape */}
        {order.shape && (
          <div className="border-b border-border pb-4">
            <div className="flex items-start gap-3">
              <Cake className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Shape
                </p>
                <p className="text-base text-foreground font-medium capitalize">{order.shape}</p>
              </div>
            </div>
          </div>
        )}

        {/* Layers */}
        {order.layers && (
          <div className="border-b border-border pb-4">
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
          </div>
        )}

        {/* Tastes */}
        {order.tastes && order.tastes.length > 0 && (
          <div className="border-b border-border pb-4">
            <div className="flex items-start gap-3">
              <Cake className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Flavors
                </p>
                <p className="text-base text-foreground font-medium">{order.tastes.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Text */}
        {order.text && (
          <div className="border-b border-border pb-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Cake Text
                </p>
                <p className="text-base text-foreground font-medium italic">&ldquo;{order.text}&rdquo;</p>
              </div>
            </div>
          </div>
        )}

        {/* Image */}
        {order.imageUrl && (
          <div className="border-b border-border pb-4">
            <div className="flex items-start gap-3">
              <ImageIcon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Reference Image
                </p>
                <p className="text-base text-foreground font-medium">Image uploaded</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info */}
        {order.name && (
          <div className="border-b border-border pb-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Name
                </p>
                <p className="text-base text-foreground font-medium">{order.name}</p>
              </div>
            </div>
          </div>
        )}

        {order.email && (
          <div className="border-b border-border pb-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Email
                </p>
                <p className="text-base text-foreground font-medium break-all">{order.email}</p>
              </div>
            </div>
          </div>
        )}

        {order.phone && (
          <div className="border-b border-border pb-4">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Phone
                </p>
                <p className="text-base text-foreground font-medium">{order.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Date & Time */}
        {order.date && (
          <div className="border-b border-border pb-4">
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
          </div>
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
