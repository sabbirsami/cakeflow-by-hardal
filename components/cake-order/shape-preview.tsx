import React, { useId } from 'react';
import { CakeShapeId } from './shape-data';

export type ShapePreviewProps = {
  shape?: CakeShapeId;
  layers?: number;
  tastes?: string[];
  message?: string;
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

const depth = 24; // px vertical offset between layers (visual height)
const BASE_SCALE = 1.4;
const TAPER_SPREAD = 0.35;
const TOP_INNER_SHRINK = 0.06;
const BASE_VERTICAL_OFFSET = -8;
const MESSAGE_MAX_CHARS_PER_LINE = 12;
const MESSAGE_MAX_LINES = 3;
const MESSAGE_CENTER_Y = 82;
const MESSAGE_LINE_HEIGHT = 10;

function adjustLightness(hsl: string, delta: number) {
  const match = /hsl\(([^\s]+)\s+([^%]+)%\s+([^%]+)%\)/.exec(hsl);
  if (!match) return hsl;
  const [, h, s, l] = match;
  const nextL = Math.max(0, Math.min(100, parseFloat(l) + delta));
  return `hsl(${h} ${s}% ${nextL}%)`;
}

function toCapitalized(sentence: string) {
  return sentence.replace(/(^|\s)([a-zá-öø-ÿ])/gi, (match) => match.toUpperCase());
}

function wrapMessage(message: string): string[] {
  const normalized = message.trim().replace(/\s+/g, ' ');
  if (!normalized) return [];

  const lines: string[] = [];
  let remaining = normalized;

  for (let i = 0; i < MESSAGE_MAX_LINES && remaining; i++) {
    if (remaining.length <= MESSAGE_MAX_CHARS_PER_LINE) {
      lines.push(remaining);
      remaining = '';
      break;
    }

    const slice = remaining.slice(0, MESSAGE_MAX_CHARS_PER_LINE + 1);
    const lastSpace = slice.lastIndexOf(' ');

    if (lastSpace > 0) {
      lines.push(remaining.slice(0, lastSpace));
      remaining = remaining.slice(lastSpace + 1).trimStart();
    } else {
      lines.push(remaining.slice(0, MESSAGE_MAX_CHARS_PER_LINE));
      remaining = remaining.slice(MESSAGE_MAX_CHARS_PER_LINE).trimStart();
    }
  }

  if (remaining.length > 0 && lines.length > 0) {
    const lastIndex = lines.length - 1;
    const base = lines[lastIndex].slice(0, Math.max(0, MESSAGE_MAX_CHARS_PER_LINE - 1)).trimEnd();
    lines[lastIndex] = `${base}…`;
  }

  return lines;
}

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

function getShapeTransform(scaleMultiplier = 1, extra?: string | number | readonly string[]) {
  const baseScale = (BASE_SCALE * scaleMultiplier).toFixed(4);
  const transformParts = ['translate(100 100)', `scale(${baseScale})`, 'translate(-100 -100)'];
  if (extra) {
    transformParts.push(extra.toString());
  }
  return transformParts.join(' ');
}

function renderShape(
  shape: CakeShapeId,
  extra: React.SVGProps<SVGElement> = {},
  scaleMultiplier = 1,
) {
  const def = shapeDef(shape);
  const { transform, ...rest } = extra;
  return React.createElement(def.tag, {
    ...def.attrs,
    ...rest,
    transform: getShapeTransform(scaleMultiplier, transform),
  });
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

export function ShapePreview({ shape, layers = 1, tastes, message, className }: ShapePreviewProps) {
  if (!shape) return null;
  const L = Math.max(1, Math.min(layers, 8)); // clamp for visuals
  const gradientPrefix = useId();

  const sideStroke = 'rgba(0,0,0,0.08)';
  const topStroke = 'rgba(0,0,0,0.12)';
  const highlightStroke = 'rgba(255,255,255,0.85)';
  const messageLines = message ? wrapMessage(message) : [];

  const layerConfigs = Array.from({ length: L }).map((_, idx) => {
    const i = L - 1 - idx; // bottom first
    const y = i * depth + BASE_VERTICAL_OFFSET;
    const denom = Math.max(L - 1, 1);
    const taperRatio = L > 1 ? i / denom : 0.5;
    const scale = 1 - TAPER_SPREAD / 2 + taperRatio * TAPER_SPREAD;
    const topScale = scale * (1 - TOP_INNER_SHRINK);
    // Taste coloring: assign from top to bottom using selected tastes
    const tasteCount = tastes?.length ?? 0;
    const tasteIdx = tasteCount > 0 ? (L - 1 - idx) % tasteCount : -1; // top uses tastes[0]
    const tasteColor = tasteIdx >= 0 ? TASTE_COLORS[tastes![tasteIdx]] : undefined;
    const topFill = tasteColor ?? layerFill(i, L);
    const sideBase = tasteColor ?? layerSideFill(i, L);
    const sideGradientId = `${gradientPrefix}-side-${i}`;
    const topGradientId = `${gradientPrefix}-top-${i}`;
    return {
      i,
      y,
      scale,
      topScale,
      topFill,
      sideBase,
      sideGradientId,
      topGradientId,
    };
  });

  const topConfig = layerConfigs.find((cfg) => cfg.i === 0);
  const topClipId = topConfig ? `${gradientPrefix}-clip-top` : undefined;

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
        <radialGradient id="plate" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)" stopOpacity="0.25" />
        </radialGradient>
        {layerConfigs.map(({ sideBase, sideGradientId, topFill, topGradientId }) => (
          <React.Fragment key={sideGradientId}>
            <linearGradient id={sideGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={adjustLightness(sideBase, 12)} />
              <stop offset="55%" stopColor={sideBase} />
              <stop offset="100%" stopColor={adjustLightness(sideBase, -12)} />
            </linearGradient>
            <radialGradient id={topGradientId} cx="50%" cy="32%" r="70%">
              <stop offset="0%" stopColor={adjustLightness(topFill, 16)} />
              <stop offset="65%" stopColor={topFill} />
              <stop offset="100%" stopColor={adjustLightness(topFill, -8)} />
            </radialGradient>
          </React.Fragment>
        ))}
        {topConfig && topClipId && (
          <clipPath id={topClipId}>
            {renderShape(shape, { fill: '#fff' }, topConfig.topScale)}
          </clipPath>
        )}
      </defs>

      {/* Ground shadow */}
      <ellipse cx={100} cy={165 + (L - 1) * (depth / 2)} rx={115} ry={20} fill="rgba(0,0,0,0.18)" />
      <ellipse
        cx={100}
        cy={160 + (L - 1) * (depth / 2)}
        rx={105}
        ry={16}
        fill="url(#plate)"
        opacity={0.55}
      />

      {/* Layers: bottom to top */}
      {layerConfigs.map(({ i, y, scale, topScale, sideGradientId, topGradientId }) => (
        <g key={i}>
          {/* Side face (offset down) */}
          <g transform={`translate(0, ${y + depth / 2})`}>
            {renderShape(
              shape,
              {
                fill: `url(#${sideGradientId})`,
                stroke: sideStroke,
                strokeWidth: 1.2,
              },
              scale,
            )}
          </g>

          {/* Top face (with shadow on the lowest layer) */}
          <g transform={`translate(0, ${y})`} filter={i === 0 ? 'url(#ds)' : undefined}>
            {renderShape(
              shape,
              {
                fill: `url(#${topGradientId})`,
                stroke: topStroke,
                strokeWidth: 1.15,
              },
              topScale,
            )}
            {renderShape(
              shape,
              {
                fill: 'none',
                stroke: highlightStroke,
                strokeWidth: 1.35,
                opacity: 0.7,
              },
              topScale,
            )}
            {i === 0 && messageLines.length > 0 && (
              <g
                transform={getShapeTransform(topScale)}
                clipPath={topClipId ? `url(#${topClipId})` : undefined}
              >
                <text
                  x={100}
                  y={MESSAGE_CENTER_Y - ((messageLines.length - 1) * MESSAGE_LINE_HEIGHT) / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(70, 35, 20, 0.9)"
                  stroke="rgba(255, 255, 255, 0.78)"
                  strokeWidth={0.7}
                  fontFamily="'Playfair Display', serif"
                  fontWeight={600}
                  fontSize={12}
                  letterSpacing={0.35}
                  style={{ paintOrder: 'stroke fill' }}
                >
                  {messageLines.map((line, index) => (
                    <tspan
                      key={line + index}
                      x={100}
                      y={
                        MESSAGE_CENTER_Y -
                        ((messageLines.length - 1) * MESSAGE_LINE_HEIGHT) / 2 +
                        index * MESSAGE_LINE_HEIGHT
                      }
                    >
                      {toCapitalized(line)}
                    </tspan>
                  ))}
                </text>
              </g>
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}

export default ShapePreview;
