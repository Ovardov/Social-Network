import fetch from 'node-fetch'

export default async (req, res, next) => {
  try {
    const baseUrl = process.env.BASE_URL
    const finalUrl = baseUrl + '/auth'

    const userDataRes = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        ...req.headers,
      },
      credentials: 'include',
    })

    if(!userDataRes.ok) {
      next()
      return;
    }
    
    const userData = await userDataRes.json()

    req.user = userData
    console.log(userData)
    next()
  } catch (e) {
    console.error('Error while authorize user', e)
    next(e)
  }
}
