import React from "react";
import { DropzoneArea as MuiDropzoneArea } from "material-ui-dropzone";

export default function DropZone({ acceptedFiles, filesLimit, maxFileSize, ...other }) {


  return (
    <MuiDropzoneArea
      showPreviews={true}
      showPreviewsInDropzone={false}
      acceptedFiles={acceptedFiles}
      filesLimit={filesLimit}
      maxFileSize={maxFileSize}
      {...other}
    />
  );
}
