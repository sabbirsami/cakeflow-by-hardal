import React from 'react';
import { CakeShapeId } from './shape-data';

export type ShapePreviewProps = {
  shape?: CakeShapeId;
  layers?: number;
  tastes?: string[];
  className?: string;
};

// Neutral, warm palette to hint "cake" without realism
const baseHue = 35; // warm beige hue
const sat = 70;

function layerFill(i: number, layers: number) {
  // Top lighter, bottom slightly darker
  const lTop = 78;
  const lBottom = 62;
  const t = layers > 1 ? i / (layers - 1) : 0;
  const l = lTop + (lBottom - lTop) * t;
  return `hsl(${baseHue} ${sat}% ${l}%)`;
}

function layerSideFill(i: number, layers: number) {
  const lTop = 70;
  const lBottom = 55;
  const t = layers > 1 ? i / (layers - 1) : 0;
  const l = lTop + (lBottom - lTop) * t;
  return `hsl(${baseHue} ${sat}% ${l}%)`;
}

const depth = 14; // px vertical offset between layers (visual height)

type ShapeDef = {
  tag: 'ellipse' | 'rect' | 'polygon' | 'path';
  attrs: React.SVGProps<SVGElement>;
};

function shapeDef(shape: CakeShapeId): ShapeDef {
  switch (shape) {
    case 'round':
      return { tag: 'ellipse', attrs: { cx: 100, cy: 70, rx: 60, ry: 38 } } as any;
    case 'square':
      return {
        tag: 'rect',
        attrs: { x: 40, y: 35, width: 120, height: 70, rx: 12, ry: 12 },
      } as any;
    case 'rectangle':
      return {
        tag: 'rect',
        attrs: { x: 30, y: 50, width: 140, height: 50, rx: 10, ry: 10 },
      } as any;
    case 'hexagon':
      return {
        tag: 'polygon',
        attrs: { points: '100,30 145,55 145,95 100,120 55,95 55,55' },
      } as any;
    case 'star':
      return {
        tag: 'polygon',
        attrs: { points: '100,30 118,62 154,66 128,90 135,126 100,108 65,126 72,90 46,66 82,62' },
      } as any;
    case 'heart':
      return {
        tag: 'path',
        attrs: {
          d: 'M100 52 C 112 36, 136 36, 148 52 C 162 70, 152 94, 100 120 C 48 94, 38 70, 52 52 C 64 36, 88 36, 100 52 Z',
        },
      } as any;
    default:
      return {
        tag: 'rect',
        attrs: { x: 40, y: 35, width: 120, height: 70, rx: 12, ry: 12 },
      } as any;
  }
}

function renderShape(shape: CakeShapeId, extra: React.SVGProps<SVGElement> = {}) {
  const def = shapeDef(shape);
  return React.createElement(def.tag, { ...def.attrs, ...extra });
}

const TASTE_COLORS: Record<string, string> = {
  vanilla: 'hsl(45 80% 80%)',
  chocolate: 'hsl(25 45% 40%)',
  strawberry: 'hsl(350 70% 60%)',
  lemon: 'hsl(50 85% 60%)',
  'red-velvet': 'hsl(348 60% 45%)',
  caramel: 'hsl(30 75% 55%)',
  pistachio: 'hsl(110 45% 55%)',
  coffee: 'hsl(30 35% 35%)',
};

export function ShapePreview({ shape, layers = 1, tastes, className }: ShapePreviewProps) {
  if (!shape) return null;
  const L = Math.max(1, Math.min(layers, 8)); // clamp for visuals

  const sideStroke = 'rgba(0,0,0,0.08)';
  const topStroke = 'rgba(0,0,0,0.12)';
  const highlightStroke = 'rgba(255,255,255,0.85)';

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${shape} cake preview with ${L} layer${L > 1 ? 's' : ''}`}
      className={className}
    >
      <defs>
        <filter id="ds" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={100} cy={150 + (L - 1) * (depth / 2)} rx={64} ry={10} fill="rgba(0,0,0,0.12)" />

      {/* Layers: bottom to top */}
      {Array.from({ length: L }).map((_, idx) => {
        const i = L - 1 - idx; // bottom first
        const y = i * depth;
        // Taste coloring: assign from top to bottom using selected tastes
        const tasteCount = tastes?.length ?? 0;
        const tasteIdx = tasteCount > 0 ? (L - 1 - idx) % tasteCount : -1; // top uses tastes[0]
        const tasteColor = tasteIdx >= 0 ? TASTE_COLORS[tastes![tasteIdx]] : undefined;
        const topFill = tasteColor ?? layerFill(i, L);
        const sideFill = tasteColor ?? layerSideFill(i, L);
        return (
          <g key={i}>
            {/* Side face (offset down) */}
            <g transform={`translate(0, ${y + depth / 2})`}>
              {renderShape(shape, { fill: sideFill, stroke: sideStroke, strokeWidth: 1 })}
            </g>

            {/* Top face (with shadow on the lowest layer) */}
            <g transform={`translate(0, ${y})`} filter={i === 0 ? 'url(#ds)' : undefined}>
              {renderShape(shape, { fill: topFill, stroke: topStroke, strokeWidth: 1 })}
              {renderShape(shape, { fill: 'none', stroke: highlightStroke, strokeWidth: 1.25 })}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default ShapePreview;
