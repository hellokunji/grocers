import axios from 'axios';

export function getMethod(location) {
  return axios
    .get(`${location}`)
    .then((response) => {
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
      return error;
    });
}

export function postMethod(location, body, headers = null) {
  return axios
    .post(`${location}`, body, headers)
    .then((response) => {
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
    });
}

export function putMethod(location, body) {
  //console.log('api', body);
  return axios
    .put(`${location}`, body)
    .then((response) => {
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
    });
}

export function deleteMethod(location) {
  return axios
    .delete(`${location}`)
    .then((response) => {
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
      return error;
    });
}
