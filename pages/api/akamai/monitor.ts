import { NextApiRequest, NextApiResponse } from 'next'

import { sendWebhooks } from './webhook'
import { CronJob } from 'cron'
import { createHash } from 'crypto'
import { client } from '../utils/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const akamaiList = await client.get('akamaiSiteVersion')
    if (akamaiList == null) return res.status(200).json({ data: [] })

    const akamaiSite = Object.keys(JSON.parse(akamaiList))

    var formatedList: { website: string; akamaiSiteVersion: any }[] = []

    akamaiSite.forEach((url) => {
      formatedList.push({
        website: url,
        akamaiSiteVersion: JSON.parse(akamaiList)[url],
      })
    })

    res.status(200).json({ data: formatedList })
  } catch (error) {
    console.log(error)
  }
  // res.status(200).json({ data: })
}

var job = new CronJob(
  '*/5 * * * *',
  async function () {
    await worker()
  },
  null,
  true,
  'America/Los_Angeles'
)

job.start()
const requestHeaders = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-GB,en;q=0.9',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"`,
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': `"Windows"`,
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'cross-site',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36',
}

const worker = async () => {
  const siteList = await client.get('akamaiSite')

  if (siteList == null) {
    return await client.set('akamaiSite', '["https://www.nike.com/"]')
  }
  console.log(siteList)

  JSON.parse(siteList).forEach(async (site: string) => {
    await monitor(site)
  })
}

const monitor = async (url: string) => {
  try {
    // const url = 'https://www.nike.com/'
    //Scrapes for akamai URL from home page
    const akamaiScriptUrl = await fetch(url, {
      headers: requestHeaders,
    }).then(async (response) => {
      //Check if request was successfull or not.
      if (response.status != 200) return 'Failed to get script'

      const responseBody = await response.text()
      //scrapes akamai script via Regex
      const scriptUrl = responseBody.match(
        /type="text\/javascript"  src="\/(.*)"><\/script></m
      )

      if (scriptUrl?.length != 2) return 'Can not find akamai script url'

      return scriptUrl[1]
    })
    const akamaiScript = url + akamaiScriptUrl
    const script = await fetch(akamaiScript, {
      headers: requestHeaders,
    }).then(async (response) => {
      return await response.text()
    })
    //Scrapes a unique identifier of each unqiue script.

    const scriptIdentifier = script.match(/\(function\(\){var (.*?);if/m)

    if (scriptIdentifier?.length != 2)
      return 'Can not find akamai script identifier'

    //Turns a identifier into a hash as it will be easier to compare.
    const checkSum = createHash('md5').update(scriptIdentifier[1]).digest('hex')

    const findSite = await client.get('akamaiSiteVersion')
    //Gets time right now in unix
    var nowTime = new Date().getTime()

    await checkVersion({
      identifier: scriptIdentifier[1],
      checkSum: checkSum,
      time: nowTime,
      site: url,
      downloadUrl: '',
    })

    if (findSite == null) {
      //if URL does NOT exist in the database it creates a new one.
      await client.set(
        'akamaiSiteVersion',
        JSON.stringify({
          [url]: [
            {
              identifier: scriptIdentifier[1],
              checkSum: checkSum,
              time: nowTime,
            },
          ],
        })
      )
      console.log({
        [url]: [
          {
            identifier: scriptIdentifier[1],
            checkSum: checkSum,
            time: nowTime,
          },
        ],
      })

      await sendWebhooks(url, akamaiScript, checkSum, scriptIdentifier[1])
    } else {
      const parsedData = JSON.parse(findSite)
      //Check if the script exist in the database IF it doesnt add it and send a webhook.

      if (!parsedData.hasOwnProperty(url)) {
        parsedData[url] = [
          {
            identifier: scriptIdentifier[1],
            checkSum: checkSum,
            time: nowTime,
          },
        ]
        await await sendWebhooks(
          url,
          akamaiScript,
          checkSum,
          scriptIdentifier[1]
        )
        return await client.set('akamaiSiteVersion', JSON.stringify(parsedData))
      }

      //checks IF the script has changed or not.

      if (parsedData[url][parsedData[url].length - 1].checkSum == checkSum) {
        return
      }

      //IF the script hasnt changed, stores it to the database and send a webhook

      parsedData[url].push({
        identifier: scriptIdentifier[1],
        checkSum: checkSum,
        time: nowTime,
      })

      await client.set('akamaiSiteVersion', JSON.stringify(parsedData))

      await sendWebhooks(url, akamaiScript, checkSum, scriptIdentifier[1])
      return
    }
  } catch (error) {
    console.log(error)
  }
}

interface AkamaiVersion {
  identifier: string
  checkSum: string
  time: number
  site: string
  downloadUrl: string
}

const checkVersion = async (data: AkamaiVersion) => {
  const akamaiVersion = await client.get('akamaiVersion')

  //checks if akamaiVersion exist in the database if not it create it.
  if (akamaiVersion == null) {
    return await client.set('akamaiVersion', JSON.stringify(data))
  }

  const parsedAkamaiVersion = JSON.parse(akamaiVersion)

  //checks if the akamai version exist inside the database or not.
  var dupe: number = 0
  parsedAkamaiVersion.forEach((element: AkamaiVersion) => {
    if (element.checkSum == data.checkSum) {
      dupe++
    }
  })
  //If it exist, it will return

  if (dupe != 0) {
    return
  }
  //Pushes the item into the array
  parsedAkamaiVersion.push(data)
  //update it inside the database
  return await client.set('akamaiVersion', JSON.stringify(parsedAkamaiVersion))
}
