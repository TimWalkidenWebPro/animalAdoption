import React from "react";

import "./globals.css";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Footer";
import {StoryblokProvider} from "@/components/StoryblokProviders/StoryblokProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <html lang="en">
          <StoryblokProvider>
              <body>
              <Navbar/>
              {children}
              <Footer/>
              </body>
          </StoryblokProvider>
          </html>
  );
}
