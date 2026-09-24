import { ImageResponse } from "next/og";
import { ShareCard } from "@/lib/share-image";

export const alt =
  "AppGate Pack free wrapper precheck scorecard: HIGH wrapper risk for a Capacitor app, with 4.2, 4.3, and metadata flags. Not a review prediction.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(<ShareCard />, { ...size });
}
