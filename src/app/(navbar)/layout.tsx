import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

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
      className={"bg-darkCustomColour h-screen flex flex-col justify-between"}
    >
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </section>
  );
}
