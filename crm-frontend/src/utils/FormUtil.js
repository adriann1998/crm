import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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

export function useForm(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return { formValues, handleInputChange };
}


export const useFormStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3,0,1,0),
    width: "100%"
  }
}));
