import "@/app/_styles/globals.css";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>The Wild Oasis Company &copy;</footer>
      </body>
    </html>
  );
}
