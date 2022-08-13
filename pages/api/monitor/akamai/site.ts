import { checkRecaptcha } from './utils/recaptcha'
import { client } from '../../utils/redis'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { captcha, site } = req.body

  //Filtering out if the site body or captcha body is empty.
  if (captcha == undefined || captcha == '')
    return res.status(400).json({ success: false, message: 'Invalid captcha' })
  if (site == undefined || site == '')
    return res.status(400).json({ success: false, message: 'Empty site Body' })

  const recaptchaBody = {
    event: {
      token: captcha,
      siteKey: '6LcX1zAgAAAAAMQaC4uvchrwyWAO7CGSIS0JI0bE',
      expectedAction: 'site',
    },
  }
  //Send the formatted payload to our function that fetches google ReCaptcha enterprise API to get info of the token provided.

  const tokenResult = await checkRecaptcha(recaptchaBody)

  if (!tokenResult)
    res.status(400).json({ success: false, message: 'Invalid captcha' })

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

  const websiteList = await client.get('siteList')

  if (websiteList == null) {
    //If site list does not exist in the database, we will creates a new one with the site and saves it to the database.
    await client.set('siteList', `["${site}"]`)

    return res.status(200).json({ success: true, message: 'Site requested!' })
  }
  const parsedWebsiteListList = JSON.parse(websiteList)
  //Checking if the site already list inside the database. If it exist will return,  else it will add the URL to the database.

  let item = 0

  parsedWebsiteListList.forEach((url: String) => {
    if (url == site) {
      //Increment by 1 if we find it in the database
      item++
    }
  })

  //If the number doesn't equal 0, WE know the URL already exist in the database

  if (item != 0)
    return res
      .status(200)
      .json({ success: false, message: 'Site already exist!' })

  //Adding the url in the array and saving it

  await parsedWebsiteListList.push(site)
  await client.set('siteList', JSON.stringify(parsedWebsiteListList))
  return res.status(200).json({ success: true, message: 'Site requested!' })
}
