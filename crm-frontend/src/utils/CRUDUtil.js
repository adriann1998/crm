export const getData = (uri) => {
  return fetch(uri)
    .then((response) => (response.status < 400 ? response.json() : null))
    .catch((err) => console.log(err));
};

export const postData = async (endpoint, formData) => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => (response.status < 400 ? response.json() : null))
    .catch((err) => console.log(err));
};

export const putData = async (endpoint, formData) => {
  return fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => (response.status < 400 ? response.json() : null))
    .catch((err) => console.log(err));
};

export const deleteData = async (endpoint) => {
  return fetch(endpoint, {
    method: "DELETE",
  })
    .then((response) => (response.status < 400 ? response : null))
    .catch((err) => console.log(err));
};
