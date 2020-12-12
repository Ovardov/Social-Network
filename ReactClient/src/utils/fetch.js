import { baseUrl } from './config'

export const get = async (path, headers, params) => {
  const url = baseUrl + path

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
      },
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const contentTypes = res.headers.get('Content-Type')

    return contentTypes && contentTypes.includes('application/json')
      ? res.json()
      : res.text()
  } catch (err) {
    throw new Error(err.message)
  }
}

export const post = async (path, data, headers) => {
  const url = baseUrl + path

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const contentTypes = res.headers.get('Content-Type')

    return contentTypes && contentTypes.includes('application/json')
      ? res.json()
      : res.text()
  } catch (err) {
    throw new Error(err.message)
  }
}
