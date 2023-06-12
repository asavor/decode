import Footer from "@/components/footer/footer";

export const metadata = {
  title: "opensource tools | antibot.to",
};

export default function OpenSourceToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        "bg-darkCustomColour min-h-screen h-auto flex flex-col justify-between"
      }
    >
      {children}
      <Footer></Footer>
    </section>
  );
}
