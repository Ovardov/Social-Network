import { BodyInit } from 'node-fetch';
import { baseUrl } from './config';
import { HttpMethods } from './enums';

type test = {
  [key: string]: string
}

export const makeRequest = async (url: string, method: HttpMethods, data: Object | FormData | null, headers?: Headers) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const body = data ? JSON.stringify(data) : null;

      const res = await fetch(url, {
        method,
        ...(body ? { body, } : null),
        headers,
        credentials: 'include',
      });

      const contentTypes = res.headers.get('Content-Type');

      const isDataIsJSON =
        contentTypes && contentTypes.includes('application/json');

      const resData = isDataIsJSON ? res.json() : res.text();

      if (!res.ok) {
        const errorData = await resData;

        const errors = isDataIsJSON ? JSON.stringify(errorData) : errorData;

        return reject(errors);
      }

      resolve(resData);
    } catch (err) {
      reject(err);
    }
  });
};

export const get = async (path: string, headers?: Headers) => {
  const url = baseUrl + path;

  try {
    const resData = await makeRequest(url, HttpMethods.GET, null, headers);

    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const post = async (path: string, data: Object, headers?: Headers) => {
  try {
    const url = baseUrl + path;

    const allHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const resData = await makeRequest(url, HttpMethods.POST, data, allHeaders);

    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postFormData = async (path: string, formData: FormData, headers?: Headers) => {
  try {
    const url = baseUrl + path;
    const resData = await makeRequest(url, HttpMethods.POST, formData, headers);

    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const put = async (path: string, data?: Object, headers?: Headers) => {
  try {
    const url = baseUrl + path;

    const allHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const resData = await makeRequest(url, HttpMethods.PUT, data, allHeaders);

    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteRequest = async (path: string, headers?: Headers) => {
  try {
    const url = baseUrl + path;

    const resData = await makeRequest(url, HttpMethods.DELETE, null, headers);

    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
};

