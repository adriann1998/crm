import React, { useState, useEffect, useContext } from "react";
import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse,
  FormHelperText
} from "@material-ui/core";
import TextField from "../inputFields/TextField";
import SelectField from "../inputFields/SelectField";
import DropzoneArea from "../inputFields/DropZone";
import Button from "../Button";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { useFormStyles, useForm } from "../../utils/FormUtil";
import { getData } from "../../utils/CRUDUtil";
import { UserContext } from "../../utils/Context";

const mapToFileObject = async (files) => {
  return Promise.all(files.map(async (f) =>  {
      return f instanceof File ? 
        f :
        fetch(`http://localhost:8080/${f.filePath}`)
          .then(response => response.blob())
          .then(blob => new File([blob], f.fileName, { type: f.fileType }))
          .then(fileObj => fileObj)
    }
  ));
};

export default function QuoteForm( props ) {
  
  const { addOrEdit, defaultValues } = props;
  const { user } = useContext(UserContext);
  
  const editMode = defaultValues !== undefined;

  const classes = useFormStyles();

  const initialFormValues = {
    prospect: editMode ? defaultValues.prospect._id : "",
    amountQuoted: editMode ? defaultValues.amountQuoted : 0,
    files: editMode ? defaultValues.files : []
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const [errorOpen, setErrorOpen] = useState(false);

  const [prospectsChoices, setProspectsChoices] = useState([]);

  useEffect(() => {
    getData("/prospects").then((data) => {
      if (data === null) return alert("Err");
      // const prospectFilter = (prospect) => prospect.prospectHolder._id === user._id;
      data = data.map((prospect) => ({
        value: prospect._id,
        label: prospect.prospectName,
      }));
      setProspectsChoices(data);
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileObjs = await mapToFileObject(formValues.files);
    let formData = new FormData();
    formData.append("prospect", formValues.prospect);
    formData.append("user", formValues.user);
    formData.append("amountQuoted", formValues.amountQuoted);
    fileObjs.forEach((file) => {
      formData.append("files", file);
    });
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

  const getFileURLS = () => initialFormValues.files.map(f => `http://localhost:8080/${f.filePath}`);

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
                acceptedFiles={[
                  "image/jpeg",
                  "image/png",
                  "image/bmp",
                  "application/pdf",
                ]}
                filesLimit={3}
                maxFileSize={5000000}
                initialFiles={getFileURLS()}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button 
            text="Submit" 
            type="submit" 
            className={classes.submit} 
            disabled={editMode}
          />
          <FormHelperText style={{color: 'red'}}>
            {editMode ? `Quotes are view only` : ''}
          </FormHelperText>
        </form>
      </div>
    </Container>
  );
}
