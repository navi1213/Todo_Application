import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";

const getRandomPosition = () => {
    // 例えばX座標は50~500, Y座標は50~500の間でランダムに生成
    return { x: Math.random() * 500, y: Math.random() * 500 };
  };
const DraggableResizableWrapper = ({ children }) => {
  const [position, setPosition] = useState({x:0,y:0});
  const [size, setSize] = useState({ width: 200, height: 200 });
  useEffect(()=>{
    setPosition(getRandomPosition());
  },[])
  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: ref.style.width, height: ref.style.height });
        setPosition(position);
      }}
      className="bg-yellow-200 p-4 rounded shadow-md"
    >
      {children}
    </Rnd>
  );
};

export default DraggableResizableWrapper;