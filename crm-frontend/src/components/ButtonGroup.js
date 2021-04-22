import { ButtonGroup as MuiButtonGroup } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  }
}))

export default function ButtonGroup( props ) {

  const { size, children, variant, color, ...other } = props;

  const classes = useStyles();

  return (
    <MuiButtonGroup
      size={size || "small"}
      variant={variant || "contained"}
      color={color || "primary"}
      aria-label="contained primary button group"
      className={classes.root}
      {...other}
    >
      {children}
    </MuiButtonGroup>
  );
}
