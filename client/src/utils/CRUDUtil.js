import { logout } from "./DashboardUtil";

const handleForbiddenStatus = (response) => {
  alert("Your token expired, please re-login");
  logout();
  return response
}

export const getData = (endpoint) => {
  return fetch(endpoint)
    .then((response) => response.status === 403 ? handleForbiddenStatus(response) : response)
    .then(response => response.status < 400 ? response.json() : null)
    .catch((err) => console.log(err));
};

export const postData = async (endpoint, formData) => {
  const instanceOfFormData = formData instanceof FormData;
  const options = {
    method: "POST",
    headers: instanceOfFormData ? {} : {"Content-Type": "application/json"},
    body: instanceOfFormData ? formData : JSON.stringify(formData),
  };
  return fetch(endpoint, options)
          .then((response) => response.status === 403 ? handleForbiddenStatus(response) : response)
          .then(response => response.status < 400 ? response.json() : null)
          .catch(err => console.log(err));
};

export const putData = async (endpoint, formData) => {
  const instanceOfFormData = formData instanceof FormData;
  const options = {
    method: "PUT",
    headers: instanceOfFormData ? {} :{"Content-Type": "application/json"},
    body: instanceOfFormData ? formData : JSON.stringify(formData),
  };
  return fetch(endpoint, options)
          .then((response) => response.status === 403 ? handleForbiddenStatus(response) : response)
          .then(response => response.status < 400 ? response.json() : null)
          .catch(err => console.log(err));
};

export const deleteData = async (endpoint) => {
  const options = {
    method: "DELETE",
  };
  return fetch(endpoint, options)
    .then((response) => response.status === 403 ? handleForbiddenStatus(response) : response)
    .then(response=> response.status < 400 ? response : null)
    .catch(err => console.log(err));
};
