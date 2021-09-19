import { baseUrl } from './config';
import { HttpMethods } from './enums';

export const makeRequest = async (url: string, method: HttpMethods, data: Object | FormData | null, headers?: Headers) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const body = data instanceof FormData
        ? data
        : data ? JSON.stringify(data) : null;

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

export const get = (path: string, headers?: Headers) => {
  const url = baseUrl + path;

  return makeRequest(url, HttpMethods.GET, null, headers);
};

export const post = (path: string, data: Object, headers?: Headers) => {
  const url = baseUrl + path;

  const allHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  return makeRequest(url, HttpMethods.POST, data, allHeaders);
};

export const makeRequestWithFormData = (path: string, formData: FormData, method: HttpMethods, headers?: Headers) => {
  const url = baseUrl + path;

  return makeRequest(url, method, formData, headers);
};

export const put = (path: string, data?: Object, headers?: Headers) => {
  const url = baseUrl + path;

  const allHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  return makeRequest(url, HttpMethods.PUT, data, allHeaders);
};

export const deleteRequest = (path: string, headers?: Headers) => {
  const url = baseUrl + path;

  return makeRequest(url, HttpMethods.DELETE, null, headers);
};

