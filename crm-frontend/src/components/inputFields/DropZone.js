import React from "react";
import { DropzoneArea as MuiDropzoneArea } from "material-ui-dropzone";

export default function DropZone({ name, acceptedFiles, filesLimit, onChange, maxFileSize, ...other }) {

  const convertToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiDropzoneArea
      name={name}
      showPreviews
      showFileNamesInPreview
      showPreviewsInDropzone={false}
      acceptedFiles={acceptedFiles}
      filesLimit={filesLimit}
      maxFileSize={maxFileSize}
      onChange={(files) => onChange(convertToDefaultEventPara(name, files))}
      {...other}
    />
  );
}
