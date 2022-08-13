import Navbar from '../../components/header/navbar'
import DiscordWebHookInput from '../../components/monitor/webhookInput'
import SiteInput from '../../components/monitor/siteRequest'
import SiteList from '../../components/monitor/table'
import AkamaiVersion from '../../components/monitor/akamaiVersion'

import { useState, useEffect } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export interface siteList {
  akamaiSite: any
  akamaiVersion: any
}

export async function getServerSideProps() {
  const akamaiSiteList = await fetch(
    `${process.env.host}/api/monitor/akamai/monitor`
  )
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(akamaiSiteList)
  const akamaiSite = akamaiSiteList.datakey

  const akamaiVersionList = await fetch(
    `${process.env.host}/api/monitor/akamai/version`
  )
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
  const akamaiVersion = akamaiVersionList.data.reverse()

  return {
    props: { akamaiSite, akamaiVersion },
  }
}

const akamaiMonitor = ({ akamaiSite, akamaiVersion }: siteList) => {
  const [website, setWebsite] = useState([])
  const [version, setVersion] = useState([])

  useEffect(() => {
    if (akamaiSite.length == 0) {
      setWebsite(() => [])
    } else {
      setWebsite(() => akamaiSite)
    }
  }, [akamaiSite])

  useEffect(() => {
    if (akamaiVersion.length == 0) {
      setVersion(() => [])
    } else {
      setVersion(() => akamaiVersion)
    }
  }, [akamaiVersion])

  return (
    <div className="flex h-screen flex-col">
      <Navbar></Navbar>
      <hr />
      <ToastContainer />
      <div className=" container mx-auto  flex-grow">
        <div className="mb-4 mt-5 text-center text-3xl text-white">
          Akamai Script Version Monitor
        </div>
        <div className="gap-42 grid grid-flow-col grid-rows-2">
          <SiteList list={website}></SiteList>

          <AkamaiVersion list={version}></AkamaiVersion>
        </div>
      </div>

      <div className="flex justify-center ">
        <a className="text-xl text-white" href="https://github.com/asavor">
          github.com/asavor
        </a>
        <DiscordWebHookInput
          buttonText={'receive notification?'}
        ></DiscordWebHookInput>
        <SiteInput buttonText={'request site?'}></SiteInput>
      </div>
    </div>
  )
}

export default akamaiMonitor
