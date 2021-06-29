import fetch from 'node-fetch'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const baseUrl = process.env.BASE_URL
    const finalUrl = baseUrl + '/post'

    const postDataRes = await fetch(finalUrl, {
      method: 'GET',
      headers: { 'cookie': req?.headers?.cookie || '' },
    });

    if (!postDataRes.ok) {
      next();
      return;
    }

    const posts = await postDataRes.json()
    req.posts = posts
    next()
  } catch (e) {
    console.error('Error while fetch posts', e)
    next(e)
  }
}
