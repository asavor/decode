import CreditSection from "@/components/openSourceTools/creditSection";
import Footer from "@/components/footer/footer";

export default function creditsPage() {
  return (
    <main className=" pt-16 container mx-auto relative flex flex-col h-screen justify-between">
      <CreditSection></CreditSection>
      <Footer></Footer>
    </main>
  );
}
