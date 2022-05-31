import { client } from '../utils/redis'

import { recaptchaPayload } from '../../../interface/api/monitor'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { captcha, webhook } = req.body

  //Filtering out if the webhook body or captcha body is empty.
  if (captcha == undefined || captcha == '')
    return res.status(400).json({ sucess: false, message: 'Invalid captcha' })
  if (webhook == undefined || webhook == '')
    return res
      .status(400)
      .json({ sucess: false, message: 'Empty Discord Webhook Body' })

  const recaptchaBody = {
    event: {
      token: captcha,
      siteKey: '6LcX1zAgAAAAAMQaC4uvchrwyWAO7CGSIS0JI0bE',
      expectedAction: 'discord',
    },
  }
  //Send the formated payload to our function that fetches google recaptcha enterprise api to get info of the token provided.

  const tokenResult = await checkRecaptcha(recaptchaBody)

  //Checks if token exist in request if not response with invalid token.
  //Checks if token is valid if not else response with invalid token.
  if (
    tokenResult.event.token != captcha ||
    tokenResult.tokenProperties.valid == false
  ) {
    return res.status(400).json({ sucess: false, message: 'Invalid captcha' })
  }

  //Checks if the users score is over 0.7 if response with Invalid token.
  //The error message is always "invalid captcha" as i do not want to give the attacker any infomation.
  if (0.7 >= tokenResult.riskAnalysis.score) {
    return res.status(400).json({ sucess: false, message: 'Invalid captcha' })
  }

  //If the token is valid, We can be asure its not a spam and add the webhook url to the database.

  const discordWebhookList = await client.get('discordWebhook')

  if (discordWebhookList == null) {
    //If discord webhook list does not exist in the database, we will creates a new one with the webhook and saves it to the database.
    await client.set('discordWebhook', `["${webhook}"]`)

    return res
      .status(200)
      .json({ sucess: true, message: 'Discord webhook added!' })
  }
  const parsedDiscordWebhookList = JSON.parse(discordWebhookList)
  //Checking if the discord webhook already list inside the database. If it exist will return,  else it will add the URL to the database.

  var item = 0

  parsedDiscordWebhookList.forEach((url: String) => {
    if (url == webhook) {
      //Increment by 1 if we find it in the database
      item++
    }
  })

  //If the number doesnt equal to 0 WE know the url alreayd exist in the database
  if (item != 0)
    return res
      .status(200)
      .json({ sucess: false, message: 'Discord webhook already exist!' })
  //To check if the discord URL is valid or not we will make an API request to discord to check.
  const validurl = await sendTestWebhook(webhook)

  if (validurl === 'error')
    return res
      .status(200)
      .json({ sucess: false, message: 'Invalid discord webhook' })

  //Adding the url in the array and saving it

  await parsedDiscordWebhookList.push(webhook)
  await client.set('discordWebhook', JSON.stringify(parsedDiscordWebhookList))
  return res
    .status(200)
    .json({ sucess: true, message: 'Discord webhook added!' })
}

const checkRecaptcha = async (token: recaptchaPayload) => {
  return await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.projectName}/assessments?key=${process.env.googleApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token),
    }
  )
    .then((response) => {
      return response.json()
    })
    .catch((Error) => {
      console.log(Error)
    })
}

const sendTestWebhook = async (url: string) => {
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

    const request = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhook),
    }).then((response) => {
      if (response.status == 204) {
        return 'sucess'
      } else {
        return 'error'
      }
    })
    return request
  } catch (error) {
    return 'error'
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

    var discordWebHooksList = await client.get('discordWebhook')
    //Checks if discordWebhooks urls exist in our database IF NOT, it creates it then re runs the functions.
    if (discordWebHooksList == null)
      return adddiscordWebHooksList().then(
        await sendWebhooks(url, scriptURL, checkSum, identifier)
      )

    await JSON.parse(discordWebHooksList).forEach(async (element: string) => {
      await fetch(element, {
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

const adddiscordWebHooksList = async () => {
  await client.set('discordWebhook', '[]')
}

export { sendWebhooks }
