import { recaptchaPayload } from '../../../interface/api/monitor'
import { client } from '../utils/redis'
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { captcha, site } = req.body

  //Filtering out if the site body or captcha body is empty.
  if (captcha == undefined || captcha == '')
    return res.status(400).json({ sucess: false, message: 'Invalid captcha' })
  if (site == undefined || site == '')
    return res.status(400).json({ sucess: false, message: 'Empty site Body' })

  const recaptchaBody = {
    event: {
      token: captcha,
      siteKey: '6LcX1zAgAAAAAMQaC4uvchrwyWAO7CGSIS0JI0bE',
      expectedAction: 'site',
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

  //If the token is valid, We can be asure its not a spam and add the website to the database.

  const websiteList = await client.get('siteList')

  if (websiteList == null) {
    //If site list does not exist in the database, we will creates a new one with the site and saves it to the database.
    await client.set('siteList', `["${site}"]`)

    return res.status(200).json({ sucess: true, message: 'Site requested!' })
  }
  const parsedWebsiteListList = JSON.parse(websiteList)
  //Checking if the site already list inside the database. If it exist will return,  else it will add the URL to the database.

  var item = 0

  parsedWebsiteListList.forEach((url: String) => {
    if (url == site) {
      //Increment by 1 if we find it in the database
      item++
    }
  })

  //If the number doesnt equal to 0 WE know the url alreayd exist in the database
  if (item != 0)
    return res
      .status(200)
      .json({ sucess: false, message: 'Site already exist!' })

  //Adding the url in the array and saving it

  await parsedWebsiteListList.push(site)
  await client.set('siteList', JSON.stringify(parsedWebsiteListList))
  return res.status(200).json({ sucess: true, message: 'Site requested!' })
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
