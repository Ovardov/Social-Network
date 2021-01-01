import { baseUrl } from './config'

export const makeRequest = async (url, method, body, headers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url, {
        method,
        ...(body ? { body } : null),
        headers,
        credentials: 'include',
      })

      const contentTypes = res.headers.get('Content-Type')

      const isDataIsJSON =
        contentTypes && contentTypes.includes('application/json')

      const resData = isDataIsJSON ? res.json() : res.text()

      if (!res.ok) {
        const errorData = await resData

        const errors = isDataIsJSON ? JSON.stringify(errorData) : errorData

        return reject(errors)
      }

      resolve(resData)
    } catch (err) {
      reject(err)
    }
  })
}

export const get = async (path, headers, params) => {
  const url = baseUrl + path

  try {
    const resData = await makeRequest(url, 'GET', {}, headers)

    return resData
  } catch (err) {
    throw new Error(err.message)
  }
}

export const post = async (path, data, headers) => {
  try {
    const url = baseUrl + path

    const allHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    }

    const body = JSON.stringify(data)

    const resData = await makeRequest(url, 'POST', body, allHeaders)

    return resData
  } catch (err) {
    throw new Error(err.message)
  }
}

export const postFormData = async (path, formData, headers) => {
  try {
    const url = baseUrl + path
    const resData = await makeRequest(url, 'POST', formData, headers)

    return resData
  } catch (err) {
    throw new Error(err.message)
  }
}

export const put = async (path, data, headers) => {
  try {
    const url = baseUrl + path

    const allHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    }

    const body = JSON.stringify(data)

    const resData = await makeRequest(url, 'PUT', body, allHeaders)

    return resData
  } catch (err) {
    throw new Error(err.message)
  }
}
