import React, { useCallback } from 'react';
import { Remark } from 'react-remark';
import remarkGfm from 'remark-gfm';

import { type NodeProps, useReactFlow } from 'reactflow';

export type SlideData = {
  source: string | React.ComponentType;
  type: 'remark' | 'image' | 'component';
  left?: string;
  up?: string;
  down?: string;
  right?: string;
};

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

// The padding constant is used when computing the presentation layout. It adds
// a bit of space between each slide
export const SLIDE_PADDING = 100;

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideData>) {
  const { source, type, left, up, down, right } = data;
  const { fitView } = useReactFlow();

  const moveToNextSlide = useCallback(
    (event: React.MouseEvent, id: string) => {
      // Prevent the click event from propagating so `onNodeClick` is not
      // triggered when clicking on the control buttons.
      event.stopPropagation();
      fitView({ nodes: [{ id }], duration: 100 });
    },
    [fitView],
  );

  return (
    <article className="slide" style={style}>
      <img src="/mavie-logo.svg" alt="Mavie" className="absolute top-5 right-5 w-24 h-auto" />
      {type === 'remark' && <Remark remarkPlugins={[remarkGfm]}>{source as string}</Remark>}
      {type === 'image' && <img src={source as string} alt={source as string} className="w-full h-full object-cover" />}
      {type === 'component' && typeof source === 'function' && React.createElement(source)}
      <footer className="slide__controls nopan">
        {left && <button onClick={(e) => moveToNextSlide(e, left)}>←</button>}
        {up && <button onClick={(e) => moveToNextSlide(e, up)}>↑</button>}
        {down && <button onClick={(e) => moveToNextSlide(e, down)}>↓</button>}
        {right && <button onClick={(e) => moveToNextSlide(e, right)}>→</button>}
      </footer>
    </article>
  );
}
