import "./globals.css";

export const metadata = {
  title: "EcoTrack AI — Smart Sustainability Platform",
  description:
    "AI-powered waste scanning, eco mapping, and smart city recycling — powered by Gemini AI, Firebase & Google Maps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-eco-bg text-eco-dark antialiased">{children}</body>
    </html>
  );
}