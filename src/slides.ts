import { Types } from '@/components/types';
import { Edge, Node } from 'reactflow';
import { SLIDE_HEIGHT, SLIDE_PADDING, SLIDE_WIDTH, SlideData } from './Slide';

const slide01 = {
  id: '01',
  data: {
    right: '02',
    source: `
# Building a multi-domain SSO with FusionAuth and NextJs

## Challenges and learnings

**Cezar Neaga**

**Frontend Lead @ Mavie Next**

`,
    type: 'remark',
  },
};

const slide02 = {
  id: '02',
  data: {
    left: '01',
    up: '04',
    right: '03',
    source: '/mavie.png',
    type: 'image',
  },
};
const slide04 = {
  id: '04',
  data: {
    up: '05',
    down: '02',
    source: Types,
    type: 'component',
  },
};
const slide03 = {
  id: '03',
  data: {
    left: '02',
    up: '04',
    right: '05',
    source: `
# The stack

- NextJs with App Router
- TailwindCSS - with shadcn/ui
- TypeScript
- GraphQL on top of Postgres - with Hasura
`,
    type: 'remark',
  },
};

const slide06 = {
  id: '06',
  data: {
    down: '02',
    source: `
  # Slide 3

- This is the third slide
- It has a down arrow to go back to the second slide
`,
    type: 'remark',
  },
};

const slide05 = {
  id: '05',
  data: {
    left: '03',
    source: `
# Slide 4

- This is the fourth slide
- It has a left arrow to go back to the second slide
`,
    type: 'remark',
  },
};

export const slides = Object.fromEntries(
  [slide01, slide02, slide03, slide04, slide05, slide06].map(({ id, data }) => [id, data]),
) as Record<string, SlideData>;

export const slidesToElements = (initial: string, slides: Record<string, SlideData>) => {
  const stack = [{ id: initial, position: { x: 0, y: 0 } }];
  const visited = new Set();
  const nodes: Node<SlideData>[] = [];
  const edges: Edge[] = [];

  while (stack.length) {
    const { id, position } = stack.pop()!;
    const data = slides[id];
    const node = { id, type: 'slide', position, data };

    if (data.left && !visited.has(data.left)) {
      const nextPosition = {
        x: position.x - (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: data.left, position: nextPosition });
      edges.push({
        id: `${id}->${data.left}`,
        source: id,
        target: data.left,
      });
    }

    if (data.up && !visited.has(data.up)) {
      const nextPosition = {
        x: position.x,
        y: position.y - (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: data.up, position: nextPosition });
      edges.push({ id: `${id}->${data.up}`, source: id, target: data.up });
    }

    if (data.down && !visited.has(data.down)) {
      const nextPosition = {
        x: position.x,
        y: position.y + (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: data.down, position: nextPosition });
      edges.push({
        id: `${id}->${data.down}`,
        source: id,
        target: data.down,
      });
    }

    if (data.right && !visited.has(data.right)) {
      const nextPosition = {
        x: position.x + (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: data.right, position: nextPosition });
      edges.push({
        id: `${id}->${data.down}`,
        source: id,
        target: data.right,
      });
    }

    nodes.push(node);
    visited.add(id);
  }

  return { nodes, edges };
};
