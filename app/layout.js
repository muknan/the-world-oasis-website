import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  // weight: {},
});

export const metadata = {
  title: {
    template: "%s — The Wild Oasis",
    default: "Welcome — The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Nova Scotia, surrounded by beautiful atlantic waters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-primary-950 text-primary-100 ${josefin.className} relative flex flex-col antialiased`}
      >
        <Header>
          <Logo />
          <Navigation />
        </Header>
        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full max-w-7xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
