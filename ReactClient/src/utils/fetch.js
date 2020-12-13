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

    const contentTypes = res.headers.get('Content-Type')

    const resData =
      contentTypes && contentTypes.includes('application/json')
        ? res.json()
        : res.text()

    if (!res.ok) {
      const errorData = await resData
      throw new Error(errorData)
    }

    return resData
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

    const contentTypes = res.headers.get('Content-Type')

    const isDataIsJSON =
      contentTypes && contentTypes.includes('application/json')

    const resData = isDataIsJSON ? res.json() : res.text()

    if (!res.ok) {
      const errorData = await resData

      const errors = isDataIsJSON ? JSON.stringify(errorData) : errorData

      throw new Error(errors)
    }

    return resData
  } catch (err) {
    throw new Error(err.message)
  }
}
