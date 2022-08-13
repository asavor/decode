import { client } from '../../utils/redis'
import { checkRecaptcha } from './utils/recaptcha'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { captcha, webhook } = req.body

  //Filtering out if the webhook body or captcha body is empty.
  if (captcha == undefined || captcha == '')
    return res.status(400).json({ success: false, message: 'Invalid captcha' })
  if (webhook == undefined || webhook == '')
    return res
      .status(400)
      .json({ success: false, message: 'Empty Discord Webhook Body' })

  const recaptchaBody = {
    event: {
      token: captcha,
      siteKey: '6LcX1zAgAAAAAMQaC4uvchrwyWAO7CGSIS0JI0bE',
      expectedAction: 'discord',
    },
  }
  //Send the formatted payload to our function that fetches google ReCaptcha enterprise API to get info of the token provided.

  const tokenResult = await checkRecaptcha(recaptchaBody)

  //Checks if the token exists in the request if not respond with an invalid token.
  //Checks if the token is valid if not else respond with an invalid token.
  if (
    tokenResult.event.token != captcha ||
    !tokenResult.tokenProperties.valid
  ) {
    return res.status(400).json({ success: false, message: 'Invalid captcha' })
  }

  //Checks if the user's score is over 0.7 and if it responds with an Invalid token.
  //The error message is always "invalid captcha" as I do not want to give the attacker any information.
  if (0.7 >= tokenResult.riskAnalysis.score) {
    return res.status(400).json({ success: false, message: 'Invalid captcha' })
  }

  //If the token is valid, We can be assured it's not spam and add the webhook URL to the database.

  const discordWebhookList = await client.get('discordWebhook')

  if (discordWebhookList == null) {
    //If the discord webhook list does not exist in the database, we will create a new one with the webhook and saves it to the database.
    await client.set('discordWebhook', `["${webhook}"]`)

    return res
      .status(200)
      .json({ success: true, message: 'Discord webhook added!' })
  }
  const parsedDiscordWebhookList = JSON.parse(discordWebhookList)
  //Checking if the discord webhook already exists inside the database. If it exists will return, else it will add the URL to the database.

  let item = 0

  parsedDiscordWebhookList.forEach((url: String) => {
    if (url == webhook) {
      //Increment by 1 if we find it in the database
      item++
    }
  })

  //If the number doesn't equal 0, WE know the URL already exists in the database

  if (item != 0)
    return res
      .status(200)
      .json({ success: false, message: 'Discord webhook already exist!' })
  // We ping the url to check if the discord URL is valid.
  const validURL = await sendTestWebhook(webhook)

  if (!validURL)
    return res
      .status(200)
      .json({ success: false, message: 'Invalid discord webhook' })

  //Adding the url in the array and saving it

  await parsedDiscordWebhookList.push(webhook)
  await client.set('discordWebhook', JSON.stringify(parsedDiscordWebhookList))
  return res
    .status(200)
    .json({ success: true, message: 'Discord webhook added!' })
}

const sendTestWebhook = async (url: string): Promise<boolean> => {
  try {
    const webhook = {
      embeds: [
        {
          color: 3066993,
          title: 'Akamai Script Tracker',
          description: 'Successfully added!',

          timestamp: new Date(),
          footer: {
            text: 'github.com/asavor',
            icon_url: 'https://avatars.githubusercontent.com/u/74147411?v=4',
          },
        },
      ],
    }

    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhook),
    }).then((response) => {
      if (response.status == 204) {
        return true
      } else {
        return false
      }
    })
  } catch (error) {
    return false
  }
}

const sendWebhooks = async (
  url: string,
  scriptURL: string,
  checkSum: string,
  identifier: string
): Promise<any> => {
  try {
    const webhook = {
      embeds: [
        {
          color: 3066993,
          title: 'Akamai Script Tracker',
          fields: [
            {
              name: 'Site',
              value: url,
            },
            {
              name: 'Script URL',
              value: scriptURL,
            },
            {
              name: 'Script MD5 Checksum',
              value: checkSum,
            },
            {
              name: 'Script Identifier',
              value: identifier,
            },
          ],
          timestamp: new Date(),
          footer: {
            text: 'github.com/asavor',
            icon_url: 'https://avatars.githubusercontent.com/u/74147411?v=4',
          },
        },
      ],
    }

    let discordWebHooksList = await client.get('discordWebhook')
    //Checks if discordWebhooks URLs exist in our database IF NOT, it creates it and then re-runs the functions.
    if (discordWebHooksList == null)
      return addDiscordWebHooksList().then(
        await sendWebhooks(url, scriptURL, checkSum, identifier)
      )

    await JSON.parse(discordWebHooksList).forEach((element: string) => {
      fetch(element, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhook),
      })
    })

    return
  } catch (error) {
    return
  }
}

const addDiscordWebHooksList = async () => {
  await client.set('discordWebhook', '[]')
}

export { sendWebhooks }
