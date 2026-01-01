import { useEffect, useRef, useState } from "react";
import { useGrid } from "./GridContext";

type Point = { x: number; y: number };

type DragRect = {
  start: Point;
  end: Point;
  x: number;
  y: number;
  width: number;
  height: number;
};

export function useMouseDragRect() {
  const startRef = useRef<Point | null>(null);
  const { isDragging, setIsDragging } = useGrid()
  const [rect, setRect] = useState<DragRect | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    const point = { x: e.clientX, y: e.clientY };
    startRef.current = point;
    setIsDragging(true)
    setRect(null);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !startRef.current) return;

      const start = startRef.current;
      const end = { x: e.clientX, y: e.clientY };

      const x = Math.min(start.x, end.x);
      const y = Math.min(start.y, end.y);
      const width = Math.abs(end.x - start.x);
      const height = Math.abs(end.y - start.y);
      

      setRect({
        start,
        end,
        x,
        y,
        width,
        height,
      });
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!startRef.current) return;

      const start = startRef.current;
      const end = { x: e.clientX, y: e.clientY };

      const x = Math.min(start.x, end.x);
      const y = Math.min(start.y, end.y);
      const width = Math.abs(end.x - start.x);
      const height = Math.abs(end.y - start.y);

      setRect({
        start,
        end,
        x,
        y,
        width,
        height,
      });

      startRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return {
    isDragging,
    rect,
    onMouseDown,
  };
}
