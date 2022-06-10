import { NextApiRequest, NextApiResponse } from 'next'
import { worker } from './monitor'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers

      if (authorization === `Bearer ${process.env.taskAuth}`) {
        await worker()
        res.status(200).json({ success: true, message: 'task ran.' })
      } else {
        res.status(401).json({ success: false, message: 'invalid key' })
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: 'server error' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
