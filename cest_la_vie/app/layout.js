import { Quicksand } from 'next/font/google';
import { Raleway } from 'next/font/google';
import "./globals.css";

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Pasticceria C'est la Vie - Varese",
  description: "Pasticceria artigianale a Varese",
  icons: {
    icon: "/logo.jpeg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} ${raleway.className}`}>
        {children}
      </body>
    </html>
  );
}
