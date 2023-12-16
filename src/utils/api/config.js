import axios from 'axios';
const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'Authorization',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  mode: 'no-cors',
  credentials: true,
  crossdomain: true,
});

Api.interceptors.request.use(
  (config) => {
    const LocalDataVuex = JSON.parse(
      window.localStorage.getItem('accessToken')
    );
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${(LocalDataVuex) ||''}`,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function ApiGetRequest(url, data = {}) {
    return Api.get(url, {
        params: data
    })
    .then((response) => response)
    .then((responseJson) => {
        return responseJson
    })
    .catch((error) => {
        return {
            error:
                (error.response && error.response.data.error
                    ? error.response.data.error
                    : error.response.data.message) || error,
            errorList: 
                error.response && error.response.data && error.response.data.error
        }
    })
}

export function ApiPostMultipart(url, data = {}) {
    return Api.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return {
          error:
            (error.response && error.response.data.error
              ? error.response.data.error
              : error.response.data.message) || error,
          errorList:
            error.response && error.response.data && error.response.data.errors,
        };
      });
}

export function ApiGetUploadFile(url, data = {}, callbackUpload = () => {}) {
    return Api.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => callbackUpload(event),
    })
      .then((response) => response)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return {
          error:
            (error.response && error.response.data.error
              ? error.response.data.error
              : error.response.data.message) || error,
          errorList:
            error.response && error.response.data && error.response.data.errors,
        };
      });
}
  
export const ApiPostRequest = (url, data = {}) => {
    return Api.post(url, data)
      .then((response) => response)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return {
          error:
            (error.response && error.response.data.error
              ? error.response.data.error
              : error.response.data.message) || error,
          errorList:
            error.response && error.response.data && error.response.data.errors,
        };
      });
};
  
export const ApiPutRequest = (url, data = {}) => {
    return Api.put(url, data)
      .then((response) => response)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return {
          error:
            (error.response && error.response.data.error
              ? error.response.data.error
              : error.response.data.message) || error,
          errorList:
            error.response && error.response.data && error.response.data.errors,
        };
      });
};
  
export const ApiDeleteRequest = (url, data = {}) => {
    return Api.delete(url, data)
      .then((response) => response)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return {
          error:
            (error.response && error.response.data.error
              ? error.response.data.error
              : error.response.data.message) || error,
          errorList:
            error.response && error.response.data && error.response.data.errors,
        };
      });
};

const exportedObject = {
    Api
}

export default exportedObject

