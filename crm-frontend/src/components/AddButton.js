import AddIcon from '@material-ui/icons/Add';
import { Fab, IconButton } from '@material-ui/core';

export default function AddButton ( ) {
    return (
        <IconButton onClick={() => {}} className="addButton">
            <Fab color="primary" aria-label="add">
            <AddIcon/>
            </Fab>
        </IconButton>
    )
}