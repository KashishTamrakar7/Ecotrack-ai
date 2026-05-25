"use client";

import EcoMap from "@/components/EcoMap";

export default function MapPage({ navigate, showToast }) {
  return <EcoMap showToast={showToast} navigate={navigate} />;
}