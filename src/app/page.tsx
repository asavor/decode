import Card from "@/components/landing/card";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <main className=" pt-16 container mx-auto relative">
      <div className="text-center">
        <h2 className="text-3xl  font-extrabold tracking-tight text-white sm:text-4xl">
          decode.antibot.to
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
          Open source tools to help reversing
        </p>
      </div>
      <div className="flex lg:flex-row justify-between gap-6 lg:px-24 mt-12 flex-col px-7">
        {Card()}
      </div>

      {/*<Footer></Footer>*/}
    </main>
  );
}
