import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, Almarai } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./components/I18nProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const almarai = Almarai({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyClinic — Advanced Medical Care, Delivered with Heart",
  description:
    "MyClinic Medical Group — specialist care, modern facilities, and 14 branches across the Kingdom of Saudi Arabia. Book, consult, or request home healthcare.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexSerif.variable} ${almarai.variable} antialiased`}
    >
      <body>
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
