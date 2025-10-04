export type CakeShapeId =
  | 'round'
  | 'square'
  | 'rectangle'
  | 'heart'
  | 'star'
  | 'hexagon';

export type CakeShapeOption = {
  id: CakeShapeId;
  name: string;
  icon: string;
  svg: string;
};

export const CAKE_SHAPE_OPTIONS: CakeShapeOption[] = [
  {
    id: 'round',
    name: 'Round',
    icon: '⭕',
    svg: `
    <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="60" cy="60" r="42" stroke="currentColor" stroke-width="4" />
    </svg>
  `,
  },
  {
    id: 'square',
    name: 'Square',
    icon: '⬜',
    svg: `
    <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect x="25" y="25" width="70" height="70" rx="6" stroke="currentColor" stroke-width="4" />
    </svg>
  `,
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    icon: '▭',
    svg: `
    <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect x="18" y="35" width="84" height="50" rx="8" stroke="currentColor" stroke-width="4" />
    </svg>
  `,
  },
  {
    id: 'heart',
    name: 'Heart',
    icon: '♥',
    svg: `
    <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M60 92C60 92 22 68 22 44C22 32 30 24 42 24C51 24 58 29 60 35C62 29 69 24 78 24C90 24 98 32 98 44C98 68 60 92 60 92Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  },
  {
    id: 'star',
    name: 'Star',
    icon: '★',
    svg: `
    <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M60 24L70.8 48.3L97 51.2L78.5 69L83.6 95.6L60 83.3L36.4 95.6L41.5 69L23 51.2L49.2 48.3L60 24Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
    </svg>
  `,
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    icon: '⬡',
    svg: `
    <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M60 18L93 40V80L60 102L27 80V40L60 18Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
    </svg>
  `,
  },
];

export const CAKE_SHAPE_MAP: Record<CakeShapeId, CakeShapeOption> = CAKE_SHAPE_OPTIONS.reduce(
  (acc, shape) => {
    acc[shape.id] = shape;
    return acc;
  },
  {} as Record<CakeShapeId, CakeShapeOption>
);
