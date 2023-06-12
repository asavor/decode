import Footer from "@/components/footer/footer";
import CreditSection from "@/components/openSourceTools/creditSection";
import ToolsGrid from "@/components/openSourceTools/toolsGrid";

export default function OpenSourceTools() {
  return (
    <main className=" pt-16 container mx-auto relative flex flex-col min-h-screen justify-between">
      <ToolsGrid></ToolsGrid>
      <Footer></Footer>
    </main>
  );
}
