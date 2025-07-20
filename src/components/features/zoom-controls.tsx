import { useControls } from "react-zoom-pan-pinch";
import { Button } from "../ui/button";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

export const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute top-2 right-2 flex gap-1 bg-white p-1 rounded shadow z-10">
      <Button size="icon" variant="ghost" onClick={() => zoomIn()}>
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={() => zoomOut()}>
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={() => resetTransform()}>
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};