import { NextApiRequest, NextApiResponse } from 'next'
import deobfuscate from '../../../module/px/decode'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Accepts ONLY post request
  if (req.method != 'POST')
    return res.status(404).json({ success: false, message: 'path not found' })
  try {
    let { payload, uuid, sts } = req.body

    //Checks if sts is included however, sts is not needed right now...
    if (sts == undefined || sts.length == 0) {
      sts = ''
    }

    //Async call, as we need to wait for the functions to finish before sending the payload
    const value = deobfuscate(payload, uuid, sts)

    return res
      .status(200)
      .json({ decodedPayload: JSON.parse(value), uuid: uuid })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'error while decoding payload' })
  }
}
