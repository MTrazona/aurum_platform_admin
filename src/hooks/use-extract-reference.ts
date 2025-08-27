import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

export interface ReferenceExtractionResult {
  ocrText: string;
  extractedReference: string;
  referenceMatch: "matched" | "not-matched" | "loading" | "error";
}

export function useExtractReference(
  receiptImageUrl?: string,
  referenceNumber?: string
): ReferenceExtractionResult {
  const [ocrText, setOcrText] = useState("");
  const [extractedReference, setExtractedReference] = useState("");
  const [referenceMatch, setReferenceMatch] = useState<
    "matched" | "not-matched" | "loading" | "error"
  >("loading");

  useEffect(() => {
    const extract = async () => {
      if (!receiptImageUrl || !referenceNumber) return;
      setReferenceMatch("loading");

      try {
        const result = await Tesseract.recognize(receiptImageUrl, "eng");
        const rawText = result.data.text;
        setOcrText(rawText);

        const cleanText = rawText.replace(/\s+/g, "").toLowerCase();
        const refPattern = referenceNumber
          .split("")
          .map((char) => `${char}\\s*`)
          .join("");
        const regex = new RegExp(refPattern, "i");

        if (regex.test(cleanText)) {
          setExtractedReference(referenceNumber);
          setReferenceMatch("matched");
        } else {
          setExtractedReference("Not found");
          setReferenceMatch("not-matched");
        }
      } catch (error) {
        console.error("OCR failed:", error);
        setReferenceMatch("error");
        setExtractedReference("Error");
      }
    };

    extract();
  }, [receiptImageUrl, referenceNumber]);

  return {
    ocrText,
    extractedReference,
    referenceMatch,
  };
}
