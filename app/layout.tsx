import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { i18n } from "@/libs/i18n/i18n";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tchik-Tchik Production",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} max-w-[1200px] m-auto`}>
        <header
          className={classNames(
            "fixed max-w-[1200px]",
            "flex justify-between items-center",
            "min-h-[5rem] sm:min-h-[4rem] w-screen",
            "px-4",
            "bg-white/85 z-30 backdrop-blur-sm"
          )}
        >
          <Link
            href="/"
            className="font-bold hover-underline text-2xl text-salmon"
          >
            {i18n.website}
          </Link>
          <ul>
            <li>
              <TchikLink href="/" className="hover-underline">
                {i18n.menu.homepage}
              </TchikLink>
              <TchikLink href="/contact" className="hover-underline ml-2">
                {i18n.menu.contact}
              </TchikLink>
            </li>
          </ul>
        </header>
        {children}
        <footer
          className={classNames(
            "max-w-[1200px] relative top-[3rem]",
            "px-4 pt-4 sm:pt-0"
          )}
        >
          <div className="flex justify-between">
            <div
              className={classNames(
                "grow-0 w-full md:w-[calc(50%-1rem)]",
                "min-h-[5rem] sm:min-h-[4rem]",
                "flex flex-row justify-start items-center"
              )}
            >
              {i18n.footer.base}
            </div>
            <div
              className={classNames(
                "grow-0 w-full md:w-1/2",
                "border-t-2 border-gray-500",
                "flex flex-row justify-end items-center"
              )}
            >
              <Link
                href="/"
                className="font-bold hover-underline text-salmon text-right"
              >
                {`${i18n.website} © ${new Date().getFullYear()}`}
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
