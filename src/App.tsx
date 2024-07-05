import { KeyboardEventHandler, useCallback, useMemo, useState } from "react";
import ReactFlow, { useReactFlow, NodeMouseHandler } from "reactflow";

import { Slide } from "./Slide";
import { slides, slidesToElements } from "./slides";

const nodeTypes = {
  slide: Slide,
};

export default function App() {
  const start = "01";
  const { fitView } = useReactFlow();
  const { nodes, edges } = useMemo(() => slidesToElements(start, slides), []);
  const [currentSlide, setCurrentSlide] = useState(start);

  const handleKeyPress = useCallback<KeyboardEventHandler>(
    (event) => {
      const slide = slides[currentSlide];

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          if (slide.left) {
            setCurrentSlide(slide.left);
            fitView({ nodes: [{ id: slide.left }], duration: 150 });
          }

          break;

        case "ArrowUp":
          event.preventDefault();
          if (slide.up) {
            setCurrentSlide(slide.up);
            fitView({ nodes: [{ id: slide.up }], duration: 150 });
          }

          break;

        case "ArrowDown":
          event.preventDefault();
          if (slide.down) {
            setCurrentSlide(slide.down);
            fitView({ nodes: [{ id: slide.down }], duration: 150 });
          }

          break;

        case "ArrowRight":
          event.preventDefault();
          if (slide.right) {
            setCurrentSlide(slide.right);
            fitView({ nodes: [{ id: slide.right }], duration: 150 });
          }

          break;
      }
    },
    [fitView, currentSlide],
  );

  const handleNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      if (node.id !== currentSlide) {
        setCurrentSlide(node.id);
        fitView({ nodes: [{ id: node.id }], duration: 150 });
      }
    },
    [fitView, currentSlide],
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      edges={edges}
      fitView
      fitViewOptions={{ nodes: [{ id: start }] }}
      minZoom={0.1}
      onKeyDown={handleKeyPress}
      onNodeClick={handleNodeClick}
    />
  );
}
