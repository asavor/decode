import { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../utils/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const akamaiList = await client.get('akamaiVersion')
    if (akamaiList == null) return res.status(200).json({ data: [] })

    const akamaiSite = JSON.parse(akamaiList)

    res.status(200).json({ data: akamaiSite })
  } catch (error) {
    console.log(error)
  }
}
