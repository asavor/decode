import type { NextPage } from 'next'
import Navbar from '../components/header/navbar'
import { PayloadBox } from '../components/body/payload'
import Head from 'next/head'
import Footer from '../components/footer/footer'
import { useState } from 'react'

const Home: NextPage = () => {
  const [decode, setDecode] = useState(1)
  return (
    <div className="h-screen">
      <Head>
        <title>{`decode.antibot.to | Px`}</title>
      </Head>
      <Navbar></Navbar>
      <div className=" flex-g container mx-auto  h-5/6 ">
        <div className="mb-4 text-center text-3xl text-white">
          {`PerimeterX Payload ${decode ? 'Decode' : 'Encode'}`}
        </div>
        <div className=" h-full rounded-lg border bg-customColour p-6 shadow-md ">
          <PayloadBox mode={decode} setDecode={setDecode}></PayloadBox>
        </div>
      </div>
      <div className="mt-10">
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Home
