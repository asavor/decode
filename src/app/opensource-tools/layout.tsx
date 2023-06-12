import OpenSourceTools from "@/app/opensource-tools/page";

export const metadata = {
  title: "OpenSource Tools | antibot.to",
};

export default function OpenSourceToolsLayout({
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
