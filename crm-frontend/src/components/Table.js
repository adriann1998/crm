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
import Button from './Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PopupDialog from "./PopupDialog";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchIcon from '@material-ui/icons/Search';
// utils
import { getData, deleteData, putData, postData } from "../utils/FormUtil";
import { stableSort, getComparator } from "../utils/ObjectUtil";

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
  },
  newButton: {
    margin: theme.spacing(3,2,3,2),
    float: "right",
  }
}));

Object.containsValue = (obj, target) => {
  for (const value of Object.values(obj)) {
    if ((typeof value === 'object' || typeof value === 'string') && value !== null && value !== undefined) {
      if (typeof value === 'object'){
        if (Object.containsValue(value, target)){
          return true;
        }
      }
      else {
        const v = value.toLowerCase();
        const t = target.toLowerCase();
        if (v.includes(t)) {
          return true;
        }
      }
    }
  }
  return false;
};

export default function Table({ columns, baseURL, Form, TableIcon }) {

  const classes = useStyles();

  const [records, setRecords] = useState([]);
  const [formDefaultValues, setFormDefaultValues] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deletePopup, setDeletePopup] = useState(false);
  const [formPopup, setFormPopup] = useState(false);
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

  const handleDeleteRow = (_id) => {
    setDeletePopup(true);
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

  const handleFormPopupClose = () => {
    setFormPopup(false);
    setFormDefaultValues(undefined);
  }

  const handleCloseDeleteDialog = () => {
    setDeletePopup(false);
    setDeleteRowId("");
  };

  const handleEditRow = (record) => {
    setFormDefaultValues(record);
    setFormPopup(true);
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
          return items.filter((item) => Object.containsValue(item, e.target.value))
        }
      }
    })
  }

  const addOrEdit = async (formValues, defaultValues, editMode) => {
    let response;
    let endpoint;
    if (editMode) {
      endpoint = `${baseURL}/${defaultValues._id}`;
      response = await putData(endpoint, formValues);
    }
    else {
      endpoint = baseURL;
      response = await postData(endpoint, formValues);
    }
    if (response !== null) {
      if (editMode) {
        let newRecords = records;
        const index = records.findIndex(r => r._id === response._id);
        newRecords[index] = response;
        setRecords(newRecords);
      }
      else{
        records.push(response);
      }
      setFormPopup(false);
      setFormDefaultValues(undefined);
    }
    return response;
  }

  const DeleteDialog = () => {
    return (
      <Dialog
        open={deletePopup}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete?`}</DialogTitle>
        <DialogContent dividers>
            Row cannot be reverted once deleted
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDeleteDialog} 
            color="inheret"
            text="Cancel"
            size="small"
          />
          <Button 
            onClick={handleDeleteRowConfirm} 
            color="primary"
            text="OK"
            size="small"
          />
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
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
          <Button
            onClick={() => {setFormPopup(true)}} 
            variant="outlined"
            color="primary"
            startIcon={<AddIcon/>}
            text="Add New"
            className={classes.newButton}
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
                          onClick={() => handleEditRow(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            handleDeleteRow(row._id);
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
      <DeleteDialog />
      <PopupDialog
        title={
          <div>
            <TableIcon style={{marginRight: 20}}/>
              {baseURL[1].toUpperCase()}{baseURL.substring(2,baseURL.length-1)}
          </div>
        }
        maxWidth="md"
        openPopup={formPopup}
        handleClose={handleFormPopupClose}
      >
        <Form
          addOrEdit={addOrEdit}
          defaultValues={formDefaultValues}
        />
      </PopupDialog>
    </React.Fragment>
  );
}
