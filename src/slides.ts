import { Types } from '@/components/app-types';
import { Cag } from '@/components/cag';
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
    up: '021',
    right: '03',
    source: '/mavie.png',
    type: 'image',
  },
};
const slide021 = {
  id: '021',
  data: {
    up: '022',
    down: '02',
    source: Types,
    type: 'component',
  },
};
const slide022 = {
  id: '022',
  data: {
    up: '023',
    down: '021',
    source: `
# Small team, ambitious goals

## We needed a ~~common~~ opinionated stack

- NextJs with App Router
- TailwindCSS - with shadcn/ui
- TypeScript
- GraphQL on top of Postgres - with Hasura
`,
    type: 'remark',
  },
};
const slide023 = {
  id: '023',
  data: {
    down: '02',
    source: `
# Small and opinionated

## But we still needed to build:

- Design system
- UI library
- Identity provider
- Customer Data Platform
- User profiler
- Electronic health record
`,
    type: 'remark',
  },
};
const slide03 = {
  id: '03',
  data: {
    left: '02',
    right: '04',
    source: `
# Authentication that you can trust

## Or how we ended up with FusionAuth - Evaluation Criteria
- **Basic Criteria** (OAuth 2.0, OpenID Connect, SSO, Localization, Multi-factor authentication,...)
- **Operability** (managed service, ease of use, documentation, scalability, observability)
- **Security and GDPR** (Compliance, Data breach handling, Data protection, Data retention)
- **Legal, Commercial Support and Price Model** (SLA, ISO 27001, Price)

`,
    type: 'remark',
  },
};
const slide04 = {
  id: '04',
  data: {
    left: '03',
    right: '05',
    source: `
# A journey of discovery and learning

## will not

- Tell you to use any of the approaches mentioned today
- tell you which of them is better or worse

## Want you to join in the journey and take what you wish

- from our challenges
- from our questions
- from our mistakes

`,
    type: 'remark',
  },
};
const slide05 = {
  id: '05',
  data: {
    left: '04',
    right: '06',
    source: `
# First try

## Context
- NextAuth.js is a popular OAuth 2.0 library for NextJs
- Balázs Orbán is amazing and ends up at vercel
- Starts working on v4
- Docs are "transitioning"

## Humble beginnings
- FusionAuth local dev is amazing
- FusionAuth says you can customise auth pages: [#7671460be](#)
- We kinda make it work but we are not quite happy hipos

`,
    type: 'remark',
  },
};
const slide06 = {
  id: '06',
  data: {
    left: '05',
    up: '061',
    right: '07',
    source: `
# Second try

## Context
- Designers are not happy with the auth pages
- You have some css to customise and a bit of markup in weird syntax
- New projects come in and want their own auth pages

## Central Authentication Gateway (CAG) solution
- We ditch NextAuth and Oauth
- started using fusion auth api directly
- lets check the code [b4543a2](#)

`,
    type: 'remark',
  },
};
const slide061 = {
  id: '061',
  data: {
    up: '062',
    down: '06',
    source: Cag,
    type: 'component',
  },
};
const slide062 = {
  id: '062',
  data: {
    down: '06',
    source: `
# Central Authentication Gateway (CAG)

## Challenges
- Everyone wanted their own colors/logos/messages - Multi Branding is hard
- access tokens needed to have different scopes - different permissions for each app
- auth app got you the token for the app requesting it.
- naively implemented api calls to fusion
- searchParam heavy
- performance marketing team difficult to please
`,
    type: 'remark',
  },
};
const slide07 = {
  id: '07',
  data: {
    left: '06',
    // up: '071',
    source: `
# Third try

## Context
- There is nothing more permanent than a temporary solution

## Single Sign On (SSO) solution
- Lets make a lib out of fusion api calls
- Refactor auth pages for performance marketing happy hipos
- login once, be logged in across apps
- fetch access token each time you roam from app to app
`,
    type: 'remark',
  },
};
export const slides = Object.fromEntries(
  [slide01, slide02, slide021, slide022, slide023, slide03, slide04, slide05, slide06, slide061, slide062, slide07].map(
    ({ id, data }) => [id, data],
  ),
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
