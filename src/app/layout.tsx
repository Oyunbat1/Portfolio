"use client"

import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import BurgerMenu from "./components/BurgerMenu";
import gsap from "gsap";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo-client";
import PageTransitionWrapper from "./components/PageTransitionWrapper";
import { Toaster } from "sonner";

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
    const cursor = document.getElementById("cursor");
    const grow = () => gsap.to(cursor, { scale: 4, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
    document.querySelectorAll("h3 ,p ,h1,h2,span").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    if (!cursor) return;
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 160) {
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
        <ApolloProvider client={client}>
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

          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>

        </ApolloProvider>
        <div
          id="cursor"
          className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-[9999]"
        />
        <Toaster
          position="top-right"
          closeButton
          duration={3000}
        />
      </body>
    </html>
  );
}
