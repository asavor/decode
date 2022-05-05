import type { NextPage } from 'next'
import Navbar from '../components/header/navbar'
import Head from 'next/head'
import Footer from '../components/footer/footer'

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <html className="bg-darkcustomColour"></html>
      <Head>
        <title>{'deocde.antibot.io'}</title>
      </Head>
      <Navbar></Navbar>
      <hr className="mb-10" />
      <div className=" text-center  text-5xl text-white">WIP...</div>
      <Footer></Footer>
    </div>
  )
}

export default Home
