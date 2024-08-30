import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
const TextRecognition = ({ selectedImage }: { selectedImage: any }) => {
  const [recognizedText, setRecognizedText] = useState("");
  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        const worker = await Tesseract.createWorker();
        worker.setParameters({
          tessedit_char_whitelist: "0123456789",
        });
        const result = await worker.recognize(selectedImage);
        setRecognizedText(result.data.text);
      }
    };
    recognizeText();
  }, [selectedImage]);
  return (
    <div>
      <h2>Recognized Text:</h2>
      <p>{recognizedText}</p>
    </div>
  );
};
export default TextRecognition;
