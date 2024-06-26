import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { i18n } from "@/libs/i18n/i18n";
import classNames from "classnames";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import HeaderLinks from "@/libs/ui/template/HeaderLinks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tchiktchikproductions.fr/"),
  title: {
    default: i18n.website,
    template: `%s - ${i18n.website}`,
  },
  description: i18n.bio.bio,
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-white">
      <UserProvider>
        <body className={`${inter.className} max-w-[1000px] m-auto`}>
          <header
            className={classNames(
              "fixed max-w-[1000px]",
              "flex justify-between items-center",
              "min-h-[5rem] sm:min-h-[4rem] w-screen",
              "px-4",
              "bg-white/85 z-30 backdrop-blur-sm"
            )}
          >
            <Link
              href="/"
              className="font-bold hover-underline text-xl sm:text-2xl text-salmon font-hira"
            >
              {i18n.website}
            </Link>
            <HeaderLinks />
          </header>
          {children}
          <footer
            className={classNames(
              "max-w-[1000px] relative top-[3rem]",
              "px-4 pt-4 sm:pt-0"
            )}
          >
            <div className="flex justify-between flex-col md:flex-row">
              <div
                className={classNames(
                  "grow-0 w-full md:w-[calc(50%-1rem)]",
                  "flex flex-row justify-start items-center",
                  "text-tiny text-gray-500"
                )}
              ></div>
              <div
                className={classNames(
                  "grow-0 w-full md:w-1/2",
                  "border-t-2 border-bl",
                  "flex flex-row justify-end items-center"
                )}
              >
                <Link
                  href="/"
                  className="font-bold hover-underline text-salmon text-right my-4 text-small"
                >
                  <div className="flex flex-col md:flex-row">
                    <p>{i18n.website}</p>
                    <p className="md:ml-1">{`© 2023 - ${new Date().getFullYear()}`}</p>
                  </div>
                </Link>
              </div>
            </div>
          </footer>
        </body>
      </UserProvider>
    </html>
  );
}
