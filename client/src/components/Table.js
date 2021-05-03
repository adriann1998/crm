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
import TextField from './inputFields/TextField';
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
// utils
import { getData, deleteData, putData, postData } from "../utils/CRUDUtil";
import { stableSort, getComparator } from "../utils/ObjectUtil";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
    width: "100%",
    '& thead th': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light
    }
  },
  container: {
    maxHeight: 500,
  },
  inputSearch: {
    margin: theme.spacing(2,2,2,2),
    width: "75%",
  },
  newButton: {
    margin: theme.spacing(3,2,3,2),
    float: "right",
  },
  iconButton: {
    margin: theme.spacing(0)
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

export default function Table( props ) {

  const { columns, rowFilter, baseURL, Form, TableIcon, simple, size, editable, deleteable, appendable } = props;

  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [formDefaultValues, setFormDefaultValues] = useState(undefined);
  const [selectedRowData, setSelectedRowData] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletePopup, setDeletePopup] = useState(false);
  const [formPopup, setFormPopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
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

  const rowsAfterPaginAndSorting = () => {
    return stableSort(filterFn.fn(rows), getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  useEffect(() => {
    getData(baseURL).then((data) => {
      data === null 
      ? console.log("Err") 
      : setRows(data.filter(rowFilter ? rowFilter : (n => n)));
    });
  }, [baseURL, rowFilter]);

  const handleDeleteRow = (row) => {
    const _id = row._id;
    setDeletePopup(true);
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

  const handleFormPopupClose = () => {
    setFormPopup(false);
    setFormDefaultValues(undefined);
  }

  const handleViewPopupClose = () => {
    setViewPopup(false);
    setSelectedRowData(undefined);
  }

  const handleCloseDeleteDialog = () => {
    setDeletePopup(false);
    setDeleteRowId("");
  };

  const handleEditRow = (row) => {
    setFormDefaultValues(row);
    setFormPopup(true);
  };

  const handleViewRow = (row) => {
    setViewPopup(true)
    console.log(row)
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  }

  const handleSearchRequest = (e) => {
    setFilterFn({
      fn: (items) => {
        if (e.target.value === ''){
          return items;
        }
        else {
          return items.filter((item) => Object.containsValue(item, e.target.value.toLowerCase()));
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
        console.log(response)
        let newRows = rows;
        const index = rows.findIndex(r => r._id === response._id);
        newRows[index] = response;
        setRows(newRows);
      }
      else{
        rows.push(response);
      }
      setFormPopup(false);
      setFormDefaultValues(undefined);
    }
    return response;
  }

  const DeleteDialog = () => (
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

  const ActionCell = ( {row} ) => (
    <TableCell className={classes.selectTableCell}>
      {editable && 
        <IconButton
          aria-label="edit"
          onClick={() => handleEditRow(row)}
        >
          <EditIcon  
            fontSize="small"
            color='default'
          />
        </IconButton>
      }
      {deleteable &&
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteRow(row)}
        >
          <DeleteOutlineIcon 
            fontSize="small"
            color='secondary'
          />
        </IconButton>
      }
      <IconButton
        aria-label="view"
        onClick={() => handleViewRow(row)}
      >
        <VisibilityIcon 
          fontSize="small"
          color='primary'
        />
      </IconButton>
    </TableCell>
  )

  const FormPopupDialog = () => (
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
  )

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        {!simple && 
          <TextField
            label="Search..."
            size="medium"
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
        }
        {!simple && appendable && 
          <Button
            onClick={() => setFormPopup(true)} 
            variant="outlined"
            color="primary"
            startIcon={<AddIcon/>}
            text="Add New"
            className={classes.newButton}
          />
        }
        <TableContainer className={classes.container}>
          <MaterialUITable stickyHeader aria-label="sticky table" size={size || "medium"}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {!simple && <TableCell align="left" width="130" />}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.sortable
                      ? (<TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={(e) => handleSortRequest(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>)
                      : column.label
                    }
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsAfterPaginAndSorting().map((row) => {
                  return (
                    <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                      {!simple && <ActionCell row={row}/> }
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
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <DeleteDialog />
      <FormPopupDialog />
      <PopupDialog
        title={
          <div>
            <TableIcon style={{marginRight: 20}}/>
              {baseURL[1].toUpperCase()}{baseURL.substring(2,baseURL.length-1)}
          </div>
        }
        openPopup={viewPopup}
        handleClose={handleViewPopupClose}
      >
        {selectedRowData && selectedRowData.values.forEach((n) => {
          console.log(n)
          return n
        })}
      </PopupDialog>
    </React.Fragment>
  );
}
