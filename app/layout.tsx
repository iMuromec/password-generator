import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Secure password generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
