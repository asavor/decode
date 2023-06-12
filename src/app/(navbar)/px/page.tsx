import Footer from "@/components/footer/footer";
import Decoder from "@/components/px/decoder";
import Navbar from "@/components/navbar/navbar";
export default function Px() {
  return (
    <main className={"container mx-auto flex flex-col h-screen"}>
      <Navbar></Navbar>
      <Decoder></Decoder>
      <Footer></Footer>
    </main>
  );
}
