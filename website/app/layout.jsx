import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata = {
  title: "Mototrek | Premium Motorcycle Riding Gear & Accessories Store in Pune",
  description:
    "Discover premium motorcycle riding gear, helmets, jackets, gloves, boots, luggage and accessories at Mototrek, Pune. Get expert advice, genuine products, trusted brands and join a passionate riding community.",
  metadataBase: new URL("https://mototrek.in"),
  openGraph: {
    title: "Premium Motorcycle Riding Gear Store in Pune | Mototrek",
    description:
      "Shop genuine motorcycle helmets, riding jackets, gloves, boots, luggage and touring accessories. Visit Mototrek for expert guidance, trusted brands and a community built by riders.",
    url: "https://mototrek.in",
    siteName: "Mototrek",
    images: [
      {
        url: "https://mototrek.in/images/og-image.webp",
        alt: "Mototrek - Premium Motorcycle Riding Gear Store in Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="w-full bg-[#f7f3ec] text-[#1f241f] antialiased min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
