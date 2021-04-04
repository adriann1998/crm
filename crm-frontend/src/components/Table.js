import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table as MaterialUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// utils
import { getData, deleteData } from "../utils/FormUtil";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
});

export default function Table({ columns, baseURL }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState("");
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let mounted = true;
    getData(baseURL).then((data) => {
      if (mounted) {
        data === null ? alert("Err") : setRows(data);
      }
    });
    return () => (mounted = false);
  }, [baseURL]);

  const handleClickDeleteIcon = (_id) => {
    setDeleteDialog(true);
    setDeleteRowId(_id);
  };

  const handleDeleteRowConfirm = () => {
    deleteData(`${baseURL}/${deleteRowId}`).then((data) => {
      if (data === null) {
        alert("Delete failed");
      } else {
        let newRows = rows.filter((row) => row._id !== deleteRowId);
        setRows(newRows);
      }
    });
    return handleCloseDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
    setDeleteRowId("");
  };

  const handleClickEditIcon = (_id) => {
    const urlParam = baseURL.substring(1, baseURL.length - 1);
    history.push(`/form/${urlParam}`, {
      defaultValues: rows.find((r) => r._id === _id),
    });
  };

  const DeleteDialog = () => {
    return (
      <Dialog
        open={deleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Row cannot be reverted once deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRowConfirm} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
      <DeleteDialog />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <MaterialUITable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width="150" />
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell className={classes.selectTableCell}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleClickEditIcon(row._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            handleClickDeleteIcon(row._id);
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </MaterialUITable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}
