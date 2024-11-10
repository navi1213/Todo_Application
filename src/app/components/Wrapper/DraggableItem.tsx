import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

const getRandomPosition = () => {
  return { x: Math.random() * 500, y: Math.random() * 500 };
};

const DraggableResizableWrapper = ({ children }) => {
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [position, setPosition] = useState(getRandomPosition());

  useEffect(() => {
    setPosition(getRandomPosition());
  }, []);

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width ? parseInt(ref.style.width) : 200,
          height: ref.style.height ? parseInt(ref.style.height) : 200,
        });
        setPosition(position);
      }}
      className="bg-yellow-200 p-4 rounded shadow-md"
    >
      {children}
    </Rnd>
  );
};

export default DraggableResizableWrapper;
