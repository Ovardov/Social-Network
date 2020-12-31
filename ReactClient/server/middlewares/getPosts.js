import fetch from 'node-fetch'

export default async (req, res, next) => {
  try {
    const baseUrl = process.env.BASE_URL
    const finalUrl = baseUrl + '/post'

    const postDataRes = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        ...req.headers,
      },
      credentials: 'include',
    })

    if (!postDataRes.ok) {
      next()
      return
    }

    const posts = await postDataRes.json()

    req.posts = posts
    next()
  } catch (e) {
    console.error('Error while fetch posts', e)
    next(e)
  }
}
