import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse,
} from "@material-ui/core";
import TextField from "../../components/inputFields/TextField";
import SelectField from "../../components/inputFields/SelectField";
import DropzoneArea from "../../components/inputFields/DropZone";
import Button from "../../components/Button";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { useFormStyles, useForm } from "../../utils/FormUtil";
import { getData } from "../../utils/CRUDUtil";

export default function QuoteFormPage({ addOrEdit, defaultValues }) {
  const editMode = defaultValues !== undefined;

  const classes = useFormStyles();

  const initialFormValues = {
    prospect: editMode ? defaultValues.prospect ? defaultValues.prospect._id : "" : "",
    user: editMode ? (defaultValues.user ? defaultValues.user._id : "") : "",
    amountQuoted: editMode ? defaultValues.amountQuoted : 0
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const [errorOpen, setErrorOpen] = useState(false);

  const [prospectsChoices, setProspectsChoices] = useState([]);
  const [usersChoices, setUsersChoices] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData("/prospects").then((data) => {
      if (mounted) {
        if (data === null) return alert("Err");
        data = data.map((prospect) => ({ value: prospect._id, label: prospect.prospectName }));
        data.push({ value: '', label: 'No Prospect'})
        setProspectsChoices(data);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    getData("/users").then((data) => {
      if (mounted) {
        if (data === null) return alert("Err");
        data = data.map((user) => ({
            value: user._id,
            label: `${user.name.firstName}${user.name.lastName ? "." + user.name.lastName.substring(0, 1) : ""} - ${user.NIK}`,
        }));
        data.push({ value: '', label: 'No User'})
        setUsersChoices(data);
      }
    });
    return () => (mounted = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('prospect', formValues.prospect);
    formData.append('user', formValues.user);
    formData.append('amountQuoted', formValues.amountQuoted);
    files.forEach(file => {
      formData.append('files', file)
    })
    const response = await addOrEdit(formData, defaultValues, editMode);
    if (response === null) {
      setErrorOpen(true);
    } else {
      setErrorOpen(false);
    }
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  const handleFileChange = (files) => {
    let newFile = [];
    files.forEach((f) => newFile.push(f))
    setFiles(newFile);
  }

  const handleInputFileChange = (e) => {
    setFiles(e.target.files);
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Collapse in={errorOpen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleErrorAlertClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="error"
          >
            Data Invalid!
          </Alert>
        </Collapse>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <SelectField
                required={true}
                label="Prospect"
                name="prospect"
                defaultValue={formValues.prospect}
                onChange={handleInputChange}
                items={prospectsChoices}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <SelectField
                required={true}
                label="User"
                name="user"
                defaultValue={formValues.user}
                onChange={handleInputChange}
                items={usersChoices}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required={true}
                label="Amount Quoted"
                name="amountQuoted"
                type="Number"
                defaultValue={editMode ? defaultValues.amountQuoted : 0}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <DropzoneArea
                name="files"
                acceptedFiles={["image/jpeg", "image/png", "image/bmp", "application/pdf"]}
                filesLimit={3}
                maxFileSize={5000000}
                onChange={handleFileChange}
              />
            </Grid>
            <input 
              type="file" 
              multiple
              onChange={handleInputFileChange}
            />
          </Grid>
          <Button text="Submit" type="submit" className={classes.submit} />
        </form>
      </div>
    </Container>
  );
}
