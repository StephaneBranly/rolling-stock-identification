import React, { useState } from "react";
import { MaskEditor } from "react-mask-editor";

import "react-mask-editor/dist/style.css";

const ImageUploader = ({ selectedImage, setSelectedImage }: any) => {
  const [loadedImage, setLoadedImage] = useState<any | null>(null);
  const canvas = React.useRef<any>();
  const canvas2 = React.useRef<any>();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) {
      return;
    }

    setSelectedImage(URL.createObjectURL(image));
  };

  const handlerImageKeepMask = () => {
    const ctxMask = canvas.current.getContext("2d");
    // load loadedImage which is a URL blob
    const ctx = canvas2.current.getContext("2d");
    // update the canvas size
    canvas2.current.width = canvas.current.width;
    canvas2.current.height = canvas.current.height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas2.current.width, canvas2.current.height);

    const image = new Image();
    image.src = loadedImage;
    image.onload = () => {
      ctx.drawImage(ctxMask.canvas, 0, 0);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(image, 0, 0);
      setSelectedImage(canvas2.current.toDataURL("image/png"));
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" height={200} />}
    </div>
  );
};
export default ImageUploader;
