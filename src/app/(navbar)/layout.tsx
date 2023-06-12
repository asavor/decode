import Footer from "@/components/footer/footer";

export const metadata = {
  title: "decode px | antibot.to",
};

export default function DecodeLayout({
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
