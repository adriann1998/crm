import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ActionButton from './ActionButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    }
}));

export default function PopupDialog(props) {

  const { title, children, openPopup, handleClose, maxWidth } = props;

  const classes = useStyles();

  return (
    <Dialog 
      fullWidth
      open={openPopup}
      maxWidth={maxWidth || "md"}
      classes={{paper: classes.dialogWrapper}}
    >
      <DialogTitle>
        <div style={{display: 'flex'}}>
          <Typography variant="h6" component="div" style={{flexGrow: 1}}>
            {title}
          </Typography>
          <ActionButton
            size="small"
            color="secondary"
            onClick={() => handleClose()}
          >
            <CloseIcon/>
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}
