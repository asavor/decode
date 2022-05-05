import type { NextPage } from 'next'
import Navbar from '../components/header/navbar'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <html className="bg-darkcustomColour"></html>
      <Head>
        <title>{`decode.antibot.to| Akamai`}</title>
      </Head>
      <Navbar></Navbar>
      <hr className="mb-10" />
      <div className=" text-center  text-5xl text-white">WIP...</div>
    </div>
  )
}

export default Home
