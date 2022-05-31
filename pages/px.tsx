import type { NextPage } from 'next'
import Navbar from '../components/header/navbar'
import { PayloadBox } from '../components/body/payload'
import Head from 'next/head'
import Footer from '../components/footer/footer'
import { GlobalMode } from '../components/body/dropdown'

const Home: NextPage = () => {
  var mode = GlobalMode().mode
  return (
    <div className="h-screen">
      <Head>
        <title>{`decode.antibot.to | Px`}</title>
      </Head>
      <Navbar></Navbar>

      <div className=" flex-g container mx-auto  h-5/6 ">
        <div className="mb-4 text-center text-3xl text-white">
          {`PerimeterX Payload ${mode ? 'Deocde' : 'Encode'}`}
        </div>

        <div className=" h-full rounded-lg border bg-customColour p-6 shadow-md ">
          <PayloadBox trigger={mode}></PayloadBox>
        </div>
      </div>
      <div className="mt-10">
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Home
