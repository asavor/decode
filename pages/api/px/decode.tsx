import { NextRequest, NextResponse } from '../../../interface/api/px'
import deobfuscate from '../../../module/px/decode'

export default async function handler(req: NextRequest, res: NextResponse) {
  try {
    //accepts ONLY post request
    if (req.method === 'POST') {
      var { payload, uuid, sts } = req.body
      //Checks if sts is included, however sts is not needed right now...
      if (sts == undefined || sts.length == 0) {
        sts = ''
      }
      //Async call, as we need to wait for the functions to finish before sending the payload
      const value = await deobfuscate(payload, uuid, sts)
      res.status(200).json({ decodedPayload: JSON.parse(value), uuid: uuid })
    }
  } catch (error) {
    res.status(400).json({ error: 'error while decoding payload' })
  }
}
