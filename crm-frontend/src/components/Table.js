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
  TableSortLabel,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import TextField from './formFields/TextField';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchIcon from '@material-ui/icons/Search';
// utils
import { getData, deleteData } from "../utils/FormUtil";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
    '& thead th': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light
    }
  },
  container: {
    maxHeight: 1000,
  },
  inputSearch: {
    margin: theme.spacing(2,2,2,2),
    width: "75%",
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function Table({ columns, baseURL }) {

  const classes = useStyles();
  const history = useHistory();

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState(""); 
  const [filterFn, setFilterFn] = useState({fn: (items) => items});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const recordsAfterPaginAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  useEffect(() => {
    let mounted = true;
    getData(baseURL).then((data) => {
      if (mounted) {
        data === null ? alert("Err") : setRecords(data);
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
        let newRows = records.filter((row) => row._id !== deleteRowId);
        setRecords(newRows);
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
      defaultValues: records.find((r) => r._id === _id),
    });
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  }

  const handleSearchRequest = (e) => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === ''){
          return items;
        }
        else {
          // return items.filter(item => item.name.firstName.includes(target.value))
          // return items.filter((item) => Object.values(item).indexOf(target.value) > -1)
          return items
        }
      }
    })
  }

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
          <TextField
            label="Search..."
            className={classes.inputSearch}
            onChange={handleSearchRequest}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              )
            }}
          />
        <TableContainer className={classes.container}>
          <MaterialUITable stickyHeader aria-label="sticky table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="left" width="150" />
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={(e) => handleSortRequest(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {recordsAfterPaginAndSorting().map((row) => {
                  return (
                    <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}
