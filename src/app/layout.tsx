"use client"

import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import BurgerMenu from "./components/BurgerMenu";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isActive, setIsActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setShowMenu(true)
      } else {
        setShowMenu(false)
        setIsActive(false)
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <html lang="en">
      <body
        className={` ${playfair.variable}  antialiased`}
      >
        {pathname !== "/" && <Header></Header>}
        <AnimatePresence>
          {showMenu && (
            <BurgerMenu
              key="burger"
              isActive={isActive}
              setIsActive={setIsActive}
            />
          )}
        </AnimatePresence>

        {children}
      </body>
    </html>
  );
}
