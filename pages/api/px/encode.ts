import { NextApiRequest, NextApiResponse } from 'next'
import obfuscatePayload from '../../../module/px/encode'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Accepts ONLY post request

  if (req.method != 'POST')
    return res.status(404).json({ success: false, message: 'path not found' })

  try {
    var { payload, uuid, sts } = req.body
    //Checks if sts is included, however sts is not needed right now...
    if (sts == undefined || sts.length == 0) {
      sts = ''
    }
    //Async call, as we need to wait for the functions to finish before sending the payload

    //Decode the base 64 input

    const base64Deocde = Buffer.from(payload, 'base64').toString()

    const jsonPayload = JSON.stringify(JSON.parse(base64Deocde))
    const value = await obfuscatePayload(jsonPayload, uuid, sts)

    return res.status(200).json({ encodedPayload: value, uuid: uuid })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'error while encoding payload' })
  }
}
