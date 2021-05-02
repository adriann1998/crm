import { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
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
    margin: theme.spacing(0),
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
    margin: theme.spacing(3, 0, 1, 0),
    width: "100%",
  },
}));
