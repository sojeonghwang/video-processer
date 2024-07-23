import type { Metadata } from "next";
import "./globals.css";
import sytled from "./page.module.css";

export const metadata: Metadata = {
  title: "비디오 자막 뽑기",
  description: "비디오의 자막을 뽑아내는 사이트 입니다.",
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
      </body>
    </html>
  );
}
