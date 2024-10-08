import type { Metadata } from "next";
import "./globals.css";
import sytled from "./page.module.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "비디오 자막 추출",
  description: "비디오의 자막 추출 사이트 입니다.",
  verification: {
    google: "XbXaD6NHHzRT94Irir5A5GI7xR7sK_JUFhrveQj5-tc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={sytled.content}>{children}</div>
        <div id="portal" />
        <Analytics />
      </body>
    </html>
  );
}
