import "./globals.css";

export const metadata = {
  title: "decode | antibot.to",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-darkCustomColour min-h-screen"}>{children}</body>
    </html>
  );
}
