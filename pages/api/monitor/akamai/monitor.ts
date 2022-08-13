import { NextApiRequest, NextApiResponse } from 'next'
import { sendWebhooks } from './webhook'
import { createHash } from 'crypto'
import { client } from '../../utils/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const akamaiList = await client.get('akamaiSiteVersion')
    if (akamaiList == null) return res.status(200).json({ data: [] })

    const akamaiSite = Object.keys(JSON.parse(akamaiList))

    let formattedList: { website: string; akamaiSiteVersion: any }[] = []

    akamaiSite.forEach((url) => {
      formattedList.push({
        website: url,
        akamaiSiteVersion: JSON.parse(akamaiList)[url],
      })
    })

    res.status(200).json({ data: formattedList })
  } catch (error) {
    console.log(error)
  }
  // res.status(200).json({ data: })
}

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

  JSON.parse(siteList).forEach((site: string) => {
    monitor(site)
  })
}

/**
 * Checks what version the website is using.
 * @param {string} url Website protected by akamai
 * @returns {Promise<string | null>}
 */
const monitor = async (url: string) => {
  try {
    // const url = 'https://www.nike.com/'
    //Scrapes for Akamai URL from the home page
    const akamaiScriptUrl = await fetch(url, {
      headers: requestHeaders,
    }).then(async (response) => {
      //Check if request was successfully or not.
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
    //Scrapes a unique identifier of each unique script.

    const scriptIdentifier = script.match(/\(function\(\){var (.*?);if/m)

    if (scriptIdentifier?.length != 2)
      return 'Can not find akamai script identifier'

    //Turns an identifier into a hash as it will be easier to compare.

    const checkSum = createHash('md5').update(scriptIdentifier[1]).digest('hex')

    const findSite = await client.get('akamaiSiteVersion')
    //Gets time right now in unix
    let nowTime = new Date().getTime()

    await checkVersion({
      identifier: scriptIdentifier[1],
      checkSum: checkSum,
      time: nowTime,
      site: url,
      downloadUrl: '',
    })

    if (findSite == null) {
      //Add the URL inside the database if it does not exist already.
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

      await sendWebhooks(url, akamaiScript, checkSum, scriptIdentifier[1])
    } else {
      const parsedData = JSON.parse(findSite)

      //Check if the script exists in the database IF it doesn't add it and send a webhook.
      if (!parsedData.hasOwnProperty(url)) {
        parsedData[url] = [
          {
            identifier: scriptIdentifier[1],
            checkSum: checkSum,
            time: nowTime,
          },
        ]
        await sendWebhooks(url, akamaiScript, checkSum, scriptIdentifier[1])
        return await client.set('akamaiSiteVersion', JSON.stringify(parsedData))
      }

      //checks IF the script has changed or not.
      if (parsedData[url][parsedData[url].length - 1].checkSum == checkSum) {
        return
      }

      //IF the script has not changed, store it in the database and send a webhook
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

/**
 * Checks if the akamai Version exist in the database if not it creates it.
 * @param {AkamaiVersion} data
 * @returns {Promise<void>}
 */
const checkVersion = async (data: AkamaiVersion): Promise<void> => {
  const akamaiVersion = await client.get('akamaiVersion')

  //Creating akamaiVersion inside Redis if the table doesn't exist.
  if (akamaiVersion == null) {
    await client.set('akamaiVersion', JSON.stringify(data))
    return
  }

  const parsedAkamaiVersion = JSON.parse(akamaiVersion)

  //Checks if the akamai version exists inside the database or not.
  let dupe: number = 0
  parsedAkamaiVersion.forEach((element: AkamaiVersion) => {
    if (element.checkSum == data.checkSum) {
      dupe++
    }
  })
  //If it exists, it will return

  if (dupe != 0) {
    return
  }
  //Pushes the item into the array
  parsedAkamaiVersion.push(data)
  //update it inside the database
  await client.set('akamaiVersion', JSON.stringify(parsedAkamaiVersion))
  return
}

export { worker }
