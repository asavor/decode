import type { NextPage } from 'next'
import Navbar from '../components/header/navbar'
import { PayloadBox } from '../components/body/payload'
import Head from 'next/head'
import { GlobalMode } from '../components/body/dropdown'

const Home: NextPage = () => {
  var mode = GlobalMode().mode
  return (
    <div className="h-screen">
      <html className="bg-darkcustomColour"></html>
      <Head>
        <title>{`decode.antibot.to| Px`}</title>
      </Head>
      <Navbar></Navbar>
      <hr className="mb-10" />

      <div className=" container mx-auto h-5/6">
        <div className="mb-4 text-center text-3xl text-white">
          {`PerimeterX Payload ${mode ? 'Deocde' : 'Encode'}`}
        </div>

        <div className=" h-full  rounded-lg border bg-customColour p-6 shadow-md ">
          <PayloadBox trigger={mode}></PayloadBox>
        </div>
      </div>
    </div>
  )
}

export default Home
