import fetch from 'node-fetch'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const baseUrl = process.env.BASE_URL
    const finalUrl = baseUrl + '/auth'

    const userDataRes = await fetch(finalUrl, {
      method: 'GET',
      headers: { 'cookie': req?.headers?.cookie || '' },
    })

    if (!userDataRes.ok) {
      next()
      return
    }

    const userData = await userDataRes.json()

    req.user = userData
    next()
  } catch (e) {
    console.error('Error while authorize user', e)
    next(e)
  }
}
