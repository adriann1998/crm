import AddIcon from "@material-ui/icons/Add";
import { Fab, IconButton } from "@material-ui/core";

export default function AddButton() {
  return (
    <IconButton>
      <Fab
        color="primary"
        component="span"
        className="addButton"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </IconButton>
  );
}
